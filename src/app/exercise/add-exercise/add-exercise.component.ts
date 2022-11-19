import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { ExercisesService } from 'src/app/exercises.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  addForm!: FormGroup;
  exercise = <Exercise>{};

  constructor(private exercisesService: ExercisesService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      numberOfSets: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      numberOfReps: new FormControl('', [Validators.required]),        
      primaryMuscles: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });
  }

  addExercise() {
    this.exercise.name = this.addForm.controls['name'].value;
    this.exercise.category = this.addForm.controls['category'].value;
    this.exercise.numberOfSets = this.addForm.controls['numberOfSets'].value;
    this.exercise.unit = this.addForm.controls['unit'].value;
    this.exercise.numberOfReps = this.addForm.controls['numberOfReps'].value;
    this.exercise.primaryMuscles = this.addForm.controls['primaryMuscles'].value;
    this.exercise.description = this.addForm.controls['description'].value;
  
    this.exercisesService.addExercise(this.exercise).subscribe();
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

}
