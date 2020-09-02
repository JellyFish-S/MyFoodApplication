import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateAccountService} from '../../services/create-account.service';
import {AccountService} from '../../services/account.service';
import {CalculateCaloriesService} from '../../services/calculate-calories.service';



@Component({
  selector: 'mf-account-creation-first-step',
  templateUrl: './account-creation-first-step.component.html',
  styleUrls: ['./account-creation.component-first-step.scss']
})
export class AccountCreationFirstStepComponent implements OnInit {
  form: FormGroup;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private createAccountService: CreateAccountService,
    private accountService: AccountService,
    private calculateCalories: CalculateCaloriesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      goal: new FormControl(null, Validators.required)
    });
  }

  saveGoal(): void {
    this.accountService.addGoal(this.form.value.goal);
    this.calculateCalories.addGoal(this.form.value.goal);
    this.onTheNextStep.emit(true);
  }



  /*
   saveGoal(): void {
     const user: User = {
       userGoal: this.form.value.goal
     };
     this.createAccountService.create(user).subscribe(() => {
       this.form.reset();
     });
   }
  */

}
