import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../elements/user';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  user: User

  constructor(private userService: UserService) {
    this.userService = userService
    
  }

  ngOnInit() {
   this.user = this.userService.getCurrentUser()
  }

  disconnect() {
    this.userService.disconnect()
  }
  

}
