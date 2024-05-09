import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() onSearch = new EventEmitter<string>();

  search() {
    this.onSearch.emit(this.searchTerm);
  }
}
