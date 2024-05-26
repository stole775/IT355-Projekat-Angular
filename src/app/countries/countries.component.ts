import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { SveMetodeService } from '../Service/sveMetode/sve-metode.service';
import { AuthService } from '../Service/authServie/auth.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];

  constructor(
    private countryService: SveMetodeService,
     private router: Router,
     private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin();
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      }
    });
  }
  isAdmin(){
    return this.authService.isLoggedIn();
  }
  
  goToDetails(country: {name: string, image_url: string}) {
    this.router.navigate(['/country-details', country.name]);
  }
  vratiSlike(filename: string): string {
    return this.countryService.getImage(filename);
  }
}
