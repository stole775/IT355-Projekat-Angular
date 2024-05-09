// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(searchTerm: string) {
    // Pretpostavimo da backend ima endpoint /search koji prihvata searchTerm
    return this.http.get<any>(`/search?term=${searchTerm}`);
  }
 

  searchCities(searchTerm: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/search/city/${searchTerm}`);
  }

  searchCountries(searchTerm: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/search/country/${searchTerm}`);
  }

  searchAccommodations(searchTerm: string) {
    return this.http.get<any[]>(`${environment.apiUrl}/api/search/accommodation/${searchTerm}`);
  }
}
 