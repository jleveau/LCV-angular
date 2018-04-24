import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  private refreshEventTimer: number = 60000;
  isLoading: boolean
  displayedColumns = ['title', 'participants', 'start', 'end'];
  dataSource

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private eventService: EventService,
    private router: Router) {
    this.eventService = eventService
    this.router = router
  }

  ngOnInit() {
    this.isLoading = true
    this.eventService.refreshEvents().then(() => this.isLoading = false)
    this.dataSource = new MatTableDataSource(this.getEventTab());
    setInterval(() => {
      this.eventService.refreshEvents()
    }, this.refreshEventTimer)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getEventTab() {
    const events = this.eventService.getAllEvents()
    return events.map((event) => ({
      title: event.title,
      participants: event.liste_participants.length,
      date: event.date,
      end_date: event.end_date
    }))
  }

  goToEvent(event: Event) {
    this.eventService.setEvent(event)
    this.router.navigateByUrl('event')
  }

  redirectCreateEvent() {
    this.router.navigateByUrl('event/create')
  }

}
