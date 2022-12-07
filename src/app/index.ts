import { CategoryState } from './category/state/category.reducer';
import { ExerciseState } from './exercise/state/exercise.reducer';

export interface State {
    exercise: ExerciseState;
    category: CategoryState;
}
