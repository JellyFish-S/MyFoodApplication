import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {CalculateCaloriesService} from '../../services/calculate-calories.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'mf-account-creation-third-step',
  templateUrl: './account-creation-third-step.component.html',
  styleUrls: ['./account-creation-third-step.component.scss']
})
export class AccountCreationThirdStepComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  public calRecommended: number;
  public calFromUser: number;
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private calculateService: CalculateCaloriesService
  ) { }

  ngOnInit(): void {
      this.accountService.getUserParamsAndGoal();
      this.calRecommended = this.calculateService.getCaloriesGoal();
      this.calFromUser = this.calculateService.getCaloriesGoal();
  }
  public saveCalories(): void {
    console.log(this.calFromUser);
    this.accountService.addCaloriesGoal(this.calFromUser);
    this.onTheNextStep.emit(true);
  }
}
