import { Injectable } from '@angular/core';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryActions } from './category.actions';

@Injectable()
export class CategoryEffects {

  constructor(private actions$: Actions, private categoriesService: CategoriesService) { }

  loadCategories$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(CategoryActions.loadCategories),
        mergeMap(() => this.categoriesService.getCategories()
          .pipe(
            map(categories => CategoryActions.loadCategoriesSuccess({ categories })),
            catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
          )
        )
      );
  });
}
