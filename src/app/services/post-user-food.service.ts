import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserFood} from '../interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostUserFoodService {

  constructor(private http: HttpClient) {
  }

  createBreakfast(product: UserFood): Observable<UserFood> {
    return this.http.post<UserFood>(`${environment.fbDbUrl}/breakfast/${product.date}.json`, product);
  }
  createLunch(product: UserFood): Observable<UserFood> {
    return this.http.post<UserFood>(`${environment.fbDbUrl}/lunch/${product.date}.json`, product);
  }
  createDinner(product: UserFood): Observable<UserFood> {
    return this.http.post<UserFood>(`${environment.fbDbUrl}/dinner/${product.date}.json`, product);
  }
  createSnack(product: UserFood): Observable<UserFood> {
    return this.http.post<UserFood>(`${environment.fbDbUrl}/snack/${product.date}.json`, product);
  }
}
