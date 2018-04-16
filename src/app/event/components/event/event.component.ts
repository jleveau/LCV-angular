import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event';
import { Subject }    from 'rxjs/Subject';
import { User } from '../../../user/elements/user';

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
      .catch(() => {
        setTimeout(() => {
          this.getEvent();
        }, 2000)
    })
  }

  serviceAvailable(): Boolean {
    return this.eventService.isAvailable();
  }

  getEventTitle(): String {
    return this.eventService.getEvent().title;
  }

  getEventDate(): Date {
    return this.eventService.getEvent().date;
  }

  getEventEndDate(): Date {
    return this.eventService.getEvent().end_date;
  }

  getParticipants(): User[] {
    return this.eventService.getEvent().liste_participants;
  }

  getAbsents(): User[] {
    return this.eventService.getEvent().liste_absents;
  }

  getIncertains(): User[] {
    return this.eventService.getEvent().liste_incertains;
  }

}
