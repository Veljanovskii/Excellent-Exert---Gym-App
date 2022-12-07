import { Category } from '../../models/category';

import { createReducer, on } from '@ngrx/store';
import { CategoryActions } from './category.actions';

export interface CategoryState {
  categories: Category[];
  error: string;
}

const initialState: CategoryState = {
  categories: [],
  error: '',
};

export const categoryReducer = createReducer<CategoryState>(
  initialState,
  on(CategoryActions.loadCategoriesSuccess, (state, action): CategoryState => {
    return {
      ...state,
      categories: action.categories,
      error: '',
    };
  }),
  on(CategoryActions.loadCategoriesFailure, (state, action): CategoryState => {
    return {
      ...state,
      categories: [],
      error: action.error,
    };
  })
);
