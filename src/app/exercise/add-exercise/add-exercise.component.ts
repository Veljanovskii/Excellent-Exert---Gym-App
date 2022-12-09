import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, Subject, take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dispatcher } from 'src/app/services/dispatcher.service';
import { ExerciseActions } from '../state/exercise.actions';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  addForm!: FormGroup;
  exercise = <Exercise>{};
  exerciseAdded$: Subject<any> = new Subject<any>();

  constructor(
    private dispatcher: Dispatcher,
    private _snackBar: MatSnackBar) { }

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

    this.exerciseAdded$.pipe(debounceTime(500), take(1))
      .subscribe(() => 
        this.openSnackBar()
      );
  }

  addExercise() {
    this.exercise.name = this.addForm.controls['name'].value;
    this.exercise.category = parseInt(this.addForm.controls['category'].value);
    this.exercise.numberOfSets = parseInt(this.addForm.controls['numberOfSets'].value);
    this.exercise.unit = this.addForm.controls['unit'].value;
    this.exercise.numberOfReps = parseInt(this.addForm.controls['numberOfReps'].value);
    this.exercise.primaryMuscles = this.addForm.controls['primaryMuscles'].value;
    this.exercise.description = this.addForm.controls['description'].value.split(". ");
  
    this.dispatcher.dispatch(ExerciseActions.addExercise({exercise: this.exercise}));
  }

  openSnackBar() {
    this._snackBar.open('Exercise added successfully', 'Okay', { 
      horizontalPosition: 'end', 
      verticalPosition: 'bottom',
      duration: 4000,
      panelClass: ['snackbar'] });
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

}
