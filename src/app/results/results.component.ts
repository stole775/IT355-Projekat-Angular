import { Component, OnInit } from '@angular/core';
import { SearchService } from '../Service/SearchService/search.service'; // Ažurirajte putanju prema vašem projektu

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: any = {
    cities: [],
    accommodations: [],
    countries: []
  };

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  search(searchTerm: string) {
    if (!searchTerm) {
      this.resetResults();
      return;
    }
    this.searchService.searchCities(searchTerm).subscribe(cities => this.results.cities = cities);
    this.searchService.searchCountries(searchTerm).subscribe(countries => this.results.countries = countries);
    this.searchService.searchAccommodations(searchTerm).subscribe(accommodations => this.results.accommodations = accommodations);
  }

  private resetResults() {
    this.results = { cities: [], accommodations: [], countries: [] };
  }
}
