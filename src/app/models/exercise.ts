export interface Exercise {
    id: number;
    name: string;
    category: number;
    unit: string;
    numberOfSets: number;
    numberOfReps: number;
    primaryMuscles: string;
    description?: string;
    image: string;
}