import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event'
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user/services/user/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  event: Event
  submitted: boolean
  isLoading: boolean

  constructor(private eventService: EventService,
    private userService: UserService,
    private router: Router) {
      this.userService = userService
      this.eventService = eventService
      this.router = router
  }

  ngOnInit() {
    this.event = new Event()
  }

  onSubmit() {
    this.isLoading = true
    this.event.author = this.userService.getCurrentUser()
    this.eventService.create(this.event)
      .then((event) => {
        this.isLoading = false
        this.router.navigate(['event', event.id])
      })
  }

}
