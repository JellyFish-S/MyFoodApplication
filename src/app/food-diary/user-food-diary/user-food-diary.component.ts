import {Component, OnInit} from '@angular/core';
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
  productDB: ProductsDB;
  arrOfProd: ProductsDB[] = [];
  searchText = '';
  weight = 100;
  isInvalid: boolean;

  constructor(
    public  dateService: DateService,
    public addProductToFoodDiaryService: AddProductToFoodDiaryService
  ) {
  }

  ngOnInit(): void {
  }

  openSearchBar(): void {
    this.isOpen = !this.isOpen;
  }

  public fetchProducts(): void {
    console.log(this.arrOfProd);
    console.log(this.searchText);
    this.addProductToFoodDiaryService.getProductInformationFromFB(this.searchText)
      .then(array => {
        console.log(this.arrOfProd);
        console.log(this.searchText);
        this.arrOfProd = array;
      });
  }


  public changeWeight(weightGr: number, idx: number): void {
    console.log('sdfg');

    this.addProductToFoodDiaryService.getProductInformationFromFB(this.searchText)
      .then(array => {
        this.arrOfProd = array;
        array[idx].weight = weightGr;
        array[idx].protein = Math.round(array[idx].protein * (weightGr / 100));
        array[idx].fat = Math.round(array[idx].fat * (weightGr / 100));
        array[idx].carbohydrate = Math.round(array[idx].carbohydrate * (weightGr / 100));
        array[idx].calories = Math.round(array[idx].calories * (weightGr / 100));
        return array[idx];
        });
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
