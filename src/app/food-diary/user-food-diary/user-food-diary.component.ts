import { Component, OnInit } from '@angular/core';
import {DateService} from '../../services/date.service';

@Component({
  selector: 'mf-user-food-diary',
  templateUrl: './user-food-diary.component.html',
  styleUrls: ['./user-food-diary.component.scss']
})
export class UserFoodDiaryComponent implements OnInit {

  constructor(public  dateService: DateService) { }

  ngOnInit(): void {
  }


}
