import { Component, AfterViewInit, ViewChild  } from '@angular/core';
import { ExercisesService } from 'src/app/exercises.service';
import { Exercise } from 'src/app/models/exercise'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExercisesComponent implements AfterViewInit {

  displayedColumns: string[] = ['image', 'name', 'category', 'numberOfSets', 'numberOfReps', 'actions'];
  dataSource!: MatTableDataSource<Exercise>;
  expandedElement!: Exercise | null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exercisesService: ExercisesService) { }

  ngAfterViewInit(): void {

    this.exercisesService.getExercises().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
