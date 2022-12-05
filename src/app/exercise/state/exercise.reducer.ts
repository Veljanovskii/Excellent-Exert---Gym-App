import { Exercise } from '../../models/exercise';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { ExerciseActions } from './exercise.actions';


export interface ExerciseState {
  exercises: Exercise[];
  error: string;
  
}

const initialState: ExerciseState = {
    exercises: [],
    error: ''
};

export const exerciseReducer = createReducer<ExerciseState>(
  initialState,
  on(ExerciseActions.loadExercisesSuccess, (state, action): ExerciseState => {
    return {
      ...state,
      exercises: action.exercises,
      error: ''
    };
  }),
  on(ExerciseActions.loadExercisesFailure, (state, action): ExerciseState => {
    return {
      ...state,
      exercises: [],
      error: action.error
    };
  }),
);
