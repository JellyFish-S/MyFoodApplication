import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;


@Injectable({providedIn: 'root'})
export class RegistrationService {
  constructor(public afAuth: AngularFireAuth ) {}

  // tslint:disable-next-line:typedef
  async register(email: string, password: string): Promise<UserCredential> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
