import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { getCategories, getCategoryError } from './category.selectors';

@Injectable({ providedIn: 'root' })
export class CategorySelector {
  constructor(private store$: Store<any>) {}

  selectCategories(): Observable<Category[]> {
    return this.store$.select(getCategories);
  }

  selectCategoryError(): Observable<string> {
    return this.store$.select(getCategoryError);
  }
}
