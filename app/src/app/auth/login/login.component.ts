import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = "Student Login Form"

  constructor(
    public authService: AuthService
  ) {}

  credentials = {
    email: '',
    password: ''
  }

  onSubmit() {
    this.authService.login(this.credentials)
  }
}
