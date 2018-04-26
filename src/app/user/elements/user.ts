export class User {
    id: string;
    username: string;
    accessToken: string;
    constructor(id= null,
        username: string,
        accessToken: string= "") {
        this.id = id;
        this.username = username;
        this.accessToken = accessToken;
    }

}