import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
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
import { map, Subject, takeUntil, zip } from 'rxjs';
import { PopularityInfo } from 'src/app/popularity/popularity/popularity.component';
import { Category } from 'src/app/models/category';
import { CategorySelector } from 'src/app/category/state/category.selector';
import { ExerciseSelector } from '../state/exercise.selector';

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
export class ExercisesComponent implements AfterViewInit, OnDestroy {
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
  private categories!: Category[];
  expandedElement!: Exercise | null;
  popularityInfo!: PopularityInfo;
  private unsubscribeSubject$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public matDialog: MatDialog,
    private categorySelector: CategorySelector,
    private exerciseSelector: ExerciseSelector,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    zip(
      this.exerciseSelector.selectExercises(),
      this.categorySelector.selectCategories()
    )
      .pipe(
        map(([exercises, categories]) => {
          const exercisesWithCategories = this.determineExercisesWithCategories(
            exercises,
            categories
          );
          this.categories = categories;
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

    this.exerciseSelector
      .selectExercises()
      .pipe(takeUntil(this.unsubscribeSubject$))
      .subscribe((exercises) => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.data = this.determineExercisesWithCategories(
          exercises,
          this.categories
        );
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject$.next(true);
    this.unsubscribeSubject$.complete();
  }

  determineExercisesWithCategories(
    exercises: Exercise[],
    categories: Category[]
  ): Exercise[] {
    return exercises.map(
      (exercise) =>
        ({
          ...exercise,
          category:
            categories.find((category) => category.id === exercise.category)
              ?.caption ?? exercise.category,
        } as Exercise)
    );
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    this.matDialog.open(AddExerciseComponent, {
      width: '600px',
    });
  }

  openEditDialog(exercise: Exercise): void {
    this.matDialog.open(EditExerciseComponent, {
      width: '600px',
      data: {
        exercise: exercise,
      },
    });
  }

  openDeleteDialog(id: number): void {
    this.matDialog.open(DeleteExerciseComponent, {
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
