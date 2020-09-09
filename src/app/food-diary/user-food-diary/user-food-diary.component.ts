import { Component, OnInit } from '@angular/core';
import {DateService} from '../../services/date.service';
import {ProductsDB} from '../../interfaces';
import {AddProductToFoodDiaryService} from '../../services/add-product-to-food-diary.service';



@Component({
  selector: 'mf-user-food-diary',
  templateUrl: './user-food-diary.component.html',
  styleUrls: ['./user-food-diary.component.scss']
})
export class UserFoodDiaryComponent implements OnInit {
  isOpen = false;
  productsDB: ProductsDB[] = [];

  constructor(
    public  dateService: DateService,
    public addProductToFoodDiaryService: AddProductToFoodDiaryService
    ) { }

  ngOnInit(): void {
  }

  openSearchBar(): void {
    this.isOpen = !this.isOpen;
  }

  // sendProductToFB() {
  //   const product: ProductsDB = {
  //     name: 'Coffee Cappuccino',
  //     protein: 2,
  //     fat: 2.4,
  //     carbohydrate: 3,
  //     calories: 42,
  //     weight: 100
  //   };
  //   this.createFoodDatabaseService.create(product).subscribe(() => {
  //     console.log('success');
  //   });
  // }

}
