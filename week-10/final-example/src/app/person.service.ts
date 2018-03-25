import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Person } from './person';
import { environment } from '../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PersonService {
  private userUrl = environment.apiUrl + 'persons';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) {}

  addPerson(person: Person): Observable<any> {
    const token = this.auth.getToken();
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + token
      }
    };
    const postData = {
      name: person.name,
      gender: person.gender,
      bornAs: person.birthName,
      birthPlace: person.birthPlace,
      dateOfBirth: person.dateOfBirth,
      mothersName: person.mothersName,
      idCardNumber: person.idNumber,
      healthInsuranceCardNumber: person.socialSecurity,
      address: person.permanentAddress,
      addressSince: person.permanentAddressSince,
      temporaryAddress: person.temporaryAddress,
      temporaryAddressSince: person.temporaryAddressSince,
      correspondingAddress: person.currentAddress,
      correspondingAddressSince: person.currentAddressSince,
      underProtection: person.isUnderProtection ? 'YES' : 'NO',
      role: person.roles,
      maritalStatus: person.maritalStatus,
      phoneNumber: person.phoneNumber,
      email: person.email,
      memo: person.memo
    };
    return this.http.post(this.userUrl, JSON.stringify(postData), httpOptions);
  }

  getPerson(personId: string): Observable<any> {
    const token = this.auth.getToken();
    const httpOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: 'Bearer ' + token
      }
    };
    return this.http.get(`${this.userUrl}/${personId}`, httpOptions);
  }

  getPersons(): Observable<any> {
    const token = this.auth.getToken();

    const httpOptions = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: `Bearer ${token}`
      }
    };

    return this.http.get(this.userUrl, httpOptions);
  }
}
