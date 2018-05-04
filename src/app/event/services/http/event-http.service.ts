import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../../elements/event';
import { environment } from '../../../../environments/environment';
import { User } from '../../../user/elements/user';
import { RequestOptions } from '@angular/http';

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

  getEventById(id): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.http.get<any>(this.event_url + "/one/" + id)
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
      this.http.put<any>(this.event_url + "/", {
        event:
          {
            _id: event.id,
            description: event.description,
            place: event.place,
            date: event.date,
            end_date: event.end_date,
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
      const data = {
        title: event.title,
        author: event.author.id,
        place: event.place,
        description: event.description,
        date: event.date,
        end_date: event.end_date,
        participants: event.liste_participants.map(user => user.id),
        not_participants: event.liste_absents.map(user => user.id),
        uncertains: event.liste_incertains.map(user => user.id)
      }
      if (event.author) {
        data.author = event.author.id
      }
      this.http.post<any>(this.event_url + "/", {
        event: data
      }).subscribe((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(new Event(response.event._id,
            response.event.title,
            new User(response.event._id, response.event.username),
            response.event.place,
            response.event.not_participants,
            response.event.participants,
            response.event.uncertains,
            response.event.end_date,
            response.event.date,
            null,
            response.event.description));
        }
      }, ((error) => {
        reject(error.message);
      }));
    });
  }

  deleteEvent(event: Event): Promise<any> {
    return new Promise<Event>((resolve, reject) => {
      if (!event.id) {
        reject("Event does not have an id")
      }
      this.http.delete(this.event_url + "/" + event.id).subscribe((response) => {
        resolve();
      }, ((error) => {
        reject(error.message);
      }));
    });
  }
}

function toEvent(event: any): Event {
  const res = new Event(event._id,
    event.title,
    null,
    event.place,
    event.not_participants.map(userData => new User(userData._id, userData.username, userData.accessToken)),
    event.participants.map(userData => new User(userData._id, userData.username, userData.accessToken)),
    event.uncertains.map(userData => new User(userData._id, userData.username, userData.accessToken)),
    event.end_date,
    event.date,
    event.event_limit_date,
    event.description)
  if (event.author) {
    res.author = new User(event.author._id, event.author.username)
  }
  return res
}