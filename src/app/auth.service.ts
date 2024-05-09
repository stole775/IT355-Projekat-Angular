import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      console.log("No token found.");
      return false;
    }
    console.log("Token found:", token);
    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const isExpired = (decoded.exp * 1000) < Date.now();
      console.log("Token expiration status:", isExpired);
      return isExpired;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return true;
    }
  }

  isUserAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        return decoded.roles && decoded.roles.includes('ADMIN');
      } catch (error) {
        console.error('Failed to decode token for admin check:', error);
        return false;
      }
    }
    return false;
  }

  logout(): void {
    const token = this.getToken();
    if (token) {
      this.http.post('http://localhost:8080/auth/logout', {}, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).subscribe({
        next: () => {
          console.log("Logged out successfully.");
          localStorage.removeItem('jwtToken');
          this.router.navigate(['/login']);
        },
        error: error => console.error('Logout failed:', error)
      });
    } else {
      console.error("No token found on logout.");
    }
  }
}
