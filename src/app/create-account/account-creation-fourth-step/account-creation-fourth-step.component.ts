import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mf-account-creation-fourth-step',
  templateUrl: './account-creation-fourth-step.component.html',
  styleUrls: ['./account-creation-fourth-step.component.scss']
})
export class AccountCreationFourthStepComponent implements OnInit {
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  saveContactInfo(): void {
    this.onTheNextStep.emit(true);
  }
}
