import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExercisesComponent } from './exercise/exercises/exercises.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DeleteExerciseComponent } from './exercise/delete-exercise/delete-exercise.component';
import { EditExerciseComponent } from './exercise/edit-exercise/edit-exercise.component';
import { AddExerciseComponent } from './exercise/add-exercise/add-exercise.component';
import { PopularityComponent } from './popularity/popularity/popularity.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { State } from './index';
import { exerciseReducer } from './exercise/state/exercise.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ExerciseEffects } from './exercise/state/exercise.effects';
import { categoryReducer } from './category/state/category.reducer';
import { CategoryEffects } from './category/state/category.effects';

@NgModule({
  declarations: [
    AppComponent,
    ExercisesComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DeleteExerciseComponent,
    EditExerciseComponent,
    AddExerciseComponent,
    PopularityComponent,
  ],
  imports: [
    StoreModule.forRoot({
      exercise: exerciseReducer,
      category: categoryReducer
    } as ActionReducerMap<State>),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([ExerciseEffects, CategoryEffects]),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
