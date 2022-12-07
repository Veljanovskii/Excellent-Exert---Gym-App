import { Category } from '../../models/category';
import { createAction, props } from '@ngrx/store';

export namespace CategoryActions {
  export const loadCategories = createAction('[Category] Load Categories');

  export const loadCategoriesSuccess = createAction(
    '[Category API] Load Success',
    props<{ categories: Category[] }>()
  );

  export const loadCategoriesFailure = createAction(
    '[Category API] Load Fail',
    props<{ error: string }>()
  );
}
