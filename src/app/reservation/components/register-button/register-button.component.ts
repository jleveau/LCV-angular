import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from '../../services/reservation/reservation.service';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent implements OnInit {

  selectedUserName: string;

  constructor(private reservationService: ReservationService) {
    this.reservationService = reservationService
    this.reservationService.getUserSelectedObservable().subscribe((user) => {
      this.selectedUserName = user;
    })
   }

  ngOnInit() {
  }

  addParticipatingUser(name: String): void {
    if (name) {
      this.reservationService.addParticipatinUser(String(name));
    }
  }

  addUncertainUser(name: String): void {
    if (name) {
      this.reservationService.addUncertainUser(String(name));
    }
  }

  addUnavailableUser(name: String): void {
    if (name) {
      this.reservationService.addUnavailableUser(String(name));
    }
  }

}
