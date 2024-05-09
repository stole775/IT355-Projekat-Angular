import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {
  countries: any[] = [];
  isDropdownOpen = false;  // State to manage dropdown visibility

  constructor(private http: HttpClient, private router: Router,public authService: AuthService) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.http.get<any[]>('http://localhost:8080/api/country').subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('Failed to load countries:', error);
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
}
