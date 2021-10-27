import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  get email() {
    return this.form.get('email')!;
  }
  get password() {
    return this.form.get('password')!;
  }

  loginFailed = false;
  loginFailedMessage = 'Something went wrong';

  constructor(private userService: UserService) {}

  async login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loginFailed = true;
      this.loginFailedMessage = 'Please provide valid credentials.';
      return;
    } else {
      const success = await this.userService.login(
        this.email.value,
        this.password.value
      );
      if (!success) {
        this.loginFailed = true;
        this.loginFailedMessage = 'Wrong credentials. Please try again.';
      }
    }
  }
}
