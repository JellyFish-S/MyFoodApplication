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

  create(product: UserFood): Observable<UserFood> {
    return this.http.post<UserFood>(`${environment.fbDbUrl}/breakfast/${product.date}.json`, product);
  }
}
