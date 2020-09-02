import {Injectable} from '@angular/core';
import {NewAccount, UserParams} from '../interfaces';

@Injectable()
export class AccountService {
  private account: NewAccount = {
    goal: null,
    userParams: {
      sex: null,
      age: null,
      height: null,
      weight: null
    },
    goalWeight: null,
    caloriesGoal: null
  };

  public addGoal(goal: string): void {
    this.account.goal = goal;
  }

  public addUserParams(userParams: UserParams, goalWeight: number): void {
    this.account.userParams = userParams;
    this.account.goalWeight = goalWeight;
  }

  public addCaloriesGoal(caloriesGoal: number): void {
    this.account.caloriesGoal = caloriesGoal;
  }

  public getUserParamsAndGoal(): NewAccount {
    return {
      goal: this.account.goal,
      userParams: this.account.userParams,
      goalWeight: this.account.goalWeight,
      caloriesGoal: this.account.caloriesGoal
    };
  }
}