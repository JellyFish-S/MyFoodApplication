import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComparePassword} from '../../validators/confirm-password.validator';
import {AccountService} from '../../services/account.service';
import {ContactInfo} from '../../interfaces';
import {RegistrationService} from '../../services/registration.service';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'mf-account-creation-fourth-step',
  templateUrl: './account-creation-fourth-step.component.html',
  styleUrls: ['./account-creation-fourth-step.component.scss']
})
export class AccountCreationFourthStepComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private registrationService: RegistrationService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, Validators.required)
    }, {validators: ComparePassword('password', 'passwordConfirm')});
  }


  async saveContactInfo(): Promise<void> {
    const contactInfo: ContactInfo = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.accountService.addContactInfo(contactInfo);
    this.onTheNextStep.emit(true);
    const auth: UserCredential = await this.registrationService.register(contactInfo.email, contactInfo.password);
    const userId = auth.user.uid;
  }
}
