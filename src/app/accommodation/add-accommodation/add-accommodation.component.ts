import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SveMetodeService } from 'src/app/Service/sveMetode/sve-metode.service';

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
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
    featured: null as boolean | null,
  };
  errorMessage: string = '';
  accommodationId: number | null = null;
  city: any;
  selectedFiles: File[] = [];
  selectedFilesGS!: File;
  selectedFilesCen!: File;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sveMetodeService: SveMetodeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['cityId']) {
        this.getCity(+params['cityId']);
      }
    });
  }

  getCity(id: number) {
    this.sveMetodeService.getCity(id).subscribe({
      next: (data) => {
        this.city = data;
      },
      error: (error) => {
        console.error('Failed to fetch city:', error);
        this.errorMessage = 'Failed to fetch city';
      },
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
        featured: this.newAccommodation.featured,
      };

      this.sveMetodeService.submitAccommodation(accommodationData).subscribe({
        next: (response) => {
          if (response && response.id) {
            this.accommodationId = response.id;
            this.uploadImages();
          } else {
            this.errorMessage =
              'Failed to add accommodation: Unexpected response from server';
          }
        },
        error: (err) => {
          this.errorMessage = 'Failed to add accommodation: ' + err.message;
          console.error('Error during accommodation submission:', err);
        },
      });
    } else {
      console.error('City data is not available yet');
    }
  }

  uploadImages(): void {
    if (this.accommodationId) {
      if (this.selectedFilesGS) {
        this.uploadSingleImage(this.selectedFilesGS, 1);
      }
      if (this.selectedFilesCen) {
        this.uploadSingleImage(this.selectedFilesCen, 2);
      }
      if (this.selectedFiles.length > 0) {
        this.uploadMultipleImages();
      }
    }
  }

  uploadSingleImage(file: File, type: number): void {
    this.sveMetodeService
      .uploadSingleImage(file, type, this.accommodationId!)
      .subscribe({
        next: (response) => {
          if (response && response.imageUrl) {
            this.uploadAccommodationImage(response.imageUrl, type);
          }
        },
        error: (err) => {
          console.error('Failed to upload image:', err);
          this.errorMessage = 'Failed to upload image: ' + err.message;
        },
      });
  }

  uploadMultipleImages(): void {
    this.sveMetodeService
      .uploadMultipleImages(this.selectedFiles, this.accommodationId!)
      .subscribe({
        next: (response) => {
          console.log('Multiple images uploaded successfully');
          this.router.navigate(['/smestaji'], {
            queryParams: { id: this.city.id },
          });
        },
        error: (err) => {
          console.error('Failed to upload multiple images:', err);
          this.errorMessage =
            'Failed to upload multiple images: ' + err.message;
        },
      });
  }

  uploadAccommodationImage(imageUrl: string, type: number): void {
    this.sveMetodeService
      .uploadAccommodationImage(imageUrl, type, this.accommodationId!)
      .subscribe({
        next: (response) => {
          console.log('Accommodation image uploaded successfully:', response);
        },
        error: (err) => {
          console.error('Failed to upload accommodation image:', err);
          this.errorMessage =
            'Failed to upload accommodation image: ' + err.message;
        },
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
}
