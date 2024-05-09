import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: any[] = [];

  constructor(private http: HttpClient, private router: Router) {} // Dodajte router ovde


  ngOnInit() {
    this.http.get<{name: string, image_url: string}[]>('http://localhost:8080/api/country').subscribe(data => {
      this.countries = data;
    });
  }
  
  goToDetails(country: {name: string, image_url: string}) {
    // Implementirajte navigaciju. Na primer:
     this.router.navigate(['/country-details', country.name]);
  }
  


}
