import { Component, Inject, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/exercises.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    this.exercisesService.deleteExercise(this.index).subscribe();
  }
}
