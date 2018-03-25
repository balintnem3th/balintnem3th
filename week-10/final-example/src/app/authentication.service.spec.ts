import { TestBed, inject, async } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let loginResponse;
  let responseForm;
  let authenticationService;
  let http;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
  }));

  beforeEach(() => {
    responseForm = '<form />';
    authenticationService = TestBed.get(AuthenticationService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should be called with proper arguments and headers plus body', () => {
    authenticationService.login('admin', '1234').subscribe((response) => {
      loginResponse = response;
    });

    http.expectOne((request: HttpRequest<any>) => {
      return request.method === 'POST'
        && request.url === 'http://localhost:8085/api/auth/login'
        && request.body === JSON.stringify({
          username: 'admin', password: '1234'
        })
        && request.headers.get('Content-Type') === 'application/json'
        && request.headers.get('Authorization') === 'Bearer'
        && request.headers.get('X-Requested-With') === 'XMLHttpRequest';
    }).flush(responseForm);
    expect(loginResponse).toEqual(responseForm);
  });
});
