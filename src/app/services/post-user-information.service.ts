import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FirebaseUserInterface} from '../interfaces';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class PostUserInformationService {


  constructor(private http: HttpClient) {
  }

  create(user: FirebaseUserInterface): Observable<FirebaseUserInterface> {

    return this.http.post<FirebaseUserInterface>(`${environment.fbDbUrl}/users.json`, user);
      // .pipe(map(() => {
      //   return {
      //     ...user
      //   };
      // }));
  }
  }
