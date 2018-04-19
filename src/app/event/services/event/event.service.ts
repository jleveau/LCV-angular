import { Injectable } from '@angular/core';
import { Event } from '../../elements/event';
import { EventHttpService } from '../http/event-http.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../user/elements/user';
import { AlertsService } from '../../../tools/alerts/alerts.service';

@Injectable()
export class EventService {

  event: Event;
  event_list: Event[] = [];


  constructor(private eventHttpService: EventHttpService,
    private alertService: AlertsService) {
    this.eventHttpService = eventHttpService
    this.alertService = alertService
  }

  isAvailable(): Boolean {
    return this.event !== null && this.event !== undefined;
  }

  refreshEvents() {
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
          this.setEvent(event)
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

  getEvent(): Event {
    return this.event
  }

  update() {
    return this.eventHttpService.updateEvent(this.event)
      .catch((error) => {
        this.alertService.showErrorAlert(error.message);
      })
  }

  setEvent(event: Event) {
    this.event = event
  }

}