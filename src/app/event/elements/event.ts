import { User } from "../../user/elements/user";

export class Event {
    id: string;
    title : String;
    date: Date;
    end_date: Date;
    event_limit_date: Date;
    liste_participants: User[];
    liste_absents: User[];
    liste_incertains: User[];

    constructor(id= null,
        title: String,
        liste_absents:User[] = [],
        list_participants:User[] = [],
        liste_incertains:User[] = [],
        end_date:string = null,
        date:string = null,
        event_limit_date: string = null) {
        this.id = id;
        this.title = title;
        this.liste_absents = liste_absents;
        this.liste_participants = list_participants;
        this.liste_incertains = liste_incertains;
        this.end_date = new Date(end_date.toString());
        this.date = new Date(date.toString());
        this.event_limit_date = new Date(event_limit_date.toString());
    }

}