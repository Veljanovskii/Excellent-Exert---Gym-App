import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, shareReplay, tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url: string = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  categories$: Observable<Category[]> = this.http
    .get<Category[]>(this.url)
    .pipe(
      tap(data => console.log(data)),
      shareReplay(),
      catchError((err: HttpErrorResponse) => {
        console.log(err.message);
        return EMPTY;
      })
    );
}
