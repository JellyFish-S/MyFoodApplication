import {Injectable} from '@angular/core';
import {UserFood} from '../interfaces';
import * as firebase from 'firebase';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetUserFoodService {
  productsArray: UserFood[] = [];
  date = [];
  dateFor = [];
  calFor = [];
  url = 'https://myfoodapplication-93d13.firebaseio.com';
  constructor(private http: HttpClient) {
  }

  async GetUserFoodFromFirebaseBreakfast(date: moment.Moment): Promise<UserFood[]> {
    const dataSnapShot = await firebase.database().ref(`breakfast/${date.format('DD-MM-YYYY')}`).once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    this.productsArray = [];
    for (const key in objDatabase) {
      if (objDatabase[key].userId === user.uid) {
        this.productsArray.push(objDatabase[key]);
      }
    }
    return this.productsArray;
  }

  async GetUserFoodFromFirebaseLunch(date: moment.Moment): Promise<UserFood[]> {
    const dataSnapShot = await firebase.database().ref(`lunch/${date.format('DD-MM-YYYY')}`).once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    this.productsArray = [];
    for (const key in objDatabase) {
      if (objDatabase[key].userId === user.uid) {
        this.productsArray.push(objDatabase[key]);
      }
    }
    return this.productsArray;
  }

  async GetUserFoodFromFirebaseDinner(date: moment.Moment): Promise<UserFood[]> {
    const dataSnapShot = await firebase.database().ref(`dinner/${date.format('DD-MM-YYYY')}`).once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    this.productsArray = [];
    for (const key in objDatabase) {
      if (objDatabase[key].userId === user.uid) {
        this.productsArray.push(objDatabase[key]);
      }
    }
    return this.productsArray;
  }

  async GetUserFoodFromFirebaseSnack(date: moment.Moment): Promise<UserFood[]> {
    const dataSnapShot = await firebase.database().ref(`snack/${date.format('DD-MM-YYYY')}`).once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    this.productsArray = [];
    for (const key in objDatabase) {
      if (objDatabase[key].userId === user.uid) {
        this.productsArray.push(objDatabase[key]);
      }
    }
    return this.productsArray;
  }

  removeBreakfast(userFood: UserFood): Observable<void> {
    return this.http.delete<void>(`${this.url}/breakfast/${userFood.date}/${userFood.foodId}.json`);
  }
  removeLunch(userFood: UserFood): Observable<void> {
    return this.http.delete<void>(`${this.url}/lunch/${userFood.date}/${userFood.foodId}.json`);
  }
  removeDinner(userFood: UserFood): Observable<void> {
    return this.http.delete<void>(`${this.url}/dinner/${userFood.date}/${userFood.foodId}.json`);
  }
  removeSnack(userFood: UserFood): Observable<void> {
    return this.http.delete<void>(`${this.url}/snack/${userFood.date}/${userFood.foodId}.json`);
  }
}



