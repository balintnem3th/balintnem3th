import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class EmptyBodyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          if (this.is2xxStatus(response)) {
            return of(new HttpResponse({
              headers: response.headers,
              status: response.status,
              statusText: response.statusText,
              url: response.url
            }));
          }
        }
        return _throw(response);
      }
      )
    );
  }

  private is2xxStatus(response: HttpResponseBase) {
    return response.status >= 200 && response.status < 300;
  }
}
