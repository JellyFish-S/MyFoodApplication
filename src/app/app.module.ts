import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainpageLogoutComponent } from './mainpage-logout/mainpage-logout.component';
import { MainpageLoginComponent } from './mainpage-login/mainpage-login.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { FoodDiaryComponent } from './food-diary/food-diary.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainpageLogoutComponent,
    MainpageLoginComponent,
    AccountCreationComponent,
    FoodDiaryComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
