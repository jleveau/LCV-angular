import { Injectable } from '@angular/core';
import { User } from '../../elements/user';
import { UserHttpService } from '../http/user-http.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  currentUser: User;
  
  ngOnInit() {
    this.getCurrentUser()
      .then((user) => {
      })
      .catch((error) => {

      })
  }

  constructor(private userHttpService: UserHttpService) {
    this.userHttpService = userHttpService;
  }

  isLoggedIn() {
    return this.currentUser != null;
  }

  login(username, password) : void{
    this.userHttpService.login(username, password)
      .then((user) => {
        this.currentUser = new User(
          user._id, 
          user.username,
          user.accessToken)
      })
  }

  getCurrentUser() :Promise<User> {
    return new Promise((resolve, reject) => {
      if (this.currentUser) {
        return resolve(this.currentUser);
      } 
    })
    
  }

}
