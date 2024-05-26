import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../Service/authServie/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  featuredOffers: any[] = [];
  statistics: any[] = [];
  actuatorHealth: any = {};
  actuatorInfo: any = {};
  actuatorBeans: any = {};

  constructor(
    private http: HttpClient, 
    private router: Router,
    private auth: AuthService 
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }

    this.loadFeaturedOffers();
    this.loadStatistics();
    this.loadActuatorData();
  }

  loadFeaturedOffers() {
    this.http.get<any[]>('http://localhost:8080/api/accommodation/istaknutiOglasi')
      .subscribe(data => { 
        this.featuredOffers = data;
      });
  }

  loadStatistics() {
    // Simulacija statističkih podataka
    this.statistics = [
      { title: 'Ukupan broj smestaja', value: '320' },
      { title: 'Aktivni korisnici', value: '85' },
      { title: 'Dnevne rezervacije', value: '15' }
    ];
  }

  loadActuatorData() {
    this.http.get('http://localhost:8080/actuator/health').subscribe(data => {
      this.actuatorHealth = data;
    });

    this.http.get('http://localhost:8080/actuator/info').subscribe(data => {
      this.actuatorInfo = data;
    });

    this.http.get('http://localhost:8080/actuator/beans').subscribe(data => {
      this.actuatorBeans = data;
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/smestaj', id]);
  }
  user: any = {};
  confirmPassword!: string;
  updateUserInfo() {
    if (this.user.password === this.confirmPassword) {
      this.http.put('http://localhost:8080/api/admin/update', this.user)
        .subscribe({
          next: (response) => console.log('User updated successfully', response),
          error: (error) => console.error('Error updating user', error)
        });
    } else {
      console.error('Passwords do not match');
    }
  }
}
