import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FirebaseUserInterface} from '../../interfaces';
import {CheckUserIdService} from '../../services/check-user-id.service';
import {Subscription} from 'rxjs';
import {DateService} from '../../services/date.service';



@Component({
  selector: 'mf-donuts',
  templateUrl: './donuts.component.html',
  styleUrls: ['./donuts.component.scss']
})
export class DonutsComponent implements OnInit {
  private sumCalories: number;
  public caloriesLeft: number;
  public kgLeft: number;
  private kgNow: number;
  private userInformation: FirebaseUserInterface;
  subscription: Subscription;
  subscriptionWeight: Subscription;
  constructor(
    private accountService: AccountService,
    private checkUserIdService: CheckUserIdService,
    private  dateService: DateService,
  ) {}


  async ngOnInit(): Promise<void> {
    this.caloriesLeft = 0;
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.dateService.date.pipe().subscribe(() => {
      this.caloriesLeft = 0;
      this.sumCalories = this.accountService.dailyCalories(this.sumCalories);
      this.caloriesLeft = this.userInformation.caloriesGoal - this.sumCalories;
      this.dateService.date.pipe().subscribe(() => {
        this.subscription = this.accountService.subject.subscribe(message => {
          this.caloriesLeft = 0;
          this.sumCalories = message;
          this.caloriesLeft = this.userInformation.caloriesGoal - this.sumCalories;
        });
      });
    });
    this.kgNow = this.accountService.sendWeightNow(this.kgNow);
    this.kgLeft = this.userInformation.goalWeight - this.kgNow;
    this.subscriptionWeight = this.accountService.weightSubject.subscribe(message => {
      this.kgLeft = 0;
      this.kgNow = message;
      console.log(message, this.userInformation.goalWeight);
      this.kgLeft = this.userInformation.goalWeight - this.kgNow;
    });
    }
}
