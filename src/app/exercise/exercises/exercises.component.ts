import {
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { Exercise } from 'src/app/models/exercise';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';
import { DeleteExerciseComponent } from '../delete-exercise/delete-exercise.component';
import {
  debounceTime,
  map,
  Subject,
  switchMap,
  takeUntil,
  zip,
} from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { PopularityInfo } from 'src/app/popularity/popularity/popularity.component';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ExercisesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'image',
    'name',
    'category',
    'numberOfSets',
    'numberOfReps',
    'primaryMuscles',
    'popularity',
  ];
  dataSource!: MatTableDataSource<Exercise>;
  expandedElement!: Exercise | null;
  popularityInfo!: PopularityInfo;
  private unsubscribeSubject$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private exercisesService: ExercisesService,
    private categoriesService: CategoriesService,
    public matDialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    zip(
      this.exercisesService.getExercises(),
      this.categoriesService.categories$
    )
      .pipe(
        map(([exercises, categories]) => {
          const exercisesWithCategories = exercises.map(
            (exercise) =>
              ({
                ...exercise,
                category:
                  categories.find(
                    (category) =>
                      category.id === parseInt(exercise.category.toString())
                  )?.caption ?? exercise.category,
              } as Exercise)
          );
          const dataSource = new MatTableDataSource(exercisesWithCategories);
          dataSource.paginator = this.paginator;
          dataSource.sort = this.sort;
          return dataSource;
        }),
        takeUntil(this.unsubscribeSubject$)
      )
      .subscribe((dataSource) => {
        this.dataSource = dataSource;
      });

    this.exercisesService.exercisesChanged$
      .pipe(
        debounceTime(500),
        switchMap(() => this.exercisesService.getExercises()),
        takeUntil(this.unsubscribeSubject$)
      )
      .subscribe((newData) => {
        console.log(newData);
        this.dataSource.data = newData;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject$.next(true);
    this.unsubscribeSubject$.complete();
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    const dialogAddRef = this.matDialog.open(AddExerciseComponent, {
      width: '600px',
    });
  }

  openEditDialog(exercise: Exercise): void {
    const dialogEditRef = this.matDialog.open(EditExerciseComponent, {
      width: '600px',
      data: {
        exercise: exercise,
      },
    });
  }

  openDeleteDialog(id: number): void {
    const dialogDeleteRef = this.matDialog.open(DeleteExerciseComponent, {
      width: '375px',
      data: {
        index: id,
      },
    });
  }

  processMouseOver(info: PopularityInfo): void {
    this.popularityInfo = info;
  }
}
