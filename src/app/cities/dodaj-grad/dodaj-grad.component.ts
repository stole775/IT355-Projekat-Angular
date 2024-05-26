import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SveMetodeService } from 'src/app/Service/sveMetode/sve-metode.service';
import { AuthService } from 'src/app/Service/authServie/auth.service';

@Component({
  selector: 'app-dodaj-grad',
  templateUrl: './dodaj-grad.component.html',
  styleUrls: ['./dodaj-grad.component.css']
})
export class DodajGradComponent implements OnInit {
  cityId?: number;
  newCity = {
    name: '',
    countryId: null as number | null,
    description: '',
    slikaGradaURL: '',
    image: null as File | null
  };
  countries: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sveMetodeService: SveMetodeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.loadCountries();
      this.route.params.subscribe(params => {
        const id = +params['id'];   
        if (id) {
          this.loadCityDetails(id);
        }
      });
    }
  }

  loadCountries() {
    this.sveMetodeService.fetchCountries().subscribe({
      next: data => this.countries = data,
      error: err => this.errorMessage = 'Failed to load countries: ' + err.message
    });
  }

  loadCityDetails(cityId: number) {
    this.sveMetodeService.getCity(cityId).subscribe({
      next: city => {
        this.cityId=cityId;
        this.newCity.name = city.name;
        this.newCity.countryId = city.country.id;
        this.newCity.description = city.opisGrada;
        this.newCity.slikaGradaURL = city.slikaGradaURL;
      },
      error: err => this.errorMessage = 'Failed to load city details: ' + err.message
    });
  }

  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    let files = element.files;
    if (files && files.length > 0) {
      this.newCity.image = files[0];
      this.newCity.slikaGradaURL = '';   
    }
  }

  submitCity() {
    const formData = new FormData();
    formData.append('name', this.newCity.name);
    formData.append('countryId', this.newCity.countryId?.toString() ?? '');
    formData.append('opisGrada', this.newCity.description);
    if (this.newCity.image) {
      formData.append('image', this.newCity.image, this.newCity.image.name);
    }

    if (this.cityId) {
      formData.append('id', this.cityId.toString());
      console.log(this.cityId+"  uhgigigb");
      
    } 
    console.log(formData );
    this.sveMetodeService.submitCity(formData).subscribe({
      
       next: () => this.router.navigate(['/drzava'], { queryParams: { id: this.newCity.countryId}}),
      error: error => {
        console.error('Failed to add or update city:', error);
        this.errorMessage = 'Failed to add or update city: ' + error.message;
      }
    }); 
  }

  vratiSlike(filename: string): string {
    return this.sveMetodeService.getImage(filename);
  }
}
