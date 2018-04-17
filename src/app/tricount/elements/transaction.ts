import { User } from "../../user/elements/user";

export class Transaction {
    id: string;
    from: User;
    to: any;
    val: number;

    constructor(id=null, from: User, to, val: number) {
        this.id=id;
        this.from=from;
        this.to=to;
        this.val=val;
    }
    
}