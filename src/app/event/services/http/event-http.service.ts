import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../elements/event';
import { environment } from '../../../../environments/environment';
import { User } from '../../../user/elements/user';

@Injectable()
export class EventHttpService {

  private event_url = environment.eventUrl;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getEventNext(): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.http.get<any>(this.event_url + "/next")
        .subscribe((response) => {
          if (response.error) {
            reject(response.error);
          } else {
            if (response.event) {
              const event = new Event(
                response.event._id,
                response.event.title,
                response.event.not_participants.map(userData => new User(userData._id, userData.username, userData.accessToken)),
                response.event.participants.map(userData => new User(userData._id, userData.username, userData.accessToken)),
                response.event.uncertains.map(userData => new User(userData._id, userData.username, userData.accessToken)),
                response.event.end_date,
                response.event.date,
                response.event.event_limit_date)
              return resolve(event);
            }
          }
        }, (error) => {
          reject(error.message);
        })
    });
  }

  updateEvent(event: Event): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.http.put<any>(this.event_url + "/update", {
        event:
          {
            _id: event.id,
            participants: event.liste_participants.map(user => user.id),
            not_participants: event.liste_absents.map(user => user.id),
            uncertains: event.liste_incertains.map(user => user.id)
          }
      }).subscribe((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.event);
        }
      }, ((error) => {
        reject(error.message);
      }));
    });
  }

}

