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
  activeSection: string = 'password-change'; // Default section
  featuredOffers: any[] = [];
  statistics: any[] = [];
  actuatorHealth: any = {};
  actuatorInfo: any = {};
  actuatorBeans: any = {};
  message: string = '';
  success: boolean = false;

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

  setActiveSection(section: string) {
    this.activeSection = section;
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
  
  goToSwagger() {
    window.open('http://localhost:8080/swagger-ui/index.html', '_blank');
  }

  user: any = {};
  confirmPassword!: string;
  updateUserInfo() {
    if (this.user.password === this.confirmPassword) {
      this.http.put('http://localhost:8080/api/admin/update', this.user)
        .subscribe({
          next: (response) => {
            this.message = 'Lozinka promenjena';
            this.success = true;
          },
          error: (error) => {
            this.message = 'Došlo je do greške prilikom promene lozinke.';
            this.success = false;
            console.error('Error updating user', error);
          }
        });
    } else {
      this.message = 'Lozinke se ne podudaraju.';
      this.success = false;
    }
  }

}
