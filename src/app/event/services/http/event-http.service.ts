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

  getEvents(): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.http.get<any>(this.event_url + "/all")
        .subscribe((response) => {
          if (response.error) {
            reject(response.error);
          } else {
            if (response.events) {
              const events = response.events.map(event => toEvent(event))
              return resolve(events);
            }
          }
        }, (error) => {
          reject(error.message);
        })
    });
  }


  getEventNext(): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.http.get<any>(this.event_url + "/next")
        .subscribe((response) => {
          if (response.error) {
            return reject(response.error);
          } else if (response.event) {
            return resolve(toEvent(response.event));
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
            description: event.description,
            date: event.date,
            end_date: event.date,
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

  createEvent(event: Event): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.http.post<any>(this.event_url + "/new", {
        event:
          {
            _id: event.id,
            title: event.title,
            description: event.description,
            date: event.date,
            end_date: event.date,
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

function toEvent(event: any): Event {
  return new Event(event._id,
    event.title,
    event.not_participants.map(userData => new User(userData._id, userData.username, userData.accessToken)),
    event.participants.map(userData => new User(userData._id, userData.username, userData.accessToken)),
    event.uncertains.map(userData => new User(userData._id, userData.username, userData.accessToken)),
    event.end_date,
    event.date,
    event.event_limit_date,
    event.description)
}