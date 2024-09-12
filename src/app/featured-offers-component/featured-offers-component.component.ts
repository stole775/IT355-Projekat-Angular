import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SveMetodeService } from '../Service/sveMetode/sve-metode.service';
import { AuthService } from '../Service/authServie/auth.service';

@Component({
  selector: 'app-featured-offers-component',
  templateUrl: './featured-offers-component.component.html',
  styleUrls: ['./featured-offers-component.component.css'],
})
export class FeaturedOffersComponent implements OnInit {
  featuredOffers: any[] = [];

  constructor(
    private accommodationService: SveMetodeService,
    private router: Router,
    private authservice: AuthService
  ) {}
   
  ngOnInit() {
    const token = this.authservice.getToken();
    if(token){
    this.authservice.isTokenExpired(token);}

    this.accommodationService.getFeaturedOffers().subscribe({
      next: (data) => {
        this.featuredOffers = data;
      },
      error: (error) => {
        console.error('Error fetching featured offers:', error);
      },
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/smestaj', id]);
  }
  vratiSlike(filename: string): string {
    return this.accommodationService.getImage(filename);
  }
}
