import { Component } from '@angular/core';
import { UserData } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: UserData | null;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  logout() {
    this.userService.logoutUser();
  }
}
