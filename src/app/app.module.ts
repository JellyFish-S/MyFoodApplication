import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainpageLogoutComponent } from './mainpage-logout/mainpage-logout.component';
import { MainpageLoginComponent } from './mainpage-login/mainpage-login.component';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/auth.guard';
import {CalculateCaloriesService} from './services/calculate-calories.service';
import {AccountCreationFirstStepComponent} from './create-account/account-creation-first-step/account-creation-first-step.component';
import {AccountCreationSecondStepComponent} from './create-account/account-creation-second-step/account-creation-second-step.component';
import {AccountCreationMainLayoutComponent} from './create-account/account-creation-main-layout/account-creation-main-layout.component';
import {AccountCreationFourthStepComponent} from './create-account/account-creation-fourth-step/account-creation-fourth-step.component';
import {AccountService} from './services/account.service';
import {AccountCreationThirdStepComponent} from './create-account/account-creation-third-step/account-creation-third-step.component';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {PostUserInformationService} from './services/post-user-information.service';
import { LeftbarDiaryComponent } from './food-diary/leftbar-diary/leftbar-diary.component';
import { DonutsComponent } from './food-diary/donuts/donuts.component';
import { UserFoodDiaryComponent } from './food-diary/user-food-diary/user-food-diary.component';
import { CalendarComponent } from './food-diary/calendar/calendar.component';
import {AngularFireDatabase} from '@angular/fire/database';
import {CheckUserIdService} from './services/check-user-id.service';
import * as firebase from 'firebase';
import {MomentPipe} from './pipes/moment.pipe';




const firebaseConfig = {
  apiKey: 'AIzaSyAxXQUgyBqvqoj24U2xhwZQL3MoaqWWu0M',
  authDomain: 'myfoodapplication-93d13.firebaseapp.com',
  databaseURL: 'https://myfoodapplication-93d13.firebaseio.com',
  projectId: 'myfoodapplication-93d13',
  storageBucket: 'myfoodapplication-93d13.appspot.com',
  messagingSenderId: '504211286601',
  appId: '1:504211286601:web:82025f722499baa9fded98'
};

firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainpageLogoutComponent,
    MainpageLoginComponent,
    AccountCreationFirstStepComponent,
    FoodDiaryComponent,
    StatisticsComponent,
    AccountCreationSecondStepComponent,
    AccountCreationThirdStepComponent,
    AccountCreationMainLayoutComponent,
    AccountCreationFourthStepComponent,
    LeftbarDiaryComponent,
    DonutsComponent,
    UserFoodDiaryComponent,
    CalendarComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    AuthGuard,
    AccountService,
    CalculateCaloriesService,
    PostUserInformationService,
    CheckUserIdService,
    AngularFireDatabase,
    AngularFireAuth
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
