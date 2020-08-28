import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainpageLogoutComponent} from './mainpage-logout/mainpage-logout.component';
import {MainpageLoginComponent} from './mainpage-login/mainpage-login.component';
import {AccountCreationComponent} from './account-creation/account-creation.component';
import {FoodDiaryComponent} from './food-diary/food-diary.component';
import {StatisticsComponent} from './statistics/statistics.component';

const routes: Routes = [
  {path: '', component: MainpageLogoutComponent},
  {path: 'login', component: MainpageLoginComponent},
  {path: 'registration', component: AccountCreationComponent},
  {path: 'diary', component: FoodDiaryComponent},
  {path: 'statistics', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
