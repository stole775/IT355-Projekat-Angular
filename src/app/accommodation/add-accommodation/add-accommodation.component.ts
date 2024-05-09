import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css']
})
export class AddAccommodationComponent implements OnInit {
  newAccommodation = {
    city_id: 0,
    name: '',
    description: '',
    priceFrom: null as number | null,
    available: null as boolean | null,
    numberOfNights: null as number | null,
    notIncluded: '',
    imageUrl: null as File | null,
    priceListImageUrl: null as File | null,
    featured:null as boolean | null,
  }; 
  errorMessage: string = '';
  accommodationId: number | null = null;//kada dodamo koristimo da bi sacuvali slike smestaju
  city: any;//povlacenje grada za naziv iznad
  selectedFiles: File[] = [];//vise slika za smestaj
  selectedFilesGS!: File;//glavna slika
  selectedFilesCen!: File;//cenovnik
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

   

  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      if (params['cityId']) { 
        this.getCity(+params['cityId']);
      }
    });
  }

  getCity(id: number) {
    this.http.get<any>(`http://localhost:8080/api/city/${id}`).subscribe(data => {
      this.city = data; 
    });
  }

   


  submitAccommodation(): void { 
    if (this.city && this.city.id) {
      const accommodationData = {
        city: this.city,
        name: this.newAccommodation.name,
        description: this.newAccommodation.description,
        priceFrom: this.newAccommodation.priceFrom,
        available: this.newAccommodation.available,  
        numberOfNights: this.newAccommodation.numberOfNights,
        notIncluded: this.newAccommodation.notIncluded,
        featured: this.newAccommodation.featured  
      };
  
      console.log(accommodationData);
      this.http.post('http://localhost:8080/api/accommodation/', accommodationData).subscribe({
        next: (response: any) => {
          console.log("Response from server: ", response);
          if (response.status === 'success') {
            this.accommodationId = response.id;  
            console.log("res id " +response.id);
            this.uploadImages();
          } else {
            this.errorMessage = 'Failed to add accommodation: Unexpected response from server';
          }
        },
        error: err => this.errorMessage = 'Failed to add accommodation: ' + err.message
      }); 
    } else {
      console.error('City data is not available yet');
    }
  }

  uploadImages(): void {
    if (this.accommodationId) {
      this.uploadSingleImage(this.selectedFilesGS, 1);
      this.uploadSingleImage(this.selectedFilesCen, 2);
    
    this.uploadViseSlika(this.accommodationId);
}
  }
  onMainImageSelected(event: any): void {
    this.selectedFilesGS  = event.target.files[0];
  }

  onPriceListImageSelected(event: any): void {
    this.selectedFilesCen  = event.target.files[0];
  }
   selectViseSlika(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFiles = Array.from(fileList);
    }
  }
  uploadViseSlika(accommodationId:number): void {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      this.selectedFiles.forEach((file) => {
        formData.append('images', file, file.name);
      });

      // Append accommodationId to formData
      formData.append('accommodationId', accommodationId.toString());

      this.http.post('http://localhost:8080/upload', formData, { responseType: 'text' }).subscribe({
    next: (response) => {
      console.log('uploadViseSlika uspesan!', response);
      this.router.navigate(['/smestaj'], { queryParams: { id: this.city.id } });
    },
    error: (error) => {
      console.error('uploadViseSlika nesupesan!', error);
      this.errorMessage = 'Greska: ' + error.message;
    }
});
    } else {
      console.error('Nema odabranih fajlova');
    }
  }

  uploadSingleImage(file: File, type: number): void {
    if (!file) {
      console.error('Nema odabranih fajlova');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type.toString());
    this.http.post<{ imageUrl: string }>(`http://localhost:8080/single`, formData, { responseType: 'json' }).subscribe({
     next: (response: { imageUrl: string }) => {
        console.log('uploadSingleImage uspesno: ', response.imageUrl);
        const imageUrl = response.imageUrl;
        this.uploadAccommodationImage(imageUrl, type);
      },
      error: err => {
        console.error('uploadSingleImage neuspesno: ', err);
        this.errorMessage = 'uploadSingleImage gresak: ' + err.message;
      }
    });
  }
  uploadAccommodationImage(imageUrl: string, type: number): void {
    console.log('uploadAccommodationImage pocetak: ', imageUrl);
    const formData = new FormData();
    formData.append('type', type.toString());
    formData.append('imageUrl', imageUrl);
  
    this.http.put(`http://localhost:8080/api/accommodation/${this.accommodationId}/image`, formData, { responseType: 'text' }).subscribe({
      next: (response: any) => {
        console.log('uploadAccommodationImage uspesno: ', response);
      },
      error: err => {
        console.error('uploadAccommodationImage greska: ', err);
        this.errorMessage = 'uploadAccommodationImage error: ' + err.message;
      }
    });
  }
 
}
