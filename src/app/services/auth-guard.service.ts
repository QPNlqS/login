import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate() {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    return true;
  }
}
