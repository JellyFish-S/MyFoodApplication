import {Component, OnInit} from '@angular/core';
import {CheckUserIdService} from '../../services/check-user-id.service';
import {FirebaseUserInterface, UserWeight} from '../../interfaces';
import * as firebase from 'firebase';
import {DateService} from '../../services/date.service';
import {AccountService} from '../../services/account.service';
import {PostUserInformationService} from '../../services/post-user-information.service';


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
  public isOpenChangeWeight = false;
  public userWeightArr: UserWeight[] = [];
  public weight: number;
  public userWeight: UserWeight = {
    weight: null,
    userId: null,
    userDbId: null,
    date: null
  };

  constructor(
    private checkUserIdService: CheckUserIdService,
    public dateService: DateService,
    private accountService: AccountService,
    private postUserInformationService: PostUserInformationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.setNewUserWeight().then((arr) => {
      arr.forEach((el) => {
        this.userWeightArr.push(el);
        this.userWeight = el;
        this.weight = this.userWeight.weight;
        console.log(this.userWeight);
      });
      this.isLoaded = true;
    });
  }

  openCalorieGoal(): void {
    this.isOpenCalorieGoal = !this.isOpenCalorieGoal;
  }
  openChangeCurrentWeight(): void {
    this.isOpenChangeWeight = !this.isOpenChangeWeight;
  }

  sendNewCalorieGoal(): void {
    this.checkUserIdService.getUserInformationFromFirebase().then((objDatabase) => {
      objDatabase.caloriesGoal = this.newCalorieGoal;
      const updates = {};
      updates[`users/${objDatabase.userDbId}`] = objDatabase;
      firebase.database().ref().update(updates);
      this.userInformation.caloriesGoal = this.newCalorieGoal;

    });
  }

  async setNewUserWeight(): Promise<UserWeight[]> {
    const dataSnapShot = await firebase.database().ref(`weight/`).once('value');
    const objDatabase = dataSnapShot.val();
    const objArr = [];
    const user = await firebase.auth().currentUser;
    for (const key in objDatabase) {
      if (objDatabase[key].userId === user.uid) {
        objArr.push(objDatabase[key]);
        console.log(objArr);
      }
    }
    return objArr;
  }

  sendNewUserWeight(): void {
    // this.userWeight = {
    //   weight: null,
    //   userId: null,
    //   userDbId: null,
    //   date: null
    // };
      this.userWeight = {
        userId: this.userWeight.userId,
        userDbId: this.userWeight.userDbId,
        weight: this.weight,
        date: this.dateService.date.value.format('DD.MM.YYYY')
      };
      console.log(this.userWeight, this.userWeightArr);
      this.postUserInformationService.postNewWeight(this.userWeight).subscribe(() => {
        this.userWeightArr.push(this.userWeight);
      });
      this.userWeight = this.userWeightArr[this.userWeightArr.length - 1];
      console.log(this.userWeight, this.userWeightArr);

  }
}
