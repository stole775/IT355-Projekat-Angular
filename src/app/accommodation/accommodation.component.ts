import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SveMetodeService } from 'src/app/Service/sveMetode/sve-metode.service';
import { AuthService } from '../Service/authServie/auth.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
})
export class AccommodationComponent implements OnInit {
  accommodation: any;
  photos: string[] = [];
  showModal = false;
  selectedImageUrl?: string;
  selectedImageCaption = 'Klikni sa strane za izlaz';
  selectedImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private sveMetodeService: SveMetodeService,
    private router: Router, 
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.checkIfAdmin();
    const accommodationId = this.route.snapshot.paramMap.get('id');
    if (accommodationId) {
      this.sveMetodeService
        .getAccommodation(+accommodationId)
        .subscribe((data) => {
          this.accommodation = data;
          console.log(data);
        });

      this.sveMetodeService.getAccommodationPhotos(+accommodationId).subscribe(
        (data) => {
          this.photos = data;
          if (this.accommodation) {
            this.accommodation.photos = this.photos;
          } else {
            console.error('Smestaj nije pronadjen');
          }
        },
        (error) => {
          console.log('Nema slika:', error);
        }
      );
    }
  }

  checkIfAdmin() { 
    return this.auth.isLoggedIn();
  }
  vratiSlike(filename: string): string {
    return this.sveMetodeService.getImage(filename);
  }
  reserveAccommodation(id: number) {
    console.log('Rezervacija accommodation sa ID:', id); 
  }

  openModal(imageUrl: string) {
    this.showModal = true;
    this.selectedImageUrl = imageUrl;
    this.selectedImageIndex = this.photos.findIndex((url) => url === imageUrl);
  }

  closeModal() {
    this.showModal = false;
  }

  changeImage(direction: number, event: MouseEvent) {
    event.stopPropagation();
    this.selectedImageIndex += direction;
    if (this.selectedImageIndex >= this.photos.length) {
      this.selectedImageIndex = 0;
    } else if (this.selectedImageIndex < 0) {
      this.selectedImageIndex = this.photos.length - 1;
    }
    this.selectedImageUrl = this.photos[this.selectedImageIndex];
  }
  editAccommodation(accommodationId: number) {
    // ide na edit stranu
    this.router.navigate(['/edit', { accommodationId: accommodationId }]);
  }
}
