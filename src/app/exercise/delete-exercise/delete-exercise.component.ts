import { Component, Inject, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.css']
})
export class DeleteExerciseComponent implements OnInit {

  index!: number;

  constructor(private exercisesService: ExercisesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
      this.index = data.index;
     }

  ngOnInit(): void {
  }
  
  openSnackBar() {
    this._snackBar.open('Exercise deleted successfully', 'Okay', { 
      horizontalPosition: 'end', 
      verticalPosition: 'bottom',
      duration: 4000,
      panelClass: ['snackbar'] });
  }

  deleteExercise() {
    this.exercisesService.deleteExercise(this.index).pipe(take(1)).subscribe();
  }
}
