import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  @Input() user_list: String[];

  constructor(private eventService: EventService) {
    this.eventService = eventService
   }

  ngOnInit() {
  }

  addUser(name: String): void {
    this.user_list.push(name)
  }

}
