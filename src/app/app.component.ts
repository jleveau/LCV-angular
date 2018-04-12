import { Component } from '@angular/core';
import { UserService } from './user/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  header = "Evenements"

  constructor(private userService: UserService) {
    this.userService = userService
  }

  isLoggedIn() {
    return this.userService.isLoggedIn()
  }
}
