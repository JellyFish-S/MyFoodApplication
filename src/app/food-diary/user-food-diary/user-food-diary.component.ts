import {Component, OnInit} from '@angular/core';
import {DateService} from '../../services/date.service';
import {ProductsDB, SumNumbersFoodDiary, UserFood} from '../../interfaces';
import {AddProductToFoodDiaryService} from '../../services/add-product-to-food-diary.service';
import {PostUserFoodService} from '../../services/post-user-food.service';
import {CheckUserIdService} from '../../services/check-user-id.service';
import {GetUserFoodService} from '../../services/get-user-food.service';
import {map, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase';
import {AccountService} from '../../services/account.service';



@Component({
  selector: 'mf-user-food-diary',
  templateUrl: './user-food-diary.component.html',
  styleUrls: ['./user-food-diary.component.scss']
})
export class UserFoodDiaryComponent implements OnInit {
  foodType = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  isOpen = false;
  isLoadBreakfast = false;
  isLoadLunch = false;
  isLoadDinner = false;
  isLoadSnack = false;
  productDB: ProductsDB;
  arrOfProd: ProductsDB[] = [];
  searchText = '';
  weight = 100;
  isInvalid: boolean;
  userProductsBreakfast: UserFood[] = [];
  userProductsLunch: UserFood[] = [];
  userProductsDinner: UserFood[] = [];
  userProductsSnack: UserFood[] = [];
  idx: number;
  sumBreakfast: SumNumbersFoodDiary;
  isLoadSumBreakfast = false;
  sumLunch: SumNumbersFoodDiary;
  isLoadSumLunch = false;
  sumDinner: SumNumbersFoodDiary;
  isLoadSumDinner = false;
  sumSnack: SumNumbersFoodDiary;
  isLoadSumSnack = false;
  sumFoodArray: SumNumbersFoodDiary[] = [];
  isLoadSumFood = false;
  sumFood: SumNumbersFoodDiary;


  constructor(
    public  dateService: DateService,
    public addProductToFoodDiaryService: AddProductToFoodDiaryService,
    public postUserFood: PostUserFoodService,
    public checkUserIdService: CheckUserIdService,
    public getUserFoodFromFirebase: GetUserFoodService,
    public accountService: AccountService
  ) {
  }

 ngOnInit(): void {
     this.dateService.date.pipe(
      switchMap(value => this.getUserFoodFromFirebase.GetUserFoodFromFirebaseBreakfast(value))
    ).subscribe(userFood => {
      this.sumFoodArray = [];
      this.userProductsBreakfast = userFood;
      this.sumBreakfast = {
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        calories: 0
      };
      this.userProductsBreakfast.forEach(breakfast => {
        if (breakfast) {
          this.addFoodChangesSum(this.sumBreakfast, breakfast);
          this.sumFoodArray.push(breakfast);
        }
      });
      this.isLoadSumBreakfast = true;
    });
     this.dateService.date.pipe(
      switchMap(value => this.getUserFoodFromFirebase.GetUserFoodFromFirebaseLunch(value))
    ).subscribe(userFood => {
      this.userProductsLunch = userFood;
      this.sumLunch = {
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        calories: 0
      };
      this.userProductsLunch.forEach(lunch => {
        if (lunch) {
          this.addFoodChangesSum(this.sumLunch, lunch);
          this.sumFoodArray.push(lunch);
        }
      });
      this.isLoadSumLunch = true;
    });
     this.dateService.date.pipe(
      switchMap(value => this.getUserFoodFromFirebase.GetUserFoodFromFirebaseDinner(value))
    ).subscribe(userFood => {
      this.userProductsDinner = userFood;
      this.sumDinner = {
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        calories: 0
      };
      this.userProductsDinner.forEach(dinner => {
        if (dinner) {
          this.addFoodChangesSum(this.sumDinner, dinner);
          this.sumFoodArray.push(dinner);
        }
      });
      this.isLoadSumDinner = true;
    });
     this.dateService.date.pipe(
      switchMap(value => this.getUserFoodFromFirebase.GetUserFoodFromFirebaseSnack(value))
    ).subscribe(userFood => {
      this.userProductsSnack = userFood;
      this.sumSnack = {
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        calories: 0
      };
      this.userProductsSnack.forEach(snack => {
        if (snack) {
          this.addFoodChangesSum(this.sumSnack, snack);
          this.sumFoodArray.push(snack);
        }
      });
      this.isLoadSumSnack = true;
      this.sumFood = {
         protein: 0,
         fat: 0,
         carbohydrate: 0,
         calories: 0
       };
      this.sumFoodArray.forEach(product => {
        this.addFoodChangesSum(this.sumFood, product);
         }
       );
      this.isLoadSumFood = true;
      this.accountService.subject.next(this.sumFood.calories);
      this.accountService.sumCalories(this.sumFood.calories);
    });
  }
  foodWasAdd(): void {
    alert('Product added');
    setTimeout(() => {
      this.accountService.subject.next(this.sumFood.calories);
      this.accountService.sumCalories(this.sumFood.calories);
    }, 500);

  }

  openFoodBreakfast(): void {
    this.isLoadBreakfast = !this.isLoadBreakfast;
  }
  openFoodLunch(): void {
    this.isLoadLunch = !this.isLoadLunch;
  }
  openFoodDinner(): void {
    this.isLoadDinner = !this.isLoadDinner;
  }
  openFoodSnack(): void {
    this.isLoadSnack = !this.isLoadSnack;
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

  public async sendUserFood(idx: number): Promise<UserFood> {

    return {
      name: this.arrOfProd[idx].name,
      protein: this.arrOfProd[idx].protein,
      fat: this.arrOfProd[idx].fat,
      carbohydrate: this.arrOfProd[idx].carbohydrate,
      calories: this.arrOfProd[idx].calories,
      weight: this.arrOfProd[idx].weight,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
      userId: await this.checkUserIdService.getUserId()
    };
  }
  private addFoodChangesSubtract(sum: SumNumbersFoodDiary, foodObj: SumNumbersFoodDiary): void {
    sum.protein -= foodObj.protein;
    sum.fat -= foodObj.fat;
    sum.carbohydrate -= foodObj.carbohydrate;
    sum.calories -= foodObj.calories;
  }

  private addFoodChangesSum(sum: SumNumbersFoodDiary, foodObj: SumNumbersFoodDiary): void {
    sum.protein += foodObj.protein;
    sum.fat += foodObj.fat;
    sum.carbohydrate += foodObj.carbohydrate;
    sum.calories += foodObj.calories;
  }

  public async sendUserBreakfast(idx: number): Promise<any> {
    await this.sendUserFood(idx).then((foodObj) => {
      this.postUserFood.createBreakfast(foodObj).pipe(map(res => {
        foodObj.foodId = res.name;
      })).subscribe( () => {
        console.log('Added');
        const updates = {};
        updates[`breakfast/${foodObj.date}/${foodObj.foodId}`] = foodObj;
        firebase.database().ref().update(updates);
        this.userProductsBreakfast.push(foodObj);
        this.addFoodChangesSum(this.sumBreakfast, foodObj);
        this.addFoodChangesSum(this.sumFood, foodObj);
      });
      return foodObj;
  });
  }

  public async sendUserLunch(idx: number): Promise <any> {
    await this.sendUserFood(idx).then((foodObj) => {
      this.postUserFood.createLunch(foodObj).pipe(map(res => {
        foodObj.foodId = res.name;

      })).subscribe( () => {
        console.log('Added');
        const updates = {};
        updates[`lunch/${foodObj.date}/${foodObj.foodId}`] = foodObj;
        firebase.database().ref().update(updates);
        this.userProductsLunch.push(foodObj);
        this.addFoodChangesSum(this.sumLunch, foodObj);
        this.addFoodChangesSum(this.sumFood, foodObj);
      });
      return foodObj;
    });
  }

  public async sendUserDinner(idx: number): Promise <any> {
    await this.sendUserFood(idx).then((foodObj) => {
      this.postUserFood.createDinner(foodObj).pipe(map(res => {
        foodObj.foodId = res.name;
      })).subscribe( () => {
        console.log('Added');
        const updates = {};
        updates[`dinner/${foodObj.date}/${foodObj.foodId}`] = foodObj;
        firebase.database().ref().update(updates);
        this.userProductsDinner.push(foodObj);
        this.addFoodChangesSum(this.sumDinner, foodObj);
        this.addFoodChangesSum(this.sumFood, foodObj);
      });
      return foodObj;
    });
  }

  public async sendUserSnack(idx: number): Promise <any> {
    await this.sendUserFood(idx).then((foodObj) => {
      this.postUserFood.createSnack(foodObj).pipe(map(res => {
        foodObj.foodId = res.name;
      })).subscribe( () => {
        console.log('Added');
        const updates = {};
        updates[`snack/${foodObj.date}/${foodObj.foodId}`] = foodObj;
        firebase.database().ref().update(updates);
        this.userProductsSnack.push(foodObj);
        this.addFoodChangesSum(this.sumSnack, foodObj);
        this.addFoodChangesSum(this.sumFood, foodObj);
      });
      return foodObj;
    });
  }

  public removeBreakfast(userFood: UserFood): void {
    this.getUserFoodFromFirebase.removeBreakfast(userFood).subscribe(() => {
        this.addFoodChangesSubtract(this.sumBreakfast, userFood);
        this.addFoodChangesSubtract(this.sumFood, userFood);
        this.userProductsBreakfast = this.userProductsBreakfast.filter( t => t.foodId !== userFood.foodId);
        this.accountService.subject.next(this.sumFood.calories);
    }, error => console.error(error));
  }

  public removeLunch(userFood: UserFood): void {
    this.getUserFoodFromFirebase.removeLunch(userFood).subscribe(() => {
      this.addFoodChangesSubtract(this.sumLunch, userFood);
      this.addFoodChangesSubtract(this.sumFood, userFood);
      this.userProductsLunch = this.userProductsLunch.filter( t => t.foodId !== userFood.foodId);
      this.accountService.subject.next(this.sumFood.calories);
    }, error => console.error(error));
  }

  public removeDinner(userFood: UserFood): void {
    this.getUserFoodFromFirebase.removeDinner(userFood).subscribe(() => {
      this.addFoodChangesSubtract(this.sumDinner, userFood);
      this.addFoodChangesSubtract(this.sumFood, userFood);
      this.userProductsDinner = this.userProductsDinner.filter( t => t.foodId !== userFood.foodId);
      this.accountService.subject.next(this.sumFood.calories);
    }, error => console.error(error));
  }

  public removeSnack(userFood: UserFood): void {
    this.getUserFoodFromFirebase.removeSnack(userFood).subscribe(() => {
      this.addFoodChangesSubtract(this.sumSnack, userFood);
      this.addFoodChangesSubtract(this.sumFood, userFood);
      this.userProductsSnack = this.userProductsSnack.filter( t => t.foodId !== userFood.foodId);
      this.accountService.subject.next(this.sumFood.calories);
    }, error => console.error(error));
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
