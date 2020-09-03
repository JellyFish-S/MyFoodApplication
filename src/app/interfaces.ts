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
