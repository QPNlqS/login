import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserData, UserAuth } from '../models/user';
import * as userData from './userData.json';
import * as userAuth from './userAuth.json';

@Injectable()
export class FakeBackendHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>) {
    const { url, body } = req;
    const user: UserData = userData;
    const auth: UserAuth = userAuth;
    if (
      url.endsWith('/login') &&
      body.email == auth.email &&
      body.password == auth.password
    ) {
      return of(new HttpResponse({ status: 200, body: user })).pipe(
        delay(1000)
      );
    }
    return of(new HttpResponse({ status: 400 })).pipe(delay(1000));
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
