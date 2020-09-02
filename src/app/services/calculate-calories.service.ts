import {Injectable} from '@angular/core';
import {NewAccount, UserParams} from '../interfaces';

@Injectable()
export class CalculateCaloriesService {

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

  public addUserParams(userParams: UserParams): void {
    this.account.userParams = userParams;
  }


  public getCaloriesGoal(): number {
    const acc: NewAccount = {
      goal: this.account.goal,
      userParams: this.account.userParams,
      goalWeight: this.account.goalWeight,
      caloriesGoal: this.account.caloriesGoal
    };
    const calorieGoalMale = (10 * acc.userParams.weight + 6.25 * acc.userParams.height - 5 * acc.userParams.age + 5) * 1.2;
    const calorieGoalFemale = (10 * acc.userParams.weight + 6.25 * acc.userParams.height - 5 * acc.userParams.age - 161) * 1.2;

    if (acc.userParams.sex === 'male') {
      switch (acc.goal) {
        case 'loose': acc.caloriesGoal = calorieGoalMale - calorieGoalMale * 0.15; break;
        case 'maintain': acc.caloriesGoal = calorieGoalMale; break;
        case 'gain':  acc.caloriesGoal = calorieGoalMale + calorieGoalMale * 0.15; break;
      }} else {
        switch (acc.goal) {
          case 'loose': acc.caloriesGoal = calorieGoalFemale - calorieGoalFemale * 0.15; break;
          case 'maintain': acc.caloriesGoal = calorieGoalFemale; break;
          case 'gain':  acc.caloriesGoal = calorieGoalFemale + calorieGoalFemale * 0.15; break;
        }
      }
    return Math.round(acc.caloriesGoal);
  }
}
