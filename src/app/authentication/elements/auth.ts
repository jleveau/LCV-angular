export class Auth {
    username: string;
    password: string;
    confirm: string;

    constructor() {}

    validate() {
        if (this.confirm !== this.password) {
            return "Les mots de passes ne correspondent pas."
        }
        return null
    }
}