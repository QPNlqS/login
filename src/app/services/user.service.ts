import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(
    email: string,
    password: string
  ): Promise<boolean | UserData | null> {
    const res = await this.http
      .post<UserData>(
        'http://localhost:4200/user/login',
        {
          email,
          password,
        },
        {
          observe: 'response',
        }
      )
      .toPromise();
    const successful = res.ok && res.body;
    if (successful) {
      this.completeLogin(res.body!);
    }
    return successful;
  }

  private completeLogin(user: UserData) {
    this.setIsLoggedIn(true);
    this.setUser(JSON.stringify(user));
    this.router.navigate(['home']);
  }

  logoutUser() {
    this.setIsLoggedIn(false);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private setIsLoggedIn(status: boolean) {
    localStorage.setItem('isLoggedIn', status + '');
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user) as UserData;
    }
    return null;
  }

  private setUser(user: string) {
    localStorage.setItem('user', user);
  }
}
