import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: User | undefined;

  constructor(private loginService: LoginService) {
    this.user = this.loginService.user;
    console.log(this.user);
  }
}
