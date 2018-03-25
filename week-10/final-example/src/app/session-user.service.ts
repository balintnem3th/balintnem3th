import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class SessionUserService {
  private userUrl = environment.apiUrl + 'me';
  constructor(private http: HttpClient) { }

  getLoggedInUser(): Observable<any> {
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
