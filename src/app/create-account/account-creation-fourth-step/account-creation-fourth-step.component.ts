import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComparePassword} from '../../validators/confirm-password.validator';
import {AccountService} from '../../services/account.service';
import {ContactInfo, FirebaseUserInterface, UserWeight} from '../../interfaces';
import {RegistrationService} from '../../services/registration.service';
import UserCredential = firebase.auth.UserCredential;
import {PostUserInformationService} from '../../services/post-user-information.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

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
  public userWeight: UserWeight = {
    weight: null,
    userId: null,
    userDbId: null,
    date: null,
    weightDBID: null
  };

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private registrationService: RegistrationService,
    private postUserInformation: PostUserInformationService,
    private router: Router
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
      this.accountService.getUserId(auth.user.uid);
      this.submitted = false;
      this.errorForm = false;
      const userParamsAndGoal: FirebaseUserInterface = this.accountService.getUserParamsFirebase();
      this.postUserInformation.create(userParamsAndGoal)
        .subscribe((res) => {
          userParamsAndGoal.userDbId = res.name;
          const updates = {};
          updates[`users/${userParamsAndGoal.userDbId}`] = userParamsAndGoal;
          firebase.database().ref().update(updates);
          this.postUserInformation.postNewWeight(this.userWeight).subscribe((weight) => {
            this.userWeight.weightDBID = weight.name;
            this.userWeight = this.accountService
              .getStartedWeight(userParamsAndGoal.userId, userParamsAndGoal.userDbId, this.userWeight.weightDBID);
            const updatesWeight = {};
            updatesWeight[`weight/${weight.name}`] = this.userWeight;
            firebase.database().ref().update(updatesWeight);

          });
          this.form.reset();
      });
      alert('Registration successful! You may login now');
      await this.router.navigate(['/login']);
    } catch (error) {
      this.errorForm = true;
      this.submitted = false;
      alert('Invalid information. Please check it');
    }
  }

}
