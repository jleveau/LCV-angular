import { Injectable } from '@angular/core';
import { User } from '../../elements/user';

@Injectable()
export class UserHttpService {

  constructor() { }

  login(username, password): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const user = {
        username: "toto"
      }
      return resolve(user)
    })
  }

  register(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
    
      return resolve(user)
    })
  }

}
