import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  selectedUserName: string;

  constructor(private eventService: EventService) {
    this.eventService = eventService
    this.eventService.getUserSelectedObservable().subscribe((user) => {
      this.selectedUserName = user;
    })
   }

  ngOnInit() {
  }

  addParticipatingUser(name: String): void {
    if (name) {
      this.eventService.addParticipatinUser(String(name));
    }
  }

  addUncertainUser(name: String): void {
    if (name) {
      this.eventService.addUncertainUser(String(name));
    }
  }

  addUnavailableUser(name: String): void {
    if (name) {
      this.eventService.addUnavailableUser(String(name));
    }
  }

}
