import { Injectable } from '@angular/core';
import { Event } from '../../elements/event';
import { EventHttpService } from '../http/event-http.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../user/elements/user';
import { AlertsService } from '../../../tools/alerts/alerts.service';

@Injectable()
export class EventService {

  currentEvent: Event;
  event_list: Event[] = [];


  constructor(private eventHttpService: EventHttpService,
    private alertService: AlertsService) {
    this.eventHttpService = eventHttpService
    this.alertService = alertService
  }

  isAvailable(): Boolean {
    return this.currentEvent !== null && this.currentEvent !== undefined;
  }

  isFinished(event) {
    return Date.now() > event.date.getTime()
  }

  refreshEvents():Promise<any> {
    return this.eventHttpService.getEvents()
      .then((events) => {
        this.event_list = events
      })
      .catch((error) => {
        this.alertService.showErrorAlert(error);
      })
  }

  create(event: Event): Promise<Event> {
    return new Promise((resolve, reject) => {
      this.eventHttpService.createEvent(event)
        .then((event) => {
          return resolve(event)
        })
        .catch((error) => {
          this.alertService.showErrorAlert(error);
          reject(error)
        })
    })
  }

  getEventNext(): Promise<Event> {
    return new Promise((resolve, reject) => {
      this.eventHttpService.getEventNext()
        .then(event => {
          this.currentEvent = event
          return resolve(event)
        })
        .catch((error) => {
          this.alertService.showErrorAlert(error);
          reject(error)
        })
    })
  }

  getAllEvents(): Event[] {
    return this.event_list;
  }

  getEvent(id): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      this.eventHttpService.getEventById(id)
        .then((event) => {
          this.currentEvent = event
          return resolve (event);
        })
        .catch((error) => {
          this.alertService.showErrorAlert(error.message);
        })
      })
    }
  
  deleteEvent(event) {
    return new Promise<void>((resolve, reject) => 
    this.eventHttpService.deleteEvent(event)
      .then(() => {
        this.alertService.showSuccessAlert("L'évenement " + event.title + " a bien été supprimé")
        resolve()
      })
      .catch((error) => {
        this.alertService.showErrorAlert(error)
        reject(error)
      }))
  }

  update() {
    return this.eventHttpService.updateEvent(this.currentEvent)
      .catch((error) => {
        this.alertService.showErrorAlert(error.message);
      })
  }

}