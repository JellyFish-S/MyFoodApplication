export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface NewAccount {
  goal: string;
  userParams: UserParams;
  goalWeight: number;
  caloriesGoal: number;
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
