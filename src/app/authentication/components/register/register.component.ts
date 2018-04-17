import { Component, OnInit } from '@angular/core';
import { Auth } from '../../elements/auth';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AlertsService } from '../../../tools/alerts/alerts.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentPanel = "login"
  auth:Auth =  new Auth();

  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertsService

  ) {
    this.authenticationService = authenticationService
    this.alertService = alertService

  }

  ngOnInit() {
    console.log("in")
  }

  loggin() {
   this.authenticationService.loggin(this.auth)
  }

  register() {
    let message;
    if (message = this.auth.validate()) {
      this.alertService.showErrorAlert(message)
      return
    }
    this.authenticationService.register(this.auth)
  }

}
