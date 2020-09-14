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

  async getProductInformationFromFB(searchText: string): Promise<any> {
    this.arrOfProd = [];
    if (searchText) {
       await firebase.database().ref('products/')
        .orderByChild('name')
        .startAt(searchText.trim().toLowerCase())
        .endAt(searchText.trim().toLowerCase() + '\uf8ff')
        .on('child_added', (snapshot) => {
          this.productDB = snapshot.val();
          this.arrOfProd.push(this.productDB);
        });
    }

    return this.arrOfProd;
  }

}

