import {Injectable} from '@angular/core';
import {ContactInfo, FirebaseUserInterface, NewAccount, UserParams, UserWeight} from '../interfaces';
import * as firebase from 'firebase';

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
    caloriesGoal: null,
    username: null,
    userId: null
  };

  private contactInfo: ContactInfo = {
  username: null,
  email: null,
  password: null
  };

  public getUserId(userId: string): void {
    this.account.userId = userId;
  }
  public addContactInfo(contactInfo: ContactInfo): void {
    this.contactInfo = contactInfo;
  }

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

  public getUserParamsFirebase(): FirebaseUserInterface {
    return {
      goal: this.account.goal,
      sex: this.account.userParams.sex,
      age: this.account.userParams.age,
      height: this.account.userParams.height,
      weight: this.account.userParams.weight,
      goalWeight: this.account.goalWeight,
      caloriesGoal: this.account.caloriesGoal,
      username: this.contactInfo.username,
      userId: this.account.userId
    };
  }

  public getUserParamsAndGoal(): NewAccount {
    return {
      goal: this.account.goal,
      userParams: this.account.userParams,
      goalWeight: this.account.goalWeight,
      caloriesGoal: this.account.caloriesGoal,
      username: this.account.username
    };
  }

  public getStartedWeight(userId: string, userDbId: string): UserWeight {
    return {
      weight: this.account.userParams.weight,
      userId,
      date: new Date(firebase.auth().currentUser.metadata.creationTime).toLocaleDateString('ru-Ru'),
      userDbId
    };
  }

}
