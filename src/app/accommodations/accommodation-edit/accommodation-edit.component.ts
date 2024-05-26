import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/authServie/auth.service';
import { SveMetodeService } from 'src/app/Service/sveMetode/sve-metode.service';

@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css']
})
export class AccommodationEditComponent implements OnInit {
  accommodation: any = { photos: [] };
  isAdmin: boolean = false; 
  id:number=0;
  constructor(
    private route: ActivatedRoute,
    private sveMetodeService: SveMetodeService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const accommodationId = this.route.snapshot.paramMap.get('accommodationId');
    if (!accommodationId) {
      this.router.navigate(['/home']);
      return;
    }
    this.id=+accommodationId;
    this.sveMetodeService.getAccommodation(+accommodationId).subscribe({
      next: (accommodationData) => {
        this.accommodation = accommodationData;
        this.getCity(this.accommodation.city.id);  
        console.log(accommodationData + ' init');
   
        this.sveMetodeService.getAccommodationPhotos(+accommodationId).subscribe({
          next: (photosData) => {
            this.accommodation.photos = photosData || []; 
            console.log(photosData);
          },
          error: (photosError) => {
            console.error('Error loading photos:', photosError);
          }
        });
  
      },
      error: (error) => {
        console.log('Nema slika:', error);
        this.router.navigate(['/home']);  
      }
    });
  
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
      return;  
    }
  
    this.isAdmin = true;
  }

 
  deletePhoto(url: string): void {
    if (url  ) {  
      console.log("Deleting photo with URL:", url);
      this.sveMetodeService.deletePhoto(url).subscribe({
        next: () => {  
          this.accommodation = null;
          this.ngOnInit();
          console.log('Photo deleted successfully');
        },
        error: (error) => {
          console.error('Failed to delete photo:', error);
        }
      });
    } else {
      console.log("Photo URL is invalid or null");
    }
  }
  

  //-----------------
  errorMessage: string = '';  
  selectedFiles: File[] = [];
  selectedFilesGS!: File;
  selectedFilesCen!: File; 
  city: any;
  getCity(id: number) {
    this.sveMetodeService.getCity(id).subscribe({
      next: data => {
        this.city = data;
      },
      error: error => {
        console.error('Failed to fetch city:', error);
        this.errorMessage = 'Failed to fetch city';
      }
    });
  }
  submitUpdate(): void {
    if (this.accommodation.city && this.accommodation.city.id) {
      const accommodationData = {
        id: this.id,
        city: this.city,
        name: this.accommodation.name,
        description: this.accommodation.description,
        priceFrom: this.accommodation.priceFrom,
        available: this.accommodation.available === '1' || this.accommodation.available === true,  // Konverzija u boolean
        numberOfNights: this.accommodation.numberOfNights,
        notIncluded: this.accommodation.notIncluded,
        featured: this.accommodation.featured === '1' || this.accommodation.featured === true,  // Konverzija u boolean
        imageUrl: this.accommodation.imageUrl,
        priceListImageUrl: this.accommodation.priceListImageUrl 
      };

      this.sveMetodeService.submitAccommodation(accommodationData).subscribe({
        next: response => {
          if (response && response.id) {
            this.accommodation.accommodationId = response.id;
            this.uploadImages();
          } else {
            this.errorMessage = 'Failed to add accommodation: Unexpected response from server';
          }
        },
        error: err => {
          this.errorMessage = 'Failed to add accommodation: ' + err.message;
          console.error('Error during accommodation submission:', err);
        }
      });
    } else {
      console.error('City data is not available yet');
    }
  }

  uploadImages(): void {
    if (this.accommodation.accommodationId) {
      if (this.selectedFilesGS) {
        this.deletePhoto(this.accommodation.imageUrl);//doraditi da stavi null u accommodations
        this.uploadSingleImage(this.selectedFilesGS, 1);
      }
      if (this.selectedFilesCen) {
        this.deletePhoto(this.accommodation.priceListImageUrl);
        this.uploadSingleImage(this.selectedFilesCen, 2);
      }
      if (this.selectedFiles.length > 0) {
        this.uploadMultipleImages();
      }
    }
    this.router.navigate(['/smestaji/'], { queryParams: { id: this.accommodation.city.id } });
    
  }

  uploadSingleImage(file: File, type: number): void {
    this.sveMetodeService.uploadSingleImage(file, type, this.accommodation.accommodationId!).subscribe({
      next: response => {
        if (response && response.imageUrl) {
          this.uploadAccommodationImage(response.imageUrl, type);
        }
      },
      error: err => {
        console.error('Failed to upload image:', err);
        this.errorMessage = 'Failed to upload image: ' + err.message;
      }
    });
  }

  uploadMultipleImages(): void {
    this.sveMetodeService.uploadMultipleImages(this.selectedFiles, this.accommodation.accommodationId!).subscribe({
      next: response => {
        console.log('Multiple images uploaded successfully');
          },
      error: err => {
        console.error('Failed to upload multiple images:', err);
        this.errorMessage = 'Failed to upload multiple images: ' + err.message;
      }
    });
  }

  uploadAccommodationImage(imageUrl: string, type: number): void {
    this.sveMetodeService.uploadAccommodationImage(imageUrl, type, this.accommodation.accommodationId!).subscribe({
      next: response => {
        console.log('Accommodation image uploaded successfully:', response);
      },
      error: err => {
        console.error('Failed to upload accommodation image:', err);
        this.errorMessage = 'Failed to upload accommodation image: ' + err.message;
      }
    });
  }

  onMainImageSelected(event: any): void {
    this.selectedFilesGS = event.target.files[0];
  }

  onPriceListImageSelected(event: any): void {
    this.selectedFilesCen = event.target.files[0];
  }

  selectViseSlika(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFiles = Array.from(fileList);
    }
  }
  vratiSlike(filename: string): string {
    return this.sveMetodeService.getImage(filename);
  }
  clearImage(type: number): void {
    this.sveMetodeService.removeAccommodationImage(this.id, type).subscribe({
      next: () => {
        console.log(`Image type ${type} URL set to null in database successfully`);
        this.ngOnInit();   
      },
      error: (error) => {
        console.error('Failed to set image URL to null:', error);
        alert('Failed to set image URL to null: ' + error.message);
      }
    });
  }

  
}
