import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
  private userUrl = environment.apiUrl + 'users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('auth.token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get(this.userUrl, httpOptions).map((res: Response) => res);
  }
}
