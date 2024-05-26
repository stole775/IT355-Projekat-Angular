import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountriesComponent } from './countries/countries.component';
import { CitiesComponent } from './cities/cities.component';
import { AccommodationsComponent } from './accommodations/accommodations.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { ImageUploadComponent } from './Service/ImageUploadService/image-upload-component/image-upload-component.component';
import { AccommodationEditComponent } from './accommodations/accommodation-edit/accommodation-edit.component';
import { DodajGradComponent } from './cities/dodaj-grad/dodaj-grad.component';
import { AddAccommodationComponent } from './accommodation/add-accommodation/add-accommodation.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' } , 
  { path: 'drzava', component: CitiesComponent },
  { path: 'svedrzave', component: CountriesComponent },
  { path: 'cities/:countryId', component: CitiesComponent },
  { path: 'smestaji', component: AccommodationsComponent }, 
  { path: 'smestaj/:id', component: AccommodationComponent },
  { path: 'upload', component:ImageUploadComponent  },//admin
  { path: 'edit', component:AccommodationEditComponent  },//admin
  { path: 'dodaj-grad', component:DodajGradComponent  },//admin
  { path: 'dodaj-grad/:id', component:DodajGradComponent  },//admin
  { path: 'dodajSmestaj', component:AddAccommodationComponent  },//admin
  { path: 'admin', component:AdminPanelComponent  },//admin
  { path: 'login', component:LoginComponent  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
