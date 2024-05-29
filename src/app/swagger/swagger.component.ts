import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/authServie/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit {

  constructor(  
    private router: Router,
    private auth: AuthService ) { }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

}
