import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: User | null | undefined;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.initialize().then((user) => (this.user = user));
  }

  logout() {
    this.loginService.logoutUser();
    this.router.navigate(['login']);
  }
}
