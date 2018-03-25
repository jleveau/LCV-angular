import * as moment from 'moment-timezone';

export class Reservation {
    id: string;
    date: Date;
    end_date: Date;
    reservation_limit_date: Date;
    liste_participants: string[];
    liste_absents: string[];
    liste_incertains: string[];

    constructor(id= null,
        liste_absents:string[] = [],
        list_participants:string[] = [],
        liste_incertains:string[] = [],
        end_date:string = null,
        date:string = null,
        reservation_limit_date: string = null) {
        this.id = id;
        this.liste_absents = liste_absents;
        this.liste_participants = list_participants;
        this.liste_incertains = liste_incertains;

        this.end_date = moment(end_date.toString()).tz("Europe/Paris").toDate();
        this.date = moment(date.toString()).tz("Europe/Paris").toDate();
        this.reservation_limit_date = moment(reservation_limit_date.toString()).tz("Europe/Paris").toDate();
    }

    addUser(user: string) {
        this.deleteFromLists(user);
        this.liste_participants.push(user);
    }

    addUnavailableUser(user: string): void {
        this.deleteFromLists(user);
        this.liste_absents.push(user);
    }

    addUncertainUser(user: string): void {
        this.deleteFromLists(user);
        this.liste_incertains.push(user);
    }

    deleteFromLists(user: string) : void {
        this.deleteAvailableUserByName(user);
        this.deleteUnavailableUserByName(user);
        this.deleteUncertainUserByName(user);
    }

    deleteAvailableUserByName(name: string): void {
        this.liste_participants = this.liste_participants.filter((user) =>
            user !== name);
    }

    deleteUncertainUserByName(name: string): void {
        this.liste_incertains = this.liste_incertains.filter((user) =>
            user !== name);
    }

    deleteUnavailableUserByName(name: string): void {
        this.liste_absents = this.liste_absents.filter((user) => 
            user !== name);
    }

}