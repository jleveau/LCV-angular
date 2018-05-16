import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event'
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user/services/user/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  sub: any
  submitted: boolean
  isLoading: boolean
  isEdit: boolean
  @Input() event: Event;

  constructor(private eventService: EventService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    this.userService = userService
    this.eventService = eventService
    this.router = router
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.isLoading = true
      if (!params['id']) {
        this.event = new Event()
        this.isLoading = false
        this.isEdit = false
      }
      else {
        this.eventService.getEvent(params['id'])
          .then((event) => {
            this.event = event
            this.isLoading = false
            this.isEdit = true
          })
      }
    });
  }

  onSubmit() {
    if (this.isEdit) {
      return this.onSubmitEdit()
    }
    return this.onSubmitCreate()
  }

  onSubmitCreate() {
    this.isLoading = true
    this.event.author = this.userService.getCurrentUser()
    this.eventService.create(this.event, true)
      .then((event) => {
        this.isLoading = false
        this.router.navigate(['event', event.id])
      })
  }

  onSubmitEdit() {
    this.isLoading = true
    this.eventService.update(this.event, true)
      .then((event) => {
        this.isLoading = false
        this.router.navigate(['event', this.event.id])
      })
  }

}
