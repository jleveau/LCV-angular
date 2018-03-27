import { Injectable } from '@angular/core';
import { Event } from '../../elements/event';
import { EventHttpService } from '../http/event-http.service';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {

  event: Event;
  userSelectedSubject: Subject<string>;


  constructor(private eventHttpService: EventHttpService) {
    this.eventHttpService = eventHttpService;
    this.userSelectedSubject = new Subject<string>();
  }

  getUserSelectedObservable() : Observable<string> {
    return this.userSelectedSubject.asObservable()
  }

  updateSelectedUser(user) {
    this.userSelectedSubject.next(user);
  }

  isAvailable() : Boolean {
    return this.event !== null && this.event !== undefined;
  }

  getEventNext(): Promise<Event> {
    return this.eventHttpService.getEventNext();
  }

  getEventDate(): Date {
    if (this.event) {
      return this.event.date;
    }
  }

  getEventEndAt(): Date {
    if (this.event) {
      return this.event.end_date;
    }
  }

  addParticipatinUser(name: string): void {
    if (name && this.event) {
      this.event.addUser(name);
      this.eventHttpService.updateEvent(this.event);
    }
  }

  addUnavailableUser(name: string): void {
    if (name && this.event) {
      this.event.addUnavailableUser(name);
      this.eventHttpService.updateEvent(this.event);
    }
  }

  addUncertainUser(name: string): void {
    if (name && this.event) {
      this.event.addUncertainUser(name);
      this.eventHttpService.updateEvent(this.event);
    }
  }

  getAvailableUsers(): string[] {
    if (this.event) {
      return this.event.liste_participants;
    }
  }

  getUncertainUsers(): String[] {
    if (this.event) {
      return this.event.liste_incertains;
    }
  }

  getUnavailableUsers(): String[] {
    if (this.event) {
      return this.event.liste_absents;
    }
  }

  deleteAvailableUser(name: string): void {
    if (name && this.event) {
      this.event.deleteAvailableUserByName(name);
      this.eventHttpService.updateEvent(this.event);
    }
  }

  deleteUncertainUser(name: string): void {
    if (name && this.event) {
      this.event.deleteUncertainUserByName(name);
      this.eventHttpService.updateEvent(this.event);
    }
  }

  deleteUnavailableUser(name: string): void {
    if (name && this.event) {
      this.event.deleteUnavailableUserByName(name);
      this.eventHttpService.updateEvent(this.event);
    }
  }

  setEvent(eventData: any) {
    this.event = new Event(
      eventData._id,
      eventData.not_participants,
      eventData.participants,
      eventData.uncertains,
      eventData.end_date,
      eventData.date,
      eventData.event_limit_date
    );
  }

}