import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @Input() participating_list: String[];
  @Input() not_participating_list: String[];
  @Input() maybe_list: String[];

  @Input() title: String;
  @Output() onDelete: EventEmitter<String> = new EventEmitter<String>();


  constructor(private eventService: EventService) {
    this.eventService = eventService
  }

  ngOnInit() {
  }

  getTableContent() {
    const table = [];
    let it = 0;
    while (it < this.participating_list.length ||
           it < this.not_participating_list.length ||
           it < this.maybe_list.length) {
             const line = {
               participating: null,
               not_participating: null,
               maybe: null
            }
            if (it < this.participating_list.length) {
              line.participating = this.participating_list[it]
            }
            if (it < this.not_participating_list.length) {
              line.not_participating = this.not_participating_list[it]
            }
            if (it < this.maybe_list.length) {
              line.maybe = this.maybe_list[it]
            }
            table.push(line);
            it++
           }
    return table
  }

  addUserToList(user, list) {
    list.push(user);
  }

  deleteUserFromList(name: string, list): void {
    list = list.filter((user) => user !== name);
  }

}