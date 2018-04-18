import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  private refreshEventTimer: number = 60000;
  isLoading: boolean

  constructor(private eventService: EventService,
    private router: Router) {
    this.eventService = eventService
    this.router = router
  }

  ngOnInit() {
    this.isLoading = true
    this.eventService.refreshEvents().then(() => this.isLoading = false)
    setInterval(() => {
      this.eventService.refreshEvents()
    }, this.refreshEventTimer)
  }

  getEvents(): Event[] {
    return this.eventService.getAllEvents()
  }

  goToEvent(event: Event) {
    this.eventService.setEvent(event)
    this.router.navigateByUrl('event')
  }

  redirectCreateEvent() {
    this.router.navigateByUrl('event/create')
  }

}
