import * as moment from 'moment';

export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface NewAccount {
  goal: string;
  userParams: UserParams;
  goalWeight: number;
  caloriesGoal: number;
  username: string;
  userId?: string;
}

export interface UserParams {
  sex: string;
  age: number;
  height: number;
  weight: number;
}

export interface ContactInfo {
  username: string;
  email: string;
  password: string;
}

export interface FirebaseUserInterface {
  goal: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  goalWeight: number;
  caloriesGoal: number;
  username: string;
  userId?: string;
}

export interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface Week {
  days: Day[];
}

export interface ProductsDB {
  name: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  calories: number;
  weight: number;
}

export interface UserFood {
  name: string;
  protein: number;
  fat: number;
  carbohydrate: number;
  calories: number;
  weight: number;
  date: string;
  userId?: string;
  foodId?: string;
}

export interface SumNumbersFoodDiary {
  protein: number;
  fat: number;
  carbohydrate: number;
  calories: number;
}
