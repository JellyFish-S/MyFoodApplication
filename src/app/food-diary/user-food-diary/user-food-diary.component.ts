import {Component, OnInit} from '@angular/core';
import {DateService} from '../../services/date.service';
import {ProductsDB, UserFood} from '../../interfaces';
import {AddProductToFoodDiaryService} from '../../services/add-product-to-food-diary.service';
import {PostUserFoodService} from '../../services/post-user-food.service';
import {CheckUserIdService} from '../../services/check-user-id.service';
import {GetUserFoodService} from '../../services/get-user-food.service';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'mf-user-food-diary',
  templateUrl: './user-food-diary.component.html',
  styleUrls: ['./user-food-diary.component.scss']
})
export class UserFoodDiaryComponent implements OnInit {
  isOpen = false;
  loadFood = false;
  productDB: ProductsDB;
  arrOfProd: ProductsDB[] = [];
  searchText = '';
  weight = 100;
  isInvalid: boolean;
  userProductsArray: UserFood[] = [];

  constructor(
    public  dateService: DateService,
    public addProductToFoodDiaryService: AddProductToFoodDiaryService,
    public postUserFood: PostUserFoodService,
    public checkUserIdService: CheckUserIdService,
    public getUserFoodFromFirebase: GetUserFoodService
  ) {
  }

  ngOnInit(): void {
     this.dateService.date.pipe(
      switchMap(value => this.getUserFoodFromFirebase.GetUserFoodFromFirebase(value))
    ).subscribe(userFood => {
      this.userProductsArray = userFood;
      console.log(this.userProductsArray);
    });
  }

  openFood(): void {
    this.loadFood = !this.loadFood;
  }

  openSearchBar(): void {
    this.isOpen = !this.isOpen;
  }

  public fetchProducts(): void {
    this.addProductToFoodDiaryService.getProductInformationFromFB(this.searchText)
      .then(array => {
        // console.log(this.arrOfProd);
        // console.log(this.searchText);
        this.arrOfProd = array;
      });
  }


  public changeWeight(weightGr: number, idx: number): void {
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

  public async sendUserProduct(idx: number): Promise<UserFood> {

    const userProduct: UserFood = {
      name: this.arrOfProd[idx].name,
      protein: this.arrOfProd[idx].protein,
      fat: this.arrOfProd[idx].fat,
      carbohydrate: this.arrOfProd[idx].carbohydrate,
      calories: this.arrOfProd[idx].calories,
      weight: this.arrOfProd[idx].weight,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      userId: await this.checkUserIdService.getUserId()
    };
    console.log(userProduct);
    this.postUserFood.create(userProduct).subscribe(() => {
      console.log('Added');
    });
    return userProduct;
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
