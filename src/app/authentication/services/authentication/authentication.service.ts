import { Injectable } from '@angular/core';
import { Auth } from '../../elements/auth';
import { AuthenticateHttpService } from '../http/authenticate-http.service';
import { AlertsService } from '../../../tools/alerts/alerts.service';
import { User } from '../../../user/elements/user';
import { UserService } from '../../../user/services/user/user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthenticationService  implements CanActivate {

  redirectUrl: string

  constructor(private httpService: AuthenticateHttpService, 
    private alertService: AlertsService,
    private userService: UserService,
    private router: Router) {
    this.httpService = httpService
    this.alertService = alertService
    this.userService = userService
    this.router = router
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    if (this.userService.isLoggedIn()) {
      return true
    }
    this.redirectUrl = url
    this.router.navigateByUrl('login');
  }

  loggin(auth: Auth) {
    this.httpService.loggin(auth)
      .then((data: any) => {
        const loggedUser = new User(data.user._id, data.user.username, data.accessToken)
        this.userService.setCurrentUser(loggedUser);
        this.router.navigateByUrl('')
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
