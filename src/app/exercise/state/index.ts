import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { exerciseReducer, ExerciseState } from './exercise.reducer';

export interface State {
    products: ExerciseState;
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

export const reducers: ActionReducerMap<State> = {
    products: exerciseReducer
};