import { Component, Inject, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { ExercisesService } from 'src/app/exercises.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.css']
})
export class EditExerciseComponent implements OnInit {

  editForm!: FormGroup;
  exercise!: Exercise;

  constructor(private exercisesService: ExercisesService,
    public dialogRef: MatDialogRef<EditExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.exercise = data.exercise;
    }

    ngOnInit(): void {
      this.editForm = new FormGroup({
        name: new FormControl(this.exercise.name, [Validators.required]),
        category: new FormControl(this.exercise.category, [Validators.required]),
        numberOfSets: new FormControl(this.exercise.numberOfSets, [Validators.required]),
        numberOfReps: new FormControl(this.exercise.numberOfReps, [Validators.required]),        
        primaryMuscles: new FormControl(this.exercise.primaryMuscles, [Validators.required]),
        description: new FormControl(this.exercise.description)
      });
    }

    editExercise() {
      this.exercise.name = this.editForm.controls['name'].value;
      this.exercise.category = this.editForm.controls['category'].value;
      this.exercise.numberOfSets = this.editForm.controls['numberOfSets'].value;
      this.exercise.numberOfReps = this.editForm.controls['numberOfReps'].value;
      this.exercise.primaryMuscles = this.editForm.controls['primaryMuscles'].value;
      this.exercise.description = this.editForm.controls['description'].value;
    
      this.exercisesService.editExercise(this.exercise).subscribe();
    }
  
    getErrorMessage() {
      return 'You must enter a value';
    }
}
