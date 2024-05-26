import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccommodationsService } from '../Service/AccommodationsService/accommodation.service';
import { AuthService } from '../Service/authServie/auth.service';
import { ConfirmationDialogCityComponent } from './confirmation-dialog-city/confirmation-dialog-city.component';
import { City } from '../accommodations/City.model';
import { SveMetodeService } from '../Service/sveMetode/sve-metode.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
})
export class CitiesComponent implements OnInit {
  cities: any[] = [];
  isAdmin: boolean = false;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sveMetode: SveMetodeService,
    private authService: AuthService,
    private dialog: MatDialog,
    private accommodationsService:AccommodationsService,
    private sveMetodeService:SveMetodeService 
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isLoggedIn();
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.accommodationsService.getCityList(+id).subscribe((data: City[]) => {
          this.cities = data;
          console.log(this.cities);
          
        });
      }
    });
  
  }

  addCity() {
    this.router.navigate(['/dodaj-grad']);
  }

  deleteCity(cityId: number, cityName: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogCityComponent, {
      width: '250px',
      data: { name: cityName }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sveMetode.deleteCity(cityId).subscribe({
          next: () => {
            console.log('City deleted successfully');
            this.cities = this.cities.filter(city => city.id !== cityId);
          },
          error: error => console.error('Failed to delete city:', error)
        });
      }
    });
  }

  goToDetails(cityId: number) {
    this.router.navigate(['/smestaji'], { queryParams: { id: cityId } });
  }
  edit(cityId: number) {
    this.router.navigate(['/dodaj-grad', cityId]);
  }
  vratiSlike(filename: string): string {
    return this.sveMetodeService.getImage(filename);
  }
}
