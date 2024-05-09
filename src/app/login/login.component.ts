import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.http.post<{ token: string }>('http://localhost:8080/auth/login', this.loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Save the JWT token to local storage
        localStorage.setItem('jwtToken', response.token);
        // Navigate to the admin panel or somewhere else after login
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
