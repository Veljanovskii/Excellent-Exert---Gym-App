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
  error: '',
};

export const exerciseReducer = createReducer<ExerciseState>(
  initialState,
  on(ExerciseActions.loadExercisesSuccess, (state, action): ExerciseState => {
    return {
      ...state,
      exercises: action.exercises,
      error: '',
    };
  }),
  on(ExerciseActions.loadExercisesFailure, (state, action): ExerciseState => {
    return {
      ...state,
      exercises: [],
      error: action.error,
    };
  }),

  on(ExerciseActions.addExerciseSuccess, (state, action): ExerciseState => {
    return {
      ...state,
      exercises: [...state.exercises, action.exercise],
      error: '',
    };
  }),
  on(ExerciseActions.addExerciseFailure, (state, action): ExerciseState => {
    return {
      ...state,
      exercises: [],
      error: action.error,
    };
  }),

  on(ExerciseActions.editExerciseSuccess, (state, action): ExerciseState => {
    const updatedExercises = state.exercises.map((exercise) =>
      exercise.id === action.exercise.id ? action.exercise : exercise
    );
    return {
      ...state,
      exercises: updatedExercises,
      error: '',
    };
  }),
  on(ExerciseActions.editExerciseFailure, (state, action): ExerciseState => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(ExerciseActions.deleteExerciseSuccess, (state, action): ExerciseState => {
    const updatedExercises = state.exercises.filter(
      (exercise) => exercise.id !== action.exerciseId
    );
    return {
      ...state,
      exercises: updatedExercises,
      error: '',
    };
  }),
  on(ExerciseActions.deleteExerciseFailure, (state, action): ExerciseState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
