import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ExerciseState } from "./exercise.reducer";

const getExerciseFeatureState = createFeatureSelector<ExerciseState>('exercise');

export const getExercises = createSelector(
    getExerciseFeatureState,
    state => state.exercises
);

export const getExerciseError = createSelector(
    getExerciseFeatureState,
    state => state.error
);
