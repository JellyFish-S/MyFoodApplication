import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../_common/services/account.service';
import {CalculateCaloriesService} from '../../_common/services/calculate-calories.service';



@Component({
  selector: 'mf-account-creation-first-step',
  templateUrl: './account-creation-first-step.component.html',
  styleUrls: ['./account-creation.component-first-step.scss']
})
export class AccountCreationFirstStepComponent implements OnInit {
  public form: FormGroup;
  @Output() toTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private accountService: AccountService,
    private calculateCalories: CalculateCaloriesService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      goal: new FormControl(null, Validators.required)
    });
  }

  saveGoal(): void {
    this.accountService.addGoal(this.form.value.goal);
    this.calculateCalories.addGoal(this.form.value.goal);
    this.toTheNextStep.emit(true);
  }
}
