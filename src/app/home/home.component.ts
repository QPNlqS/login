import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: User | null;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.logoutUser();
  }
}
