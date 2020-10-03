import {Component, OnInit} from '@angular/core';
import {CheckUserIdService} from '../../_common/services/check-user-id.service';
import {FirebaseUserInterface, UserWeight} from '../../_common/interfaces';
import * as firebase from 'firebase';
import {DateService} from '../../_common/services/date.service';
import {AccountService} from '../../_common/services/account.service';
import {PostUserInformationService} from '../../_common/services/post-user-information.service';


@Component({
  selector: 'mf-leftbar-diary',
  templateUrl: './leftbar-diary.component.html',
  styleUrls: ['./leftbar-diary.component.scss']
})
export class LeftbarDiaryComponent implements OnInit {
  userInformation: FirebaseUserInterface;
  public isDisabledButtonWeight: boolean;
  private identicalSum: number;
  public isLoaded = false;
  public newCalorieGoal: number;
  public isOpenCalorieGoal = false;
  public isOpenChangeWeight = false;
  public userWeightArr: UserWeight[] = [];
  public weight: number;
  public date: string;
  public userWeight: UserWeight = {
    weight: null,
    userId: null,
    userDbId: null,
    date: null,
    weightDBID: null
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
        this.date = this.userWeight.date;
      });
      this.isLoaded = true;
      this.accountService.weightSubject.next(this.weight);
      this.accountService.getWeightNow(this.weight);
    });
  }

  disabledWeightButton(): void {
    this.isDisabledButtonWeight = false;
    const date = new Date().toLocaleDateString('ru-Ru');
    this.isDisabledButtonWeight = date !== this.dateService.date.value.format('DD.MM.YYYY').toString();
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
      this.accountService.caloriesSubject.next(this.userInformation.caloriesGoal);
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
      }
    }
    return objArr;
  }

  sendNewUserWeight(): void {
      this.userWeight = {
        userId: this.userWeight.userId,
        userDbId: this.userWeight.userDbId,
        weight: this.weight,
        date: this.dateService.date.value.format('DD.MM.YYYY'),
        weightDBID: this.userWeight.weightDBID
      };
      this.identicalSum = 0;
      this.userWeightArr.forEach((el) => {
        if (this.userWeight.date === el.date) {
          this.identicalSum++;
          const updates = {};
          updates[`weight/${el.weightDBID}`] = this.userWeight;
          firebase.database().ref().update(updates);
        }
        });
      if (this.identicalSum === 0) {
          this.postUserInformationService.postNewWeight(this.userWeight).subscribe((weight) => {
            this.userWeight.weightDBID = weight.name;
            const updatesWeight = {};
            updatesWeight[`weight/${weight.name}`] = this.userWeight;
            firebase.database().ref().update(updatesWeight);
            this.userWeightArr.push(this.userWeight);
            this.userWeight = this.userWeightArr[this.userWeightArr.length - 1];
            this.date = this.userWeight.date;
          });
        }
      this.accountService.weightSubject.next(this.weight);
      this.accountService.getWeightNow(this.weight);

  }
}
