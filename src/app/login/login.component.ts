import { Component } from '@angular/core'; 
import { AuthService } from '../Service/authServie/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe({
      next: (response) => {
        this.authService.handleAuthentication(response.jwt);
        this.errorMessage = ''; // Clear any previous error message
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login neuspesan: ' + (error.error?.message || 'Pogresni kredencijali');
      }
    });
  }
}
