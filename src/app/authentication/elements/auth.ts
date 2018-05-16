export class Auth {
    username: string;
    password: string;
    confirm: string;

    constructor() { }

    validate() {
        if (this.confirm !== this.password) {
            return "Les mots de passes ne correspondent pas."
        }
        if (!this.username.match(/^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/)) {
            return "Le nom d'utilisateur est invalide"
        }
        return null
    }
}