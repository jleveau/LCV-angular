import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../elements/event'
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  event: Event
  submitted: boolean
  loading: boolean
  
  constructor(private eventService: EventService) {
    this.eventService = eventService
  }

  ngOnInit() {
    this.event = new Event()
  }

  onSubmit() {
    this.loading = true
    this.eventService.create(this.event)
      .then(() => this.loading = false)
  }


}
