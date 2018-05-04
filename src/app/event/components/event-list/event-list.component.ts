import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { UserService } from '../../../user/services/user/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  private refreshEventTimer: number = 60000;
  isLoading: boolean
  displayedColumns = ['title', 'participants', 'author', 'start', 'end'];
  events
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private eventService: EventService,
    private userService: UserService,
    private router: Router) {
    this.eventService = eventService
    this.router = router
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.refreshEventTab().then((eventsTab) => {
      this.dataSource = new MatTableDataSource(eventsTab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  refreshEventTab() {
    return new Promise<{}[]>((resolve, reject) => {
      this.eventService.refreshEvents().then(() => {
        resolve(this.eventService.getAllEvents().sort((a, b) => -(a.date.getTime() - b.date.getTime())).map((event) => ({
          id: event.id,
          title: event.title,
          liste_participants: event.liste_participants,
          liste_incertains: event.liste_incertains,
          liste_absents: event.liste_absents,
          author: event.author ? event.author.username : null,
          date: event.date,
          end_date: event.end_date
        })))
      })
    })
  }

  participating(event) {
    return event.liste_participants.some((participant) => {
      return participant.id == this.userService.getCurrentUser().id
    })
  }

  maybe(event: Event) {
    return event.liste_incertains.some((participant) => {
      return participant.id == this.userService.getCurrentUser().id
    })
  }

  notParticipating(event: Event) {
    return event.liste_absents.some((participant) => {
      return participant.id == this.userService.getCurrentUser().id
    })
  }

  goToEvent(eventSelected) {
    this.router.navigate(['event', eventSelected.id])
  }

  redirectCreateEvent() {
    this.router.navigateByUrl('event-create')
  }

  eventFinished(event) {
    return this.eventService.isFinished(event)
  }

  endSameDay(event) {
    return event.date.getDay() === event.end_date.getDay() &&
      event.date.getMonth() === event.end_date.getMonth() &&
      event.date.getFullYear() === event.end_date.getFullYear()
  }

}
