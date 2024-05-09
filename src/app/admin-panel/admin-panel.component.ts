import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
    items: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        
    }

    editItem(item: any): void {
        // Logic to edit an item
        console.log('Editing item:', item);
    }
}
