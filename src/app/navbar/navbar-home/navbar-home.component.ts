import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/authServie/auth.service';  
import { SveMetodeService } from 'src/app/Service/sveMetode/sve-metode.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {
  countries: any[] = [];
  isDropdownOpen = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    private countriesService: SveMetodeService
  ) {}

  ngOnInit(): void {
    this.countriesService.fetchCountries().subscribe({
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
 