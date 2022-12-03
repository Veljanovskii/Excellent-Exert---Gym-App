export interface Exercise {
  id: number;
  name: string;
  category: number | string;
  unit: string;
  numberOfSets: number;
  numberOfReps: number;
  primaryMuscles: string;
  description?: string[];
  image: string;
  popularity?: number;
}
