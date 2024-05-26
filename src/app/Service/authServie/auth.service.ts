import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

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
      return false;
    } 
    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const isExpired = (decoded.exp * 1000) < Date.now();
      //console.log("Token expiration time:", new Date(decoded.exp * 1000).toLocaleString());
     // console.log("Current time:", new Date().toLocaleString());
      return isExpired;
    } catch (error) {
      console.error('Token decoding failed:', error);
      this.logout();
      return true;
    }
  }

  isUserAdmin(): boolean {//ako budem imao vise rola
    const token = this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log(decoded.Role);
        return decoded.Role && decoded.Role.includes('ADMIN');
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
      this.http.post('http://localhost:8080/auth/logout', { responseType: 'json' }, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).subscribe({
        next: () => {
          console.log("Logged out successfully.");
          localStorage.removeItem('jwtToken');
          this.router.navigate(['/home']);
        },
        error: error => {console.error('Logout failed:', error)
        localStorage.removeItem('jwtToken');}
      });
    } else {
      console.error("No token found on logout.");
    }
  }

  login(username: string, password: string): Observable<{ jwt: string }> { 
    localStorage.removeItem('jwtToken');//bug pa mora ovde dok ne resim
    return this.http.post<{ jwt: string }>('http://localhost:8080/auth/login', { username, password });
  }

  handleAuthentication(jwt: string): void {
    console.log('Login successful:', jwt);
    localStorage.setItem('jwtToken', jwt);
    this.router.navigate(['/']);
  }
}
