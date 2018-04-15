import { Injectable } from '@angular/core';
import { Auth } from '../../elements/auth';
import { AuthenticateHttpService } from '../http/authenticate-http.service';
import { AlertsService } from '../../../tools/alerts/alerts.service';
import { User } from '../../../user/elements/user';
import { UserService } from '../../../user/services/user/user.service';

@Injectable()
export class AuthenticationService {

  constructor(private httpService: AuthenticateHttpService, 
    private alertService: AlertsService,
    private userService: UserService) {
    this.httpService = httpService
    this.alertService = alertService
    this.userService = userService
  }

  loggin(auth: Auth) {
    this.httpService.loggin(auth)
      .then((data: any) => {
        const loggedUser = new User(data.user._id, data.user.username, data.accessToken)
        this.userService.setCurrentUser(loggedUser);
      }).catch((error) => {
        this.alertService.showErrorAlert(error)
      })
  }

  register(auth: Auth) {
    this.httpService.register(auth)
      .then((message: any) => {
        this.alertService.showSuccessAlert(message)
        const login_auth:Auth = new Auth()
        this.loggin(auth)
      }).catch((error) => {
        this.alertService.showErrorAlert(error)
      })
  }

}
