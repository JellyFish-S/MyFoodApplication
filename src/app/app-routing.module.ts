import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainpageLogoutComponent} from './mainpage-logout/mainpage-logout.component';
import {MainpageLoginComponent} from './mainpage-login/mainpage-login.component';
import {FoodDiaryComponent} from './food-diary/food-diary.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AuthGuard} from './services/auth.guard';
import {AccountCreationMainLayoutComponent} from './create-account/account-creation-main-layout/account-creation-main-layout.component';

const routes: Routes = [
  {path: '', component: MainpageLogoutComponent},
  {path: 'login', component: MainpageLoginComponent},
  {path: 'registration', component: AccountCreationMainLayoutComponent},
  {path: 'diary', component: FoodDiaryComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
