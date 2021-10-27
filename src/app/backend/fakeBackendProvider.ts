import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user';
import * as testUser from './user.json';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>) {
    const { url, params } = req;
    const user: User = testUser;
    if (
      url.endsWith('/login') &&
      params.get('email') == user.email &&
      params.get('password') == user.password
    ) {
      return of(new HttpResponse({ status: 200, body: user.id })).pipe(
        delay(1000)
      );
    }
    if (url.endsWith('/initialize')) {
      return of(new HttpResponse({ status: 200, body: user }));
    }
    return of(new HttpResponse({ status: 400 })).pipe(delay(1000));
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
