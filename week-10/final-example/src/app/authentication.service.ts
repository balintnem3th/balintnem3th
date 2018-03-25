import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class AuthenticationService {

  private userUrl = environment.apiUrl + 'auth/login';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' })
  };

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    let refreshToken: string;
    let refreshTokenExpiresAt: Date;

    refreshToken = localStorage.getItem('auth.refresh.token');
    refreshTokenExpiresAt = new Date(localStorage.getItem('auth.refresh.expiresAt'));

    return refreshToken !== null && refreshTokenExpiresAt > new Date();
  }

  getToken(): string {
    return localStorage.getItem('auth.token');
  }

  logout(): Observable<any> {
    const httpOptions = Object.assign({}, this.httpOptions);
    httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + localStorage.getItem('auth.token'));
    return this.http.delete(this.userUrl, httpOptions)
      .pipe(
        tap(() => this.clearLocalStorage()));
  }

  login(username: string, password: string): Observable<any> {
    const requestBody = JSON.stringify({
      username,
      password
    });

    return this.http.post(this.userUrl, requestBody, this.httpOptions)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('auth.token', res.token);
          localStorage.setItem('auth.expiresAt', res.tokenExpiration);
          localStorage.setItem('auth.refresh.token', res.refreshToken);
          localStorage.setItem('auth.refresh.expiresAt', res.refeshTokenExpiration);
        })
      );
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('auth.token');
    localStorage.removeItem('auth.expiresAt');
    localStorage.removeItem('auth.refresh.token');
    localStorage.removeItem('auth.refresh.expiresAt');
  }

}
