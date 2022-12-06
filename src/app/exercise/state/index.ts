import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExerciseState } from './exercise.reducer';

export interface State {
    exercises: ExerciseState;
}

const getExerciseFeatureState = createFeatureSelector<ExerciseState>('exercise');

export const getExercises = createSelector(
    getExerciseFeatureState,
    state => state.exercises
);

export const getError = createSelector(
    getExerciseFeatureState,
    state => state.error
);
