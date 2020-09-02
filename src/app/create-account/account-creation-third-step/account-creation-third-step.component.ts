import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {UserParams} from '../../interfaces';

@Component({
  selector: 'mf-account-creation-third-step',
  templateUrl: './account-creation-third-step.component.html',
  styleUrls: ['./account-creation-third-step.component.scss']
})
export class AccountCreationThirdStepComponent implements OnInit {
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
      this.accountService.getUserParamsAndGoal();
  }
  public saveCalories(): void {
    this.onTheNextStep.emit(true);
  }
}
