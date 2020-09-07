import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComparePassword} from '../../validators/confirm-password.validator';
import {AccountService} from '../../services/account.service';
import {ContactInfo, FirebaseUserInterface} from '../../interfaces';
import {RegistrationService} from '../../services/registration.service';
import UserCredential = firebase.auth.UserCredential;
import {PostUserInformationService} from '../../services/post-user-information.service';

@Component({
  selector: 'mf-account-creation-fourth-step',
  templateUrl: './account-creation-fourth-step.component.html',
  styleUrls: ['./account-creation-fourth-step.component.scss']
})
export class AccountCreationFourthStepComponent implements OnInit {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTheNextStep: EventEmitter<boolean> = new EventEmitter<boolean>();

  form: FormGroup;
  submitted = false;
  errorForm: boolean;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private registrationService: RegistrationService,
    private postUserInformation: PostUserInformationService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, Validators.required)
    }, {validators: ComparePassword('password', 'passwordConfirm')});
  }


  async sendInformationToRegister(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const contactInfo: ContactInfo = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.accountService.addContactInfo(contactInfo);
    this.onTheNextStep.emit(true);
    try {
      const auth: UserCredential = await this.registrationService.register(contactInfo.email, contactInfo.password);
      const userId = this.accountService.getUserId(auth.user.uid);
      this.submitted = false;
      this.errorForm = false;
      const userParamsAndGoal: FirebaseUserInterface = this.accountService.getUserParamsFirebase();
      console.log(userParamsAndGoal);
      // this.postUserInformation.create(userParamsAndGoal);
      this.postUserInformation.create(userParamsAndGoal).subscribe(() => {
        this.form.reset();
      });
      alert('Registration successful');
    } catch (error) {
      this.errorForm = true;
      this.submitted = false;
      alert('Invalid information. Please check it');
    }

  }
}
