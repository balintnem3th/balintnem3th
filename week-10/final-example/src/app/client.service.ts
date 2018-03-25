import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Client } from './client';
import { environment } from '../environments/environment';

@Injectable()
export class ClientService {
  private userUrl = environment.apiUrl + 'clients';

  constructor(private http: HttpClient) {}

  addClient(client: Client): Observable<any> {
    const token = localStorage.getItem('auth.token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    const postData = {
      username: client.username,
      applicationDate: client.applicationDate,
      applicationLocation: client.applicationLocation,
      name: client.name,
      type: client.type,
      origin: client.origin,
      history: client.history,
      initiator: client.initiator,
      hasWrittenExtraInformation: client.hasWrittenExtraInformation,
      writtenExtraInformation: client.writtenExtraInformation,
      status: client.status,
      memo: client.memo,
      socialWorker: client.socialWorker
    };
    return this.http.post(this.userUrl, JSON.stringify(postData), httpOptions);
  }

  getClients(): Observable<any> {
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
