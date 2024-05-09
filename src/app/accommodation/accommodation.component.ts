import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  accommodation: any;
  photos: string[] = [];

 
  showModal = false;
  selectedImageUrl?: string;
  selectedImageCaption = 'Klikni sa strane za izlaz';
  selectedImageIndex: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const accommodationId = this.route.snapshot.paramMap.get('id');
    if (accommodationId) {
      this.http.get<any>(`http://localhost:8080/api/accommodation/${accommodationId}`).subscribe(data => {
        this.accommodation = data;
        console.log(data);
        
      });
      
      // Ispravka: direktno pozivanje metode getAccommodationPhotos sa konvertovanim ID-em u broj
      this.getAccommodationPhotos(+accommodationId).subscribe(data => {
        this.photos = data;
        this.accommodation.photos = this.photos; // Dodajte slike u objekat smeštaja
      });
    }
  }

  getAccommodationPhotos(id: number): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:8080/api/accomodationphoto/images/${id}`);
  }

  reserveAccommodation(id: number) {
    console.log('Rezerviši smeštaj sa ID:', id);
    // Ovde dodajte logiku za rezervaciju
  }
  openModal(imageUrl: string) {
    this.showModal = true;
    this.selectedImageUrl = imageUrl;
    this.selectedImageIndex = this.photos.findIndex(url => url === imageUrl);


  }

  closeModal() {
    this.showModal = false;
  }

  changeImage(direction: number, event: MouseEvent) {
     event.stopPropagation(); // Sprečava propagaciju događaja do roditeljskog elementa
  
  this.selectedImageIndex += direction;
  if (this.selectedImageIndex >= this.photos.length) {
    this.selectedImageIndex = 0;
  } else if (this.selectedImageIndex < 0) {
    this.selectedImageIndex = this.photos.length - 1;
  }
  this.selectedImageUrl = this.photos[this.selectedImageIndex];
}
}
