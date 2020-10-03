import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '../../_common/services/account.service';
import {CalculateCaloriesService} from '../../_common/services/calculate-calories.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'mf-account-creation-third-step',
  templateUrl: './account-creation-third-step.component.html',
  styleUrls: ['./account-creation-third-step.component.scss']
})
export class AccountCreationThirdStepComponent implements OnInit {

  @Output() toTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  public calRecommended: number;
  public calFromUser: number;
  public form: FormGroup;

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
    this.accountService.addCaloriesGoal(this.calFromUser);
    this.toTheNextStep.emit(true);
  }
}
