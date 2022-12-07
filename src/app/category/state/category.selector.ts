import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CategoryState } from "./category.reducer";

const getCategoryFeatureState = createFeatureSelector<CategoryState>('category');

export const getCategories = createSelector(
    getCategoryFeatureState,
    state => state.categories
);

export const getCategoryError = createSelector(
    getCategoryFeatureState,
    state => state.error
);