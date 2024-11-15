//Login module
export namespace Login {
    export interface RequestLoginForm {
        username:string;
        password:string;
    }
    export interface ResponseLogin {
        token:string;
    }
}