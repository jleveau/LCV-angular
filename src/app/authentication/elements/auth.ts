export class Auth {
    username: string;
    password: string;
    confirm: string;

    constructor() {}

    validate() {
        if (this.confirm) {
            return this.confirm === this.password
        }
        return true;
    }
}