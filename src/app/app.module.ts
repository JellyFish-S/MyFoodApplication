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
    AccountCreationFourthStepComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, AccountService, CalculateCaloriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
