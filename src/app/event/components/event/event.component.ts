import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event';
import { Subject } from 'rxjs/Subject';
import { User } from '../../../user/elements/user';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  isLoading: boolean
  event: Event
  constructor(private eventService: EventService) {
    this.eventService = eventService;
  }

  ngOnInit() {
    this.getEvent()
  }

  getEvent() {
    this.event = this.eventService.getEvent()
    if (this.event)
      return this.event
    else {
      this.isLoading = true

      if (!this.event)
        return this.eventService.getEventNext()
          .then(() => {
            this.isLoading = false
          })
          .catch(() => {
            setTimeout(() => {
              this.getEvent();
            }, 2000)
          })
    }
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
