 
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { Component, Inject } from '@angular/core';
 
  @Component({
    selector: 'app-confirmation-dialog-city',
    template: `
      <h1 mat-dialog-title>Potvrdite akciju</h1>
      <div mat-dialog-content>Da li zaista želite da obrišete: {{ data.name }}?</div>
      <div mat-dialog-actions>
        <button mat-button (click)="onDismiss()">Ne</button>
        <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Da</button>
      </div>
    `,
    styles: [
      `:host { display: block; }`,
      `mat-dialog-actions { justify-content: space-between; }`
    ],
    templateUrl: './confirmation-dialog-city.component.html',
    styleUrls: ['./confirmation-dialog-city.component.css']
  })
  export class ConfirmationDialogCityComponent {
    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialogCityComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { name: string }
    ) { }
  
    onDismiss(): void {
      this.dialogRef.close(false);
    }
    onConfirm(): void {
      // Close the dialog and return true to signal that the user has confirmed the action
      this.dialogRef.close(true);
    }
  }
  