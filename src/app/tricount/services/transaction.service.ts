import { Injectable } from '@angular/core';
import { Transaction } from '../elements/transaction';
import { User } from '../../user/elements/user';

@Injectable()
export class TransactionService {

  transaction_list: Transaction[]
  
  constructor() { 
    this.transaction_list = []
  }

  createTransaction(from: User, to: any, val: number) {
    const transaction = new Transaction(null, from, to, val)
    this.transaction_list.push(transaction)
  }

  

}
