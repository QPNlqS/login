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
  private userJsonPath = 'assets/user.json';
  constructor(private http: HttpClient) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler) {
    const { url } = req;
    if (url.endsWith('/login')) {
      const user: User = testUser;
      return of(new HttpResponse({ status: 200, body: user })).pipe(delay(500));
    }
    return next.handle(req);
  }
}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendHttpInterceptor,
  multi: true,
};
