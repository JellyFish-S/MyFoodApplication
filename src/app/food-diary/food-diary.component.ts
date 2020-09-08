import {Component, OnInit} from '@angular/core';
import {CheckUserIdService} from '../services/check-user-id.service';

import {FirebaseUserInterface} from '../interfaces';



@Component({
  selector: 'mf-food-diary',
  templateUrl: './food-diary.component.html',
  styleUrls: ['./food-diary.component.scss'],
})
export class FoodDiaryComponent implements OnInit {
  userInformation: FirebaseUserInterface;
  public isLoaded = false;


  constructor(
    private checkUserIdService: CheckUserIdService
  ) { }

  async ngOnInit(): Promise<void> {
    this.userInformation = await this.checkUserIdService.getUserInformationFromFirebase();
    this.isLoaded = true;
  }
}
