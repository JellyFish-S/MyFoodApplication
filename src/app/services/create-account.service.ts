import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class CreateAccountService {
  constructor(private http: HttpClient) {}
  create(user: User): Observable<User> {
    return this.http.post<User>(`${environment.fbDbUrl}/users.json`, user);
  }
}
