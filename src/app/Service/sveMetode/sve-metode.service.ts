import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../../accommodations/City.model';

@Injectable({
  providedIn: 'root'
})
export class SveMetodeService {
 

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCity(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/city/${id}`);
  }
  getImage(filename: string): string {
    return `${this.baseUrl}/images/${filename}`;
  }

  submitAccommodation(accommodationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/accommodation/`, accommodationData);
  }

  uploadSingleImage(file: File, type: number, accommodationId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type.toString());
    return this.http.post(`${this.baseUrl}/single`, formData);
  }

  uploadAccommodationImage(imageUrl: string, type: number, accommodationId: number): Observable<any> {
    const formData = new FormData();
    formData.append('imageUrl', imageUrl);
    formData.append('type', type.toString());
    return this.http.put(`${this.baseUrl}/api/accommodation/${accommodationId}/image`, formData);
  }

  uploadMultipleImages(files: File[], accommodationId: number): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file, file.name);
    });
    formData.append('accommodationId', accommodationId.toString());
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  //accomodation
  getAccommodation(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/accommodation/${id}`);
  }

  getAccommodationPhotos(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/accomodationphoto/images/${id}`);
  }
  //accommodation edit
   
   
  ///app-cities gradovi
  getCityList(countryId: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/api/city/${countryId}`);
  }

  deleteCity(cityId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/city/${cityId}`);
  }

  getCityImageUrls(cityId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/city/city/image/${cityId}`);
  }
  /// dodaj grad
  fetchCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/country`);
  }

  submitCity(cityData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/city/`, cityData);
  }

  //countiries
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/country`);
  }
  /// /api/accommodation/istaknutiOglasi
  getFeaturedOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/accommodation/istaknutiOglasi`);
  }
//edit slike
deletePhoto(imageUrl: string): Observable<any> { 
  return this.http.delete(`${this.baseUrl}/delete/${imageUrl}`);
}
removeAccommodationImage(id: number, type: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/api/accommodation/${id}/slike`, null, {
    params: new HttpParams().set('type', type.toString())
  });
}

}
