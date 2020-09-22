import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FirebaseUserInterface} from '../../interfaces';
import {CheckUserIdService} from '../../services/check-user-id.service';



@Component({
  selector: 'mf-donuts',
  templateUrl: './donuts.component.html',
  styleUrls: ['./donuts.component.scss']
})
export class DonutsComponent implements OnInit {
  private sumCalories: number;
  public caloriesLeft: number;
  private userInformation: FirebaseUserInterface;
  constructor(
    private accountService: AccountService,
    private checkUserIdService: CheckUserIdService
  ) { }

  ngOnInit(): void{

  }

  async calculateSunCalories(): Promise<void> {
    this.sumCalories = this.accountService.dailyCalories(this.sumCalories);
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.caloriesLeft = this.userInformation.caloriesGoal - this.sumCalories;
  }
}
