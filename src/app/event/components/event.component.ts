import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event/event.service';
import { Event } from '../elements/event';
import { Subject }    from 'rxjs/Subject';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private eventService: EventService) {
    this.eventService = eventService;
  }

  ngOnInit() {
    this.getEvent();
  }

  userSelectedSubject:Subject<any> = new Subject();

  selectUser(user: String) {
    this.userSelectedSubject.next(user);
  }

  getEvent() {
    this.eventService.getEventNext()
    .then((event) => {
      this.eventService.setEvent(event);
    })
    .catch(() => {
      setTimeout(() => {
        this.getEvent();
      }, 2000)
    })
  }

  isTimedLimited(): Boolean {
    const date = this.eventService.getEventDate();
    const end_date = this.eventService.getEventEndAt();
    if (!end_date) {
      return false;
    }
    return date.getTime() !== end_date.getTime();
  }

  serviceAvailable(): Boolean {
    return this.eventService.isAvailable();
  }

  getEventDate(): Date {
    return this.eventService.getEventDate();
  }

  getEventEndDate(): Date {
    return this.eventService.getEventEndAt();
  }

  getAvailableUsers(): String[] {
    return this.eventService.getAvailableUsers();
  }

  getUncertainUsers(): String[] {
    return this.eventService.getUncertainUsers();
  }

  getUnavailableUsers(): String[] {
    return this.eventService.getUnavailableUsers();
  }

  deleteAvailableUser(name: string) {
    this.eventService.deleteAvailableUser(name);
  }

  deleteUncertainUser(name: string) {
    this.eventService.deleteUncertainUser(name);
  }

  deleteUnavailableUser(name: string) {
    this.eventService.deleteUnavailableUser(name);
  }

}
