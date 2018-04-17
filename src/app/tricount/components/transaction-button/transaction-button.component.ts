import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-transaction-button',
  templateUrl: './transaction-button.component.html',
  styleUrls: ['./transaction-button.component.css']
})
export class TransactionButtonComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionButtonComponent>) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
