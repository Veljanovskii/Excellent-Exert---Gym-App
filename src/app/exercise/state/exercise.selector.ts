import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { getExerciseError, getExercises } from './exercise.selectors';

@Injectable({ providedIn: 'root' })
export class ExerciseSelector {
  constructor(private store$: Store<any>) {}

  selectExercises(): Observable<Exercise[]> {
    return this.store$.select(getExercises);
  }

  selectExerciseError(): Observable<string> {
    return this.store$.select(getExerciseError);
  }
}
