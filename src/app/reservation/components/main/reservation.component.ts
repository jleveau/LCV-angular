import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from '../../elements/reservation';
import { Subject }    from 'rxjs/Subject';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private reservationService: ReservationService) {
    this.reservationService = reservationService;
  }

  ngOnInit() {
    this.getReservation();
  }

  userSelectedSubject:Subject<any> = new Subject();

  selectUser(user: String) {
    this.userSelectedSubject.next(user);
  }

  getReservation() {
    this.reservationService.getReservationNext()
    .then((reservation) => {
      this.reservationService.setReservation(reservation);
    })
    .catch(() => {
      setTimeout(() => {
        this.getReservation();
      }, 2000)
    })
  }

  isTimedLimited(): Boolean {
    const date = this.reservationService.getReservationDate();
    const end_date = this.reservationService.getReservationEndAt();
    if (!end_date) {
      return false;
    }
    return date.getTime() !== end_date.getTime();
  }

  serviceAvailable(): Boolean {
    return this.reservationService.isAvailable();
  }

  getReservationDate(): Date {
    return this.reservationService.getReservationDate();
  }

  getReservationEndDate(): Date {
    return this.reservationService.getReservationEndAt();
  }

  getAvailableUsers(): String[] {
    return this.reservationService.getAvailableUsers();
  }

  getUncertainUsers(): String[] {
    return this.reservationService.getUncertainUsers();
  }

  getUnavailableUsers(): String[] {
    return this.reservationService.getUnavailableUsers();
  }

  deleteAvailableUser(name: string) {
    this.reservationService.deleteAvailableUser(name);
  }

  deleteUncertainUser(name: string) {
    this.reservationService.deleteUncertainUser(name);
  }

  deleteUnavailableUser(name: string) {
    this.reservationService.deleteUnavailableUser(name);
  }

}
