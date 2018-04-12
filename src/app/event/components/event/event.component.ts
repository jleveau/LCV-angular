import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event';
import { Subject }    from 'rxjs/Subject';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  title = "Badminton"
  constructor(private eventService: EventService) {
    this.eventService = eventService;
  }

  ngOnInit() {
    this.getEvent();
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

}
