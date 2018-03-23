import { Injectable } from '@angular/core';
import { Reservation } from '../../elements/reservation';
import { ReservationHttpService } from '../http/reservation-http.service';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReservationService {

  reservation: Reservation;
  userSelectedSubject: Subject<string>;


  constructor(private reservationHttpService: ReservationHttpService) {
    this.reservationHttpService = reservationHttpService;
    this.userSelectedSubject = new Subject<string>();
  }

  getUserSelectedObservable() : Observable<string> {
    return this.userSelectedSubject.asObservable()
  }

  updateSelectedUser(user) {
    this.userSelectedSubject.next(user);
  }

  isAvailable() : Boolean {
    return this.reservation !== null && this.reservation !== undefined;
  }

  getReservationNext(): Promise<Reservation> {
    return this.reservationHttpService.getReservationNext();
  }

  getReservationDate(): Date {
    if (this.reservation) {
      return this.reservation.date;
    }
  }

  getReservationEndAt(): Date {
    if (this.reservation) {
      return this.reservation.end_date;
    }
  }

  addParticipatinUser(name: string): void {
    if (name && this.reservation) {
      this.reservation.addUser(name);
      this.reservationHttpService.updateReservation(this.reservation);
    }
  }

  addUnavailableUser(name: string): void {
    if (name && this.reservation) {
      this.reservation.addUnavailableUser(name);
      this.reservationHttpService.updateReservation(this.reservation);
    }
  }

  addUncertainUser(name: string): void {
    if (name && this.reservation) {
      this.reservation.addUncertainUser(name);
      this.reservationHttpService.updateReservation(this.reservation);
    }
  }

  getAvailableUsers(): string[] {
    if (this.reservation) {
      return this.reservation.liste_participants;
    }
  }

  getUncertainUsers(): String[] {
    if (this.reservation) {
      return this.reservation.liste_incertains;
    }
  }

  getUnavailableUsers(): String[] {
    if (this.reservation) {
      return this.reservation.liste_absents;
    }
  }

  deleteAvailableUser(name: string): void {
    if (name && this.reservation) {
      this.reservation.deleteAvailableUserByName(name);
      this.reservationHttpService.updateReservation(this.reservation);
    }
  }

  deleteUncertainUser(name: string): void {
    if (name && this.reservation) {
      this.reservation.deleteUncertainUserByName(name);
      this.reservationHttpService.updateReservation(this.reservation);
    }
  }

  deleteUnavailableUser(name: string): void {
    if (name && this.reservation) {
      this.reservation.deleteUnavailableUserByName(name);
      this.reservationHttpService.updateReservation(this.reservation);
    }
  }

  setReservation(reservationData: any) {
    this.reservation = new Reservation(
      reservationData._id,
      reservationData.not_participants,
      reservationData.participants,
      reservationData.uncertains,
      reservationData.end_date,
      reservationData.date,
      reservationData.reservation_limit_date
    );
  }

}