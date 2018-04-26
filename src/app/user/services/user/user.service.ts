import { Injectable, OnInit } from '@angular/core';
import { User } from '../../elements/user';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  userSubject$: Subject<User>;
  user: User;

  
  constructor(private router : Router) {
    this.userSubject$ = new Subject();
    this.router = router;
    this.userSubject$.subscribe((user) => {
      this.user = user
    });
  }

  isLoggedIn() : boolean {
    if (this.user) {
      return true
    }
    let data = localStorage.getItem('currentUser');
    try {
      const userJSON = JSON.parse(data) 
      this.user = new User(userJSON.id, userJSON.username, userJSON.accessToken)
      return true
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
    this.user = null
    this.router.navigateByUrl('home')
  }

}
