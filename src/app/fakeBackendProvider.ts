import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './models/user';
import * as testUser from './user.json';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>) {
    const { url, params } = req;
    const user: User = testUser;
    if (
      url.endsWith('/login') &&
      params.get('email') == user.email &&
      params.get('password') == user.password
    ) {
      return of(new HttpResponse({ status: 200, body: user.id })).pipe(
        delay(500)
      );
    }
    if (url.endsWith('/initialize')) {
      return of(new HttpResponse({ status: 200, body: user })).pipe(delay(500));
    }
    return of(new HttpResponse({ status: 400 })).pipe(delay(500));
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
