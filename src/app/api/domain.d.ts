export interface Meal {
  id: string;
  version: number;
  created: Date;
  updated: Date;
  dateTime: Date;
  foodList: Food[];
}

export interface Food {
  id: string;
  version: number;
  created: Date;
  updated: Date;
  barCode: string;
  name: string;
  brand: string;
  unitOfMeasurement: string;
  quantity: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface ProductDto {
  barcode: string;
  name: string;
  brand: string;
  recommendedQuantity: string;
  caloriesPerCent: number;
  proteinsPerCent: number;
  carbsPerCent: number;
  fatsPerCent: number;
}

export interface NewUserDto {
  firstName: string;
  lastName: string;
  email: string;
  firebaseId: string;
}

export interface Goal {
  weight: number;
  targetCalories: number;
  targetProteins: number;
  targetFats: number;
  targetCarbs: number;
  targetFibres: number;
}
