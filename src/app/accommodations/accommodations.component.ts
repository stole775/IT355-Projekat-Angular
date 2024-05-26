import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Accommodation } from './Accommodation.model';
import { AccommodationsService } from '../Service/AccommodationsService/accommodation.service';
import { City } from './City.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../Service/authServie/auth.service';
import { SveMetodeService } from '../Service/sveMetode/sve-metode.service';

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css'],
})
export class AccommodationsComponent implements OnInit {
  accommodations: Accommodation[] = [];
  city?: City;
  isAdmin: boolean = false; // Determines if the current user is an admin

  constructor(
    private router: Router,
    private accommodationsService: AccommodationsService,
    private route: ActivatedRoute,
    private authserv: AuthService,
    private dialog: MatDialog,
    private sveMetodeService: SveMetodeService
  ) {}

  ngOnInit() {
    this.checkIfAdmin();
    this.route.queryParams.subscribe((queryParams) => {
      const cityId = queryParams['id'];
      if (cityId) {
        this.loadCityAndAccommodations(cityId);
      }
    });
  }

  checkIfAdmin() {
    // mora dok ne napravim naloge
    this.isAdmin = this.authserv.isLoggedIn();
  }

  loadCityAndAccommodations(cityId: string) {
    this.accommodationsService
      .getAccommodationsByCityId(+cityId)
      .subscribe((data) => {
        this.accommodations = data;
      });
    this.accommodationsService.getCity(+cityId).subscribe((data) => {
      this.city = data;
    });
  }

  goToDetails(accommodationId: number) {
    this.router.navigate(['/smestaj', accommodationId]);
  }

  editAccommodation(accommodationId: number) {
    // ide na edit stranu
    this.router.navigate(['/edit', { accommodationId: accommodationId }]);
  }

  deleteAccommodation(
    accommodationId: number,
    accommodationName: string
  ): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { name: accommodationName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.accommodationsService
          .deleteAccommodation(accommodationId)
          .subscribe(() => {
            this.accommodations = this.accommodations.filter(
              (acc) => acc.id !== accommodationId
            );
            // mozda neka poruka
          });
      }
    });
  }

  openImageUpload(accommodationId: number) {
    // druga stranica
    this.router.navigate(['/upload', { accommodationId: accommodationId }]);
  }
  dodajSmestaj(id: number) {
    this.router.navigate(['/dodajSmestaj', { cityId: id }]);
  }
  vratiSlike(filename: string): string {
    return this.sveMetodeService.getImage(filename);
  }
}
