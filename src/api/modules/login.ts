//登录模块接口
//import { Login } from "@/api/interface";

const loginSuccessStatus =
    {
        "code": 200,
        "data": {
            "access_token": "testestestestestestestestestest123"
        },
        "msg": "成功"
    }

const loginFailedStatus ={
    "code": 502,
    "data": {
        "access_token": ""
    },
    "msg": "失败"
}

//发现只要调用loginApi就会出现
//[Vue Router warn]: Unexpected error when starting the router:
// SyntaxError: The requested module '/src/api/interface/index.ts' does not provide an export named 'Login'
// (at login.ts:2:10)
/*---------排查发现将Login的import去掉即可，原因暂且未知---------*/
export const loginApi = (params: Login.RequestLoginForm) => {
    if(params.username=="admin"||params.username=="user"){
        if(params.password == e10adc3949ba59abbe56e057f20f883e ){
            return loginSuccessStatus;
        }
    }else {
        return loginFailedStatus;
    }
}