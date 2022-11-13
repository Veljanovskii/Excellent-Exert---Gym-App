import { Component, OnInit, ViewChild  } from '@angular/core';
import { ExercisesService } from 'src/app/exercises.service';
import { Exercise } from 'src/app/models/exercise'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'category', 'numberOfSets', 'numberOfReps', 'actions'];
  dataSource!: MatTableDataSource<Exercise>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private exercisesService: ExercisesService) { }

  ngOnInit(): void {

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
