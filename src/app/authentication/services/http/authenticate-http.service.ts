import { Injectable } from '@angular/core';
import { Auth } from '../../elements/auth'
import { HttpClient } from '@angular/common/http';
import { AlertsService } from '../../../tools/alerts/alerts.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthenticateHttpService {
  private event_url = environment.userUrl;

  constructor(
    private http: HttpClient,
    private alertService: AlertsService) {
      this.http = http;
      this.alertService = alertService;
    }

  loggin(auth: Auth) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.userUrl + "/next")
        .subscribe((response) => {
          if (response.error) {
            this.alertService.showErrorAlert(response.error);
            reject(response.error);
          } else {
            if (response.event) {
              return resolve(response.event);
            }
            this.alertService.showErrorAlert("Le serveur ne connait pas la prochaine réservation");
            return reject("Le serveur ne connait pas la prochaine réservation");
          }
        }, (error) => {
          this.alertService.showErrorAlert(error.message);
          reject(error);
        })
    });
  }

  register(auth: Auth) {
    return new Promise((resolve, reject) => {

    })
  }

}
