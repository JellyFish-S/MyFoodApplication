import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../services/account.service';
import {CalculateCaloriesService} from '../../services/calculate-calories.service';
import {UserParams} from '../../interfaces';


@Component({
  selector: 'mf-account-creation-second-step',
  templateUrl: './account-creation-second-step.component.html',
  styleUrls: ['./account-creation-second-step.component.scss']
})
export class AccountCreationSecondStepComponent implements OnInit {

  form: FormGroup;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    private accountService: AccountService,
    private calculateCalories: CalculateCaloriesService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      sex: new FormControl(null, Validators.required),
      age: new FormControl(null, [Validators.required, Validators.max(100), Validators.min(14)]),
      height: new FormControl(null, [Validators.required, Validators.max(250), Validators.min(120)]),
      weight: new FormControl(null, [Validators.required, Validators.max(350), Validators.min(30)]),
      goalWeight: new FormControl(null, [Validators.required, Validators.max(350), Validators.min(30)])
    });
  }

  public saveParams(): void {
    const userParams: UserParams = {
      age: this.form.value.age, height: this.form.value.height, sex: this.form.value.sex, weight: this.form.value.weight
    };
    this.calculateCalories.addUserParams(userParams);
    this.accountService.addUserParams(userParams, this.form.value.goalWeight);
    this.onTheNextStep.emit(true);
  }

}
