import { Injectable } from '@angular/core';
import { Auth } from '../../elements/auth'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthenticateHttpService {
  private event_url = environment.userUrl;

  constructor(
    private http: HttpClient) {
      this.http = http;
    }

  loggin(auth: Auth) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.userUrl + "/login",  {
        auth: {
          username: auth.username,
          password: auth.password
      }})
        .subscribe((response) => {
          if (response.user) {
            return resolve({
              user: response.user,
              accessToken: response.accessToken
            });
          }
        }, (response) => {
          reject(response.error.message);
        })
    });
  }

  register(auth: Auth) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(environment.userUrl + "/register", {
        user: {
          username: auth.username,
          password: auth.password
        }})
        .subscribe((response) => {
            if (response.message) {
              return resolve(response.message);
          }
        }, (response) => {
          reject(response.error.message);
        })
    });
  }

}
