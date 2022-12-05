import { Exercise } from '../../models/exercise';
import { createAction, props } from '@ngrx/store';

export const loadExercises = createAction(
  '[Exercise] Load Exercises'
);

export const updateExercise = createAction(
  '[Exercise] Update Exercise',
  props<{ exercise: Exercise }>()
);

export const addExercise = createAction(
  '[Exercise] Add Exercise',
  props<{ exercise: Exercise }>()
);

export const deleteExercise = createAction(
  '[Exercise] Delete Exercise',
  props<{ exerciseId: number }>()
);
