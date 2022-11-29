import { Component, Inject, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.css']
})
export class DeleteExerciseComponent implements OnInit {

  index!: number;

  constructor(private exercisesService: ExercisesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.index = data.index;
     }

  ngOnInit(): void {
  }

  deleteExercise() {
    this.exercisesService.deleteExercise(this.index).pipe(take(1)).subscribe();
  }
}
