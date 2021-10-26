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
  user: User | null | undefined;

  constructor(private userService: UserService, private router: Router) {
    this.userService.initialize().then((user) => (this.user = user));
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['login']);
  }
}
