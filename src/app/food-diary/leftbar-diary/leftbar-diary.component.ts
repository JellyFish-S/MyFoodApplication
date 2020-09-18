import {Component, OnInit} from '@angular/core';
import {CheckUserIdService} from '../../services/check-user-id.service';
import {FirebaseUserInterface} from '../../interfaces';
import * as firebase from 'firebase';


@Component({
  selector: 'mf-leftbar-diary',
  templateUrl: './leftbar-diary.component.html',
  styleUrls: ['./leftbar-diary.component.scss']
})
export class LeftbarDiaryComponent implements OnInit {
  userInformation: FirebaseUserInterface;
  public isLoaded = false;
  public newCalorieGoal: number;
  public isOpenCalorieGoal = false;

  constructor(
    private checkUserIdService: CheckUserIdService
  ) { }

  async ngOnInit(): Promise<void> {
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.isLoaded = true;
  }

  openCalorieGoal(): void {
    this.isOpenCalorieGoal = !this.isOpenCalorieGoal;
  }

  async sendNewCalorieGoal(): Promise<void> {
    await this.checkUserIdService.getUserInformationFromFirebase().then((objDatabase) => {
      objDatabase.caloriesGoal = this.newCalorieGoal;
      const updates = {};
      updates[`users/${objDatabase.userDbId}`] = objDatabase;
      firebase.database().ref().update(updates);
      this.userInformation.caloriesGoal = this.newCalorieGoal;
      console.log(objDatabase);
      console.log(this.newCalorieGoal);
    });
  }
}
