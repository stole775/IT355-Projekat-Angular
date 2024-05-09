import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ImageUploadService } from '../image-upload-service.service';
import { Router } from '@angular/router';
import { environment } from 'environment/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload-component.component.html',
  styleUrls: ['./image-upload-component.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFiles: File[] = [];
  accommodationId!: number;
  errorMessage: string = '';

  constructor(
    private imageUploadService: ImageUploadService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract accommodationId from the route parameters or query parameters
    this.route.params.subscribe(params => {
      if (params['accommodationId']) {
        this.accommodationId = params['accommodationId'];
      }
    });
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFiles = Array.from(fileList);
    }
  }

  onUpload(): void {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      this.selectedFiles.forEach((file) => {
        formData.append('images', file, file.name);
      });

      // Append accommodationId to formData
      formData.append('accommodationId', this.accommodationId.toString());

    this.http.post(`${environment.apiUrl}/upload`, formData, { responseType: 'text' }).subscribe({
      next: (response) => { 
      this.router.navigate(['/smestaj', this.accommodationId]);
    },
    error: (error) => {
      console.error('Error!', error);
      this.errorMessage = 'Upload neusmesan: ' + error.message;
    }
});
    } else {
      console.error('nema odabranih fajlova');
    }
  }
}