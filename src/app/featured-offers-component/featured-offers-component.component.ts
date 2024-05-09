import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-offers-component',
  templateUrl: './featured-offers-component.component.html',
  styleUrls: ['./featured-offers-component.component.css']
})
export class FeaturedOffersComponent implements OnInit {
  featuredOffers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
 // U nekoj Angular servis ili komponenti
this.http.get<any[]>('http://localhost:8080/api/accommodation/istaknutiOglasi').subscribe(data => {
//this.http.get<any[]>('http://localhost:3000/accommodations/details').subscribe(data => {
  this.featuredOffers = data;
});

  
  }

  goToDetails(id: number) {
    this.router.navigate(['/smestaj', id]);
  }
  






}