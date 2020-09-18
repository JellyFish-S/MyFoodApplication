import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseName, UserFood} from '../interfaces';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostUserFoodService {

  constructor(private http: HttpClient) {
  }

  createBreakfast(product: UserFood): Observable<ResponseName> {
    return this.http.post<ResponseName>(`${environment.fbDbUrl}/breakfast/${product.date}.json`, product);
  }
  createLunch(product: UserFood): Observable<ResponseName> {
    return this.http.post<ResponseName>(`${environment.fbDbUrl}/lunch/${product.date}.json`, product);
  }
  createDinner(product: UserFood): Observable<ResponseName> {
    return this.http.post<ResponseName>(`${environment.fbDbUrl}/dinner/${product.date}.json`, product);
  }
  createSnack(product: UserFood): Observable<ResponseName> {
    return this.http.post<ResponseName>(`${environment.fbDbUrl}/snack/${product.date}.json`, product);
  }
}
