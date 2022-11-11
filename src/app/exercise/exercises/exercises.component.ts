import { Component, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/exercises.service';
import { Exercise } from 'src/app/models/exercise'

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercises: Exercise[] = [];

  constructor(private exercisesService: ExercisesService) { }

  ngOnInit(): void {
    this.exercisesService.getExercises().subscribe(data => {
      this.exercises = data
      console.log(this.exercises);
    });
  }

}
