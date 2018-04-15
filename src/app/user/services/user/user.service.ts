import { Injectable } from '@angular/core';
import { User } from '../../elements/user';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  currentUser: User;
  
  ngOnInit() {

  }

  constructor() {
  }

  isLoggedIn() {
    return this.currentUser
  }

  setCurrentUser (user: User) {
    this.currentUser = user;
  }

}
