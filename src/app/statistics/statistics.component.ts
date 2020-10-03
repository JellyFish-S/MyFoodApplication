import { Component, OnInit } from '@angular/core';
import {FirebaseUserInterface, UserWeight} from '../_common/interfaces';
import {CheckUserIdService} from '../_common/services/check-user-id.service';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs';
import {AccountService} from '../_common/services/account.service';

@Component({
  selector: 'mf-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userInformation: FirebaseUserInterface;
  public isLoaded = false;
  private weightArr = [];
  private goalWeightArr = [];
  private dateArr = [];
  optionWeight: any;
  optionCalories: any;
  month: string;
  private sumCalories: number;
  private subscription: Subscription;
  private calorieMonth = [];
  private dateMonth = [];
  private caloriesMonth = [];
  private goalCalorieArr = [];

  constructor(
    private checkUserIdService: CheckUserIdService,
    private accountService: AccountService
  ) { }

  async ngOnInit(): Promise<void> {
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.isLoaded = true;
    await this.getUserWeight().then(() => {
      this.createWeightProgressGraphic();
    });

    this.sumCalories = this.userInformation.caloriesGoal;
    this.subscription = this.accountService.subject.subscribe(message => {
      this.sumCalories = message;
  });

  }

  async updateWeightGraphic(): Promise<void> {
    await this.getUserWeight().then(() => {
      this.createWeightProgressGraphic();
    });
  }

  async getUserWeight(): Promise<UserWeight[]> {
    this.weightArr = [];
    this.goalWeightArr = [];
    this.dateArr = [];
    const dataSnapShot = await firebase.database().ref(`weight/`).once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    for (const key in objDatabase) {
      if (objDatabase[key].userId === user.uid) {
        this.weightArr.push(objDatabase[key].weight);
        const dateSlice = objDatabase[key].date.substr(0, 6);
        this.dateArr.push(dateSlice);
        this.goalWeightArr.push(this.userInformation.goalWeight);
      }
    }
    return this.weightArr;
  }
  createWeightProgressGraphic(): void {
    this.optionWeight = {
      title: {
        text: 'Weight progress',
        left: 'top',
        top: 'top',
        textStyle: {
          fontSize: 20,
          fontWeight: 600,
          color: '#FF6584'
        },
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Goal weight', 'Current weight']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.dateArr
      },
      yAxis: {
        type: 'value',
        interval: 100,
        boundaryGap: ['10%', '10%']
      },
      series: [
        {
          name: 'Goal weight',
          type: 'line',
          data: this.goalWeightArr
        },
        {
          name: 'Current weight',
          type: 'line',
          data: this.weightArr
        },

      ],
      color: [
        '#F37EA1', '#5E14BC'
      ]
    };
  }

  async getFoodFromFirebase(food: string, arrCalories): Promise<any> {
    const dataSnapShot = await firebase.database().ref(`${food}/`).once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    // tslint:disable-next-line:forin
    for (const key in objDatabase) {
      for (const i in objDatabase[key]) {
        if (objDatabase[key][i].userId === user.uid) {
          const calString = objDatabase[key][i].calories;
          const dateString = objDatabase[key][i].date;
          const monthString = objDatabase[key][i].date.substring(3, 5);
          arrCalories.push({date: dateString, calories: calString, month: monthString});
        }
      }
    }
    this.sumArray(arrCalories);
    return arrCalories;
  }

  sumArray(calories): void {
    let q = 1;
    while (q < calories.length) {
      if (calories[q].date === calories[q - 1].date) {
        calories[q - 1].calories = calories[q - 1].calories + calories[q].calories;
        calories.splice(q, 1);
      } else {
        q++;
      }
    }
  }

  async getAllFood(month: string): Promise<any> {
    const breakfast = [];
    const lunch = [];
    const dinner = [];
    const snack = [];
    this.dateMonth = [];
    this.caloriesMonth = [];
    this.calorieMonth = [];
    const breakfastArr = await this.getFoodFromFirebase('breakfast', breakfast);
    const lunchArr = await this.getFoodFromFirebase('lunch', lunch);
    const dinnerArr = await this.getFoodFromFirebase('dinner', dinner);
    const snackArr = await this.getFoodFromFirebase('snack', snack);
    const cal = [];
    cal.push(...breakfastArr, ...lunchArr, ...dinnerArr, ...snackArr);
    cal.sort((a, b) => a.date > b.date ? 1 : -1);
    this.sumArray(cal);
    this.calorieMonth = cal.filter(el => el.month === month);
    this.calorieMonth.forEach(el => {
      this.dateMonth.push(el.date.substring(0, 2));
      this.caloriesMonth.push(el.calories);
      this.goalCalorieArr.push(this.userInformation.caloriesGoal);
    });
    this.createAverageCalories();
    return this.calorieMonth;
  }
  createAverageCalories(): void {
    this.optionCalories = {
      title: {
        text: 'Calories Per Day',
        left: 'top',
        top: 'top',
        textStyle: {
          fontSize: 20,
          fontWeight: 600,
          color: '#FF6584'
        },
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Goal calories', 'Today Calories']
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.dateMonth
      },
      yAxis: {
        type: 'value',
        interval: 500,
        boundaryGap: ['10%', '10%']
      },
      series: [
        {
          name: 'Goal calories',
          type: 'line',
          data: this.goalCalorieArr
        },
        {
          name: 'Today Calories',
          type: 'line',
          data: this.caloriesMonth
        },

      ],
      color: [
        '#F37EA1', '#5E14BC'
      ]
    };
  }
}

