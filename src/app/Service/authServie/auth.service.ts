import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

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
      const isExpired = (decoded.exp * 1000) < Date.now(); // decoded.exp je u sekundama, dok Date.now() daje vreme u milisekundama
  
      //console.log("Token expiration time:", new Date(decoded.exp * 1000).toLocaleString());
     // console.log("Current time:", new Date().toLocaleString());
  
      if (isExpired) {
        this.logout(); // Ako je token istekao, odmah pozovi logout
        return true; // Vrati true jer je token istekao
      }
  
      return false; // Vrati false ako token još nije istekao
    } catch (error) {
      console.error('Token decoding failed:', error);
      this.logout(); // U slučaju greške, takođe izloguj korisnika
      return true; // Vrati true jer je u pitanju nevalidan token
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
    // Use backticks for template literal to inject the environment.apiUrl
    this.http.post(`${environment.apiUrl}/auth/logout`, {}, { // {} for empty request body
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe({
      next: () => {
        console.log("Logged out successfully.");
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/home']);
      },
      error: error => {
        console.error('Logout failed:', error);
        localStorage.removeItem('jwtToken');
      }
    });
  } else {
    localStorage.removeItem('jwtToken');
    console.error("No token found on logout.");
    this.router.navigate(['/home']);
  }
}


  login(username: string, password: string): Observable<{ jwt: string }> { 
    localStorage.removeItem('jwtToken');//bug pa mora ovde dok ne resim
    return this.http.post<{ jwt: string }>(`${environment.apiUrl}/auth/login`, { username, password });
  }

  handleAuthentication(jwt: string): void {
    console.log('Login successful:', jwt);
    localStorage.setItem('jwtToken', jwt);
    this.router.navigate(['/']);
  }
}
