import { Component, OnInit } from '@angular/core';
import { CategoryActions } from './category/state/category.actions';
import { ExerciseActions } from './exercise/state/exercise.actions';
import { Dispatcher } from './services/dispatcher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Excellent Exert - Gym App';

  constructor(private dispatcher: Dispatcher) {}

  ngOnInit(): void {
    this.dispatcher.dispatch(CategoryActions.loadCategories());
    this.dispatcher.dispatch(ExerciseActions.loadExercises());
  }
}
