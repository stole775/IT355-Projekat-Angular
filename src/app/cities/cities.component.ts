import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationsService } from '../Service/accommodation.service';
import { City } from '../accommodations/City.model';
import { ConfirmationDialogCityComponent } from './confirmation-dialog-city/confirmation-dialog-city.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
    private accommodationsService: AccommodationsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkIfAdmin();
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.accommodationsService.getCityList(+id).subscribe((data: City[]) => {
          this.cities = data;
          console.log(this.cities);
          
        });
      }  
    });
  }
  
  checkIfAdmin() {
    // Temporarily set admin to true for testing purposes
    this.isAdmin = true;
  }
  getCityImageUrls(cityId: number): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/api/city/city/image/${cityId}`);
}

  addCity() {
    this.router.navigate(['/dodaj-grad'] );  
    console.log('Adding a new city');
  }

  deleteCity(cityId: number, cityName: string): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        
    const dialogRef = this.dialog.open(ConfirmationDialogCityComponent, {
      width: '250px',
      data: { name: cityName }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8080/api/city/${cityId}`).subscribe({
          next: () => { 
            console.log('City deleted successfully');
            this.router.navigate(['/drzava'], { queryParams: { id: id } });  
          },
          error: (error) => { 
            console.error('Failed to delete city:', error);
          }
        });
      }
    });   }  
    });
  }
  goToDetails(cityId: number) {
    this.router.navigate(['/smestaji'], { queryParams: { id: cityId } });
  }
}
