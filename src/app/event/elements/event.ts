import { User } from "../../user/elements/user";

export class Event {
    id: string;
    title: String;
    date: Date;
    author: User;
    place: String;
    end_date: Date;
    event_limit_date: Date;
    liste_participants: User[];
    liste_absents: User[];
    liste_incertains: User[];
    description: String;

    constructor(id = null,
        title: String = "",
        author: User = null,
        place: String = "",
        liste_absents: User[] = [],
        list_participants: User[] = [],
        liste_incertains: User[] = [],
        end_date: string = null,
        date: string = null,
        event_limit_date: string = null,
        description: string = "") {
        this.id = id;
        this.place = place;
        this.title = title;
        this.liste_absents = liste_absents;
        this.liste_participants = list_participants;
        this.liste_incertains = liste_incertains;
        this.description = description
        if (end_date) {
            this.end_date = new Date(end_date.toString());
        }
        if (date) {
            this.date = new Date(date.toString());
        }
        if (event_limit_date) {
            this.event_limit_date = new Date(event_limit_date.toString());
        }
    }

}