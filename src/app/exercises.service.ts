import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from './models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  url = 'http://localhost:3000/exercises';
 
 constructor(private http: HttpClient) { }
 
 getExercises(): Observable<any> {
   return this.http.get(this.url);
 }

 addExercise(exercise: Exercise): Observable<any> {
  return this.http.post(this.url, exercise);
 }

 editExercise(exercise: Exercise): Observable<any> {
  return this.http.patch(`${this.url}/${exercise.id}`, exercise);
 }

 deleteExercise(id: number): Observable<any> {
  return this.http.delete(`${this.url}/${id}`);
 }
}
