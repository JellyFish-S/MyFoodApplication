import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseUserInterface} from '../interfaces';


@Injectable()
export class CheckUserIdService {

  async getUserInformationFromFirebase(): Promise<FirebaseUserInterface> {
    const dataSnapShot = await firebase.database().ref('users/').once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    for (const key in objDatabase) {
      if (user != null && objDatabase[key].userId === user.uid) {
        return objDatabase[key];
      }
    }
    return null;
  }
  async getUserId(): Promise<string> {
    const dataSnapShot = await firebase.database().ref('users/').once('value');
    const objDatabase = dataSnapShot.val();
    const user = await firebase.auth().currentUser;
    for (const key in objDatabase) {
      if (user != null && objDatabase[key].userId === user.uid) {
        return objDatabase[key].userId;
      }
    }
    return null;
  }
}
