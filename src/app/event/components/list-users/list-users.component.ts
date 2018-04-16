import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { UserService } from '../../../user/services/user/user.service';
import { User } from '../../../user/elements/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @Input() participating_list: User[];
  @Input() not_participating_list: User[];
  @Input() maybe_list: User[];

  @Input() title: String;
  @Output() onDelete: EventEmitter<String> = new EventEmitter<String>();


  constructor(private eventService: EventService,
              private userService: UserService) {
      this.eventService = eventService
      this.userService = userService
  }

  ngOnInit() {
  }

  canSelect() {
    const user:User = this.userService.getCurrentUser()

    return !(this.participating_list.some(elem => elem.id === user.id) ||
        this.not_participating_list.some(elem => elem.id === user.id) ||
        this.maybe_list.some(elem => elem.id === user.id))
  }

  columnAction(list) {
    console.log(list)
    if (this.canSelect()) {
      this.addUserToList(list)
    } else if (this.canChange(list)) {
      this.changeUserTo(list)
    }
  }

  canChange(list) {
    const user:User = this.userService.getCurrentUser()
    return (!this.canSelect() && !list.some(elem => elem.id === user.id))
  }

  changeUserTo(list) {
    const user:User = this.userService.getCurrentUser()

    if (list !== this.participating_list) 
      this.participating_list = this.participating_list.filter(elem => elem.id !== user.id)
    if (list !== this.maybe_list)
      this.maybe_list = this.maybe_list.filter(elem => elem.id !== user.id)
    if (list !== this.not_participating_list)
      this.not_participating_list = this.not_participating_list.filter(elem => elem.id !== user.id)
    
    this.addUserToList(list)
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

  addUserToList(list) {
    list.push(this.userService.getCurrentUser());
    const event = this.eventService.getEvent()
    event.liste_participants = this.participating_list
    event.liste_absents = this.not_participating_list
    event.liste_incertains = this.maybe_list
    this.eventService.update()
  }

  deleteUserFromList(name: string, list): void {
    list = list.filter((user) => user.username !== name);
  }

  displayUserInfo(user: User) {
    if (user) {
      return user.username
    }
  }

}