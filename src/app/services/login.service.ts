import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(email: string, password: string) {
    const res = await this.http
      .get('http://localhost:4200/user/login', {
        params: {
          email,
          password,
        },
        observe: 'response',
      })
      .toPromise();
    if (res.ok && res.body) {
      this.loginUser();
      this.saveUserId(res.body.toString());
      this.router.navigateByUrl('/home');
      return true;
    }
    return false;
  }

  async initialize() {
    const userId = this.getActiveUserId();
    if (userId) {
      const res = await this.http
        .get<User>('http://localhost:4200/user/initialize', {
          params: {
            userId,
          },
          observe: 'response',
        })
        .toPromise();
      if (res.ok) {
        return res.body;
      }
    }
    return null;
  }

  loginUser() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  logoutUser() {
    localStorage.setItem('isLoggedIn', 'false');
  }

  isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  saveUserId(id: string) {
    localStorage.setItem('userId', id);
  }

  getActiveUserId() {
    return localStorage.getItem('userId');
  }
}
