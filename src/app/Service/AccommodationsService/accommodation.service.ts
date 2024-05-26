import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accommodation } from '../../accommodations/Accommodation.model';
import { Injectable } from '@angular/core';
import { City } from '../../accommodations/City.model';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
 
  

  constructor(private http: HttpClient) {}

  // Pretpostavka je da endpoint očekuje ID grada
  getAccommodationsByCityId(cityId: number): Observable<Accommodation[]> {
     console.log('getAccommodationsByCityId'+"  "+ {cityId});
    return this.http.get<Accommodation[]>(`${environment.apiUrl}/api/accommodation/cityId/${cityId}`);
     // Vraća smeštaj po ID-u za stranicu SELECT * FROM Accommodations WHERE city_id = ?
  }
  getCityList(cityId: number): Observable<City[]> {console.log('getCityList');
    return this.http.get<City[]>(`${environment.apiUrl}/api/city/countryId/${cityId}`);
    //SELECT * FROM Cities WHERE country_id = ?'
 }
    getCity(cityId: number): Observable<City> {console.log('getCity');
      return this.http.get<City>(`${environment.apiUrl}/api/city/${cityId}`);
   //SELECT * FROM Cities WHERE id = ?
    }

    deleteAccommodation(accommodationId: number): Observable<any> {//admin
      return this.http.delete(`${environment.apiUrl}/api/accommodation/${accommodationId}`);
    }    
}
