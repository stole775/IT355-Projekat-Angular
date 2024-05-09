import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogCityComponent } from '../confirmation-dialog-city/confirmation-dialog-city.component';

@Component({
  selector: 'app-dodaj-grad',
  templateUrl: './dodaj-grad.component.html',
  styleUrls: ['./dodaj-grad.component.css']
})
export class DodajGradComponent implements OnInit {
  newCity = {
    name: '',
    countryId: null as number | null,
    description: '',
    image: null as File | null,
    additionalImages: [] as File[]
  };
  countries: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router
    ,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries() {
    this.http.get<any[]>('http://localhost:8080/api/country').subscribe({
      next: (data) => this.countries = data,
      error: (err) => this.errorMessage = 'Failed to load countries'
    });
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    let files = element.files;
    if (files && files.length > 0) {
      this.newCity.image = files[0];
    }
  }
  onAdditionalFilesSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    let files = element.files;
    if (files) {
      this.newCity.additionalImages = Array.from(files);
    }
  }
  deleteCity(cityId: number, cityName: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogCityComponent, {
      width: '250px',
      data: { name: cityName }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`http://localhost:8080/api/city/${cityId}`).subscribe({
          next: () => { 
            console.log('City deleted successfully');
          },
          error: (error) => { 
            console.error('Failed to delete city:', error);
          }
        });
      }
    });
  }
  
 submitCity() {
    const formData = new FormData();
    formData.append('name', this.newCity.name);
    formData.append('countryId', this.newCity.countryId?.toString() ?? '');
    formData.append('opisGrada', this.newCity.description);
    if (this.newCity.image) {
      formData.append('image', this.newCity.image, this.newCity.image.name);
    }
    this.newCity.additionalImages.forEach((file) => {
      formData.append('additionalImages', file, file.name);
    });
    this.http.post('http://localhost:8080/api/city/', formData).subscribe({
      next: () => {
        this.router.navigate(['/drzava']);
      },
      error: (error) => {
        console.error('Failed to add city', error);
        this.errorMessage = 'Failed to add city';
      }
    });
  }


}