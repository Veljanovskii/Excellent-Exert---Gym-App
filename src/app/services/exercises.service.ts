import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, Subject, tap } from 'rxjs';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private url: string = 'http://localhost:3000/exercises';
  exercisesChanged$ = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.message);
        return EMPTY;
      })
    );
  }

  addExercise(exercise: Exercise): Observable<any> {
    exercise.popularity = 2.5;
    this.exercisesChanged$.next(true);
    return this.http.post(this.url, exercise);
  }

  editExercise(exercise: Exercise): Observable<any> {
    this.exercisesChanged$.next(true);
    return this.http.patch(`${this.url}/${exercise.id}`, exercise);
  }

  deleteExercise(id: number): Observable<any> {
    this.exercisesChanged$.next(true);
    return this.http.delete(`${this.url}/${id}`);
  }
}
