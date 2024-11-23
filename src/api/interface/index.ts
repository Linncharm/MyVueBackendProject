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

export interface BlogItemFormRule {
    title:string;
    author:string;
    description?:string;
    tags?:string[];
    remark?:string;
    category:string;
    createdTime:string;
    lastUpdatedTime:string;
    content:string;
    publishState:number;
}

export interface BlogFormOption {
    prop?:string;
    placeholder?:string;
    model?:string;
}
