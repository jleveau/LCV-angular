import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Reservation } from '../../elements/reservation';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertsService } from '../../../alerts/alerts.service';
import { environment } from '../../../../environments/environment';
import { Headers } from '@angular/http'

@Injectable()
export class ReservationHttpService {



  private reservation_url = environment.reservationUrl;


  constructor(
    private http: HttpClient,
    private alertService: AlertsService) {
    this.http = http;
    this.alertService = alertService;
  }

  getReservationNext(): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      this.http.get<any>(this.reservation_url + "/next")
        .subscribe((response) => {
          if (response.error) {
            this.alertService.showErrorAlert(response.error);
            reject(response.error);
          } else {
            if (response.reservation) {
              return resolve(response.reservation);
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

  updateReservation(reservation: Reservation): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      this.http.put<any>(this.reservation_url + "/update", {
        reservation:
          {
            _id: reservation.id,
            participants: reservation.liste_participants,
            not_participants: reservation.liste_absents,
            uncertains: reservation.liste_incertains
          }
      }).subscribe((response) => {
        if (response.error) {
          this.alertService.showErrorAlert(response.error);
          reject(response.error);
        } else {
          this.alertService.showSuccessAlert("Mise à jour réussie");
          resolve(response.reservation);
        }
      }, ((error) => {
        this.alertService.showErrorAlert(error.message);
        reject(error);
      }));
    });
  }

}

