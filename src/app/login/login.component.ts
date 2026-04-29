import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // component state
  username: string = 'admin';
  password: string = 'password';

  // initialize the component
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // event handlers
  loginHandler(): void {
    console.log('inside loginHandler');
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        console.log('Login successful');
      },
      error: (err) => {
        //
      },
    });
  }
}
