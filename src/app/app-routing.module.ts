import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainpageLogoutComponent} from './mainpage-logout/mainpage-logout.component';
import {MainpageLoginComponent} from './mainpage-login/mainpage-login.component';
import {AccountCreationComponent} from './account-creation/account-creation.component';
import {FoodDiaryComponent} from './food-diary/food-diary.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AuthGuard} from './services/auth.guard';

const routes: Routes = [
  {path: '', component: MainpageLogoutComponent},
  {path: 'login', component: MainpageLoginComponent},
  {path: 'registration', component: AccountCreationComponent},
  {path: 'diary', component: FoodDiaryComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
