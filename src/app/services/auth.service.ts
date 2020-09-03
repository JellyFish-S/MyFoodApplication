import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public  afAuth: AngularFireAuth,
    public router: Router
  ) {
  }

  get token(): string {
    return localStorage.getItem('fb-token');
  }

  async login(email: string, password: string): Promise<UserCredential> {
    const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.setToken(credential.user.uid);
    return credential;
  }

  logout(): void {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(token: string | null): void {
    if (token) {
      localStorage.setItem('fb-token', token);
    } else {
      localStorage.clear();
    }
  }
}
