import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ProductsDB} from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CreateFoodDatabaseService {

  constructor(private http: HttpClient) {
  }

  create(product: ProductsDB): Observable<ProductsDB> {

    return this.http.post<ProductsDB>(`${environment.fbDbUrl}/products.json`, product);
  }
}
