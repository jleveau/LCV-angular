import { Injectable, OnInit } from '@angular/core';
import { User } from '../../elements/user';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  userSubject$: Subject<User>;
  user: User;

  
  constructor() {
    this.userSubject$ = new Subject();
    this.userSubject$.subscribe((user) => {
      this.user = user
    });
  }

  isLoggedIn() {
    if (this.user) {
      return this.user
    }
    let data = localStorage.getItem('currentUser');
    try {
      const userJSON = JSON.parse(data) 
      this.user = new User(userJSON.id, userJSON.username, userJSON.accessToken)
      return this.user
    }
    catch {
      return false;
    }
  }

  getCurrentUser() {
    return this.user
  }

  setCurrentUser (user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject$.next(user);
  }

  disconnect() {
    localStorage.removeItem('currentUser')
    this.userSubject$.next(null)
  }

}
