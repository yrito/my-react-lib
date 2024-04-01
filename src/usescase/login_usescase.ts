import api from "../api/api";

class LoginUsesCase {
    username: string | null;
    pass: string | null;
    connected: boolean;

    constructor(username: string, pass: string) {
        this.username = username;
        this.pass = pass;
        this.connected = false;
    }

    private async verifyConnection() {
        try {
            await api.connect().then(() => {
                this.connected = true;
            }).catch(() => {
                this.connected = false;
            });
        }
        catch (ex) {
            this.connected = false;
        }
    }

    private async login() {
        try {
            await api.userLogin({ ulogin: this.username, pass: this.pass });
            return null;
        }
        catch (ex) {
            return ex;
        }
    }

    private async create() {
        try {
            await api.userCreate({ ulogin: this.username, pass: this.pass });
            return null;
        }
        catch (ex) {
            return ex;
        }
    }

    async call() {
        await this.verifyConnection();
        if (!this.connected)
            return 9999;

        var codeError = null;

        var loginResult: any = await this.login();
        if (loginResult != null) {
            if (loginResult.status == 422) {
                const createResult: any = await this.create();
                if (createResult == null) {
                    loginResult = await this.login();
                    if (loginResult != null) {
                        codeError = loginResult.status
                    }
                }
                else {
                    codeError = createResult.status
                }
            }
            else {
                codeError = loginResult.status
            }
        }

        return codeError;
    }
}

export default LoginUsesCase;