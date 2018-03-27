import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../../elements/event';
import { catchError, map, tap } from 'rxjs/operators';
import { AlertsService } from '../../../alerts/alerts.service';
import { environment } from '../../../../environments/environment';
import { Headers } from '@angular/http'

@Injectable()
export class EventHttpService {



  private event_url = environment.eventUrl;


  constructor(
    private http: HttpClient,
    private alertService: AlertsService) {
    this.http = http;
    this.alertService = alertService;
  }

  getEventNext(): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.http.get<any>(this.event_url + "/next")
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

  updateEvent(event: Event): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.http.put<any>(this.event_url + "/update", {
        event:
          {
            _id: event.id,
            participants: event.liste_participants,
            not_participants: event.liste_absents,
            uncertains: event.liste_incertains
          }
      }).subscribe((response) => {
        if (response.error) {
          this.alertService.showErrorAlert(response.error);
          reject(response.error);
        } else {
          this.alertService.showSuccessAlert("Mise à jour réussie");
          resolve(response.event);
        }
      }, ((error) => {
        this.alertService.showErrorAlert(error.message);
        reject(error);
      }));
    });
  }

}

