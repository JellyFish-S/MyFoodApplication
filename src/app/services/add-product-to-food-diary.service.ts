import {Injectable} from '@angular/core';
import {ProductsDB} from '../interfaces';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
  })
export class AddProductToFoodDiaryService {
  productDB: ProductsDB;
  arrOfProd: ProductsDB[] = [];
  searchText: string;

  async getProductInformationFromFB(): Promise<any> {
    this.arrOfProd = [];
    if (this.searchText) {
       await firebase.database().ref('products/')
        .orderByChild('name')
        .startAt(this.searchText.trim().toLowerCase())
        .endAt(this.searchText.trim().toLowerCase() + '\uf8ff')
        .on('child_added', (snapshot) => {
          this.productDB = snapshot.val();
          this.arrOfProd.push(this.productDB);
        });
    }
    return this.arrOfProd;
  }
}

