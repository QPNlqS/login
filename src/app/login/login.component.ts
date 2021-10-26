import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

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

  constructor(private loginService: LoginService) {}

  async login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loginFailed = true;
      this.loginFailedMessage = 'Please provide valid credentials.';
      return;
    } else {
      const success = await this.loginService.login(
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
