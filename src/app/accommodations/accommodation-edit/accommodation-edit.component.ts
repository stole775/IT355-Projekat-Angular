 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-accommodation-edit',
  templateUrl: './accommodation-edit.component.html',
  styleUrls: ['./accommodation-edit.component.css']
})

 
 
export class AccommodationEditComponent implements OnInit {
  accommodation: any = { photos: [] };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const accommodationId = this.route.snapshot.paramMap.get('accommodationId');
    if (accommodationId) {
      this.http.get<any>(`http://localhost:8080/api/accommodation/${accommodationId}`).subscribe(data => {
        this.accommodation = data;
      });
    }
  }

   submitUpdate(): void {
    this.http.post(`http://localhost:8080/api/accommodation/`, this.accommodation)//admin
      .subscribe({
        next: (res) => {
          console.log('Accommodation updated or added:', res);
          this.router.navigate(['/smestaji'], { queryParams: { id: this.accommodation.id } });

        },
        error: (err) => console.error('Operation failed:', err)
      });
  }
  
  
  

 
}
