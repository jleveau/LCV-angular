import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @Input() user_list: String[];
  @Input() title: String;
  @Output() onDelete: EventEmitter<String> = new EventEmitter<String>();


  constructor(private registrationService: RegistrationService) {
    this.registrationService = registrationService
  }

  ngOnInit() {
  }

  selectUser(user: String) {
    this.registrationService.updateSelectedUser(user);
  }

  delete(user: String) {
    this.onDelete.emit(user);
  }

  deleteUserFromList(name: string): void {
    this.user_list = this.user_list.filter((user) => user !== name);
  }

}