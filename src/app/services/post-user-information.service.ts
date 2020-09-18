import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FirebaseUserInterface, ResponseName, UserWeight} from '../interfaces';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostUserInformationService {


  constructor(private http: HttpClient) {
  }

  create(user: FirebaseUserInterface): Observable<ResponseName> {

    return this.http.post<ResponseName>(`${environment.fbDbUrl}/users.json`, user);
  }


  postNewWeight(userWeight: UserWeight): Observable<UserWeight> {
    return this.http.post<UserWeight>(`${environment.fbDbUrl}/weight.json`, userWeight);
  }
  }
