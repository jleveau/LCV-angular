import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Registration } from './element/registration';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertsService } from '../alerts/alerts.service';
import { environment } from '../../environments/environment';
@Injectable()
export class RegistrationHttpService {

  private registration_url = environment.apiUrl + "registration";

  constructor(
    private http: HttpClient,
    private alertService: AlertsService) {
    this.http = http;
    this.alertService = alertService;
  }

  getRegistrationNext(): Promise<Registration> {
    return new Promise<Registration>((resolve, reject) => {
      this.http.get<any>(this.registration_url + "/next")
        .subscribe((response) => {
          if (response.error) {
            this.alertService.showErrorAlert(response.error);
            reject(response.error);
          } else {
            if (response.registration) {
              return resolve(response.registration);
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

  updateRegistration(registration: Registration): Promise<Registration> {
    return new Promise<Registration>((resolve, reject) => {
      this.http.put<any>(this.registration_url + "/update", {
        registration:
          {
            _id: registration.id,
            participants: registration.liste_participants,
            not_participants: registration.liste_absents,
            uncertains: registration.liste_incertains
          }
      }).subscribe((response) => {
        if (response.error) {
          this.alertService.showErrorAlert(response.error);
          reject(response.error);
        } else {
          this.alertService.showSuccessAlert("Mise à jour réussie");
          resolve(response.registration);
        }
      }, ((error) => {
        this.alertService.showErrorAlert(error.message);
        reject(error);
      }));
    });
  }

}

