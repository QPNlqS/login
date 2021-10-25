import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: User | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  async login(email: string, password: string) {
    this.user = await this.http
      .get<User>('http://localhost:4200/user/login', {
        params: {
          email,
          password,
        },
      })
      .toPromise();
    this.router.navigateByUrl('/home');
  }

  // initializeUser(userId: string) {
  //   return this.http.get('http://localhost:4200/user/initialize', {
  //     params: { id: userId },
  //   });
  // }
}
