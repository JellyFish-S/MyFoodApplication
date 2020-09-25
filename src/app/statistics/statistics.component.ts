import { Component, OnInit } from '@angular/core';
import {FirebaseUserInterface, UserWeight} from '../interfaces';
import {CheckUserIdService} from '../services/check-user-id.service';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs';
import {AccountService} from '../services/account.service';

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
  private subscriptionWeight: Subscription;

  constructor(
    private checkUserIdService: CheckUserIdService,
    private accountService: AccountService
  ) { }

  async ngOnInit(): Promise<void> {
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.isLoaded = true;
    await this.GetUserWeight().then(() => {
      this.createWeightProgressGraphic();
    });
    this.subscriptionWeight = this.accountService.weightSubject.subscribe(() => {
      this.GetUserWeight().then(() => {
        this.createWeightProgressGraphic();
      });
    });
  }

  async GetUserWeight(): Promise<UserWeight[]> {
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
}

