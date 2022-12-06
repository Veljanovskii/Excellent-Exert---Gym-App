import { Exercise } from '../../models/exercise';
import { createAction, props } from '@ngrx/store';

export namespace ExerciseActions {
  export const loadExercises = createAction('[Exercise] Load Exercises');

  export const editExercise = createAction(
    '[Exercise] Edit Exercise',
    props<{ exercise: Exercise }>()
  );

  export const addExercise = createAction(
    '[Exercise] Add Exercise',
    props<{ exercise: Exercise }>()
  );

  export const deleteExercise = createAction(
    '[Exercise] Delete Exercise',
    props<{ exerciseId: number }>()
  );
  


  

  export const loadExercisesSuccess = createAction(
    '[Exercise API] Load Success',
    props<{ exercises: Exercise[] }>()
  );
  
  export const loadExercisesFailure = createAction(
    '[Exercise API] Load Fail',
    props<{ error: string }>()
  );
  
  export const editExerciseSuccess = createAction(
    '[Exercise API] Edit Exercise Success',
    props<{ exercise: Exercise }>()
  );
  
  export const editExerciseFailure = createAction(
    '[Exercise API] Edit Exercise Fail',
    props<{ error: string }>()
  );
  
  export const addExerciseSuccess = createAction(
    '[Exercise API] Add Exercise Success',
    props<{ exercise: Exercise }>()
  );
  
  export const addExerciseFailure = createAction(
    '[Exercise API] Add Exercise Fail',
    props<{ error: string }>()
  );
  
  export const deleteExerciseSuccess = createAction(
    '[Exercise API] Delete Exercise Success',
    props<{ exerciseId: number }>()
  );
  
  export const deleteExerciseFailure = createAction(
    '[Exercise API] Delete Exercise Fail',
    props<{ error: string }>()
  );
}
