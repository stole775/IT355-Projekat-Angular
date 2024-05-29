import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarHomeComponent } from './navbar/navbar-home/navbar-home.component';
import { HomeGalleryComponent } from './home/home-gallery/home-gallery.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { FeaturedOffersComponent  } from './featured-offers-component/featured-offers-component.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultsComponent } from './results/results.component';
import { ImageUploadComponent } from './Service/ImageUploadService/image-upload-component/image-upload-component.component';
import { ConfirmationDialogComponent } from './accommodations/confirmation-dialog/confirmation-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MatDialogModule } from '@angular/material/dialog';
import { AccommodationEditComponent } from './accommodations/accommodation-edit/accommodation-edit.component';
import { DodajGradComponent } from './cities/dodaj-grad/dodaj-grad.component';
import { ConfirmationDialogCityComponent } from './cities/confirmation-dialog-city/confirmation-dialog-city.component';
import { AddAccommodationComponent } from './accommodation/add-accommodation/add-accommodation.component';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';  
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Service/authServie/AuthInterceptor';
import { SwaggerComponent } from './swagger/swagger.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarHomeComponent,
    HomeGalleryComponent,
    CountriesComponent,
    CitiesComponent,
    AccommodationsComponent,
    FeaturedOffersComponent,
    AccommodationComponent,
    FooterComponent,
    SearchBarComponent,
    ResultsComponent,
    ImageUploadComponent,
    ConfirmationDialogComponent,
    AccommodationEditComponent,
    DodajGradComponent,
    ConfirmationDialogCityComponent,
    AddAccommodationComponent,
    LoginComponent,
    AdminPanelComponent,
    SwaggerComponent 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    BrowserAnimationsModule,  
    MatDialogModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
