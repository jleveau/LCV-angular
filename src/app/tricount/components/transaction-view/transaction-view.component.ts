import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TransactionButtonComponent } from '../transaction-button/transaction-button.component';
@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openTransactionModal() {
    let dialogRef = this.dialog.open(TransactionButtonComponent, {
      width: '250px',
    });
  }

}

