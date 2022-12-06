import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExercisesService } from '../../services/exercises.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExerciseActions } from './exercise.actions';

@Injectable()
export class ExerciseEffects {

  constructor(private actions$: Actions, private exercisesService: ExercisesService) { }

  loadExercises$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ExerciseActions.loadExercises),
        mergeMap(() => this.exercisesService.getExercises()
          .pipe(
            map(exercises => ExerciseActions.loadExercisesSuccess({ exercises })),
            catchError(error => of(ExerciseActions.loadExercisesFailure({ error })))
          )
        )
      );
  });

  editExercise$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ExerciseActions.editExercise),
        concatMap(action =>
          this.exercisesService.editExercise(action.exercise)
            .pipe(
              map(exercise => ExerciseActions.editExerciseSuccess({ exercise })),
              catchError(error => of(ExerciseActions.editExerciseFailure({ error })))
            )
        )
      );
  });

  addExercise$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ExerciseActions.addExercise),
        concatMap(action =>
          this.exercisesService.addExercise(action.exercise)
            .pipe(
              map(exercise => ExerciseActions.addExerciseSuccess({ exercise })),
              catchError(error => of(ExerciseActions.addExerciseFailure({ error })))
            )
        )
      );
  });

  deleteExercise$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ExerciseActions.deleteExercise),
        mergeMap(action =>
          this.exercisesService.deleteExercise(action.exerciseId).pipe(
            map((exerciseId) => ExerciseActions.deleteExerciseSuccess({ exerciseId: exerciseId })),
            catchError(error => of(ExerciseActions.deleteExerciseFailure({ error })))
          )
        )
      );
  });
}
