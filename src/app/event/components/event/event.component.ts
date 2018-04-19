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
    this.isLoading = true
    this.getEvent().then((event) => {
      this.event = event
      this.isLoading = false
    })
  }

  getEvent(): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      const event = this.eventService.getEvent()
      if (event) {
        return resolve(event)
      } else {
        return this.eventService.getEventNext()
          .then((event) => {
            return resolve(event)
          })
      }
    })
  }

}
