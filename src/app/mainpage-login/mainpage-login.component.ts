import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../_common/interfaces';
import {AuthService} from '../_common/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

@Component({
  selector: 'mf-mainpage-login',
  templateUrl: './mainpage-login.component.html',
  styleUrls: ['./mainpage-login.component.scss']
})
export class MainpageLoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;
  errorForm: boolean;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
        if (params.loginAgain) {
          this.message = 'Please insert your login and password';
        } else if (params.authFailed){
          this.message = 'Session is over. Please, login again';
        }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }


  async submit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.errorForm = false;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    try {
      const auth: UserCredential = await this.auth.login(user.email, user.password);
      if (auth.user.uid) {
        this.form.reset();
        this.router.navigate(['/diary']);
        this.errorForm = false;
      } else {
        this.submitted = false;
      }
    } catch (error) {
       this.errorForm = true;
       this.submitted = false;
    }
  }
}
