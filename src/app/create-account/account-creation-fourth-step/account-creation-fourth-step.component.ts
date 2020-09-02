import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mf-account-creation-fourth-step',
  templateUrl: './account-creation-fourth-step.component.html',
  styleUrls: ['./account-creation-fourth-step.component.scss']
})
export class AccountCreationFourthStepComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, Validators.required)
    });
  }


  saveContactInfo(): void {
    this.onTheNextStep.emit(true);
  }
}
