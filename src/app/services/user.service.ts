import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  async login(email: string, password: string): Promise<boolean | User | null> {
    const res = await this.http
      .get<User>('http://localhost:4200/user/login', {
        params: {
          email,
          password,
        },
        observe: 'response',
      })
      .toPromise();
    const successful = res.ok && res.body;
    if (successful) {
      this.completeLogin(res.body!);
    }
    return successful;
  }

  private completeLogin(user: User) {
    this.setIsLoggedIn();
    this.setUser(JSON.stringify(user));
    this.router.navigate(['home']);
  }

  logoutUser() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private setIsLoggedIn() {
    localStorage.setItem('isLoggedIn', 'true');
  }

  getUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user) as User;
    }
    return null;
  }

  private setUser(user: string) {
    localStorage.setItem('user', user);
  }
}
