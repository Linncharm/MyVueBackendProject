//暴露了获取环境的方法
import {Recordable} from "../src/stores/typings/global"

//envName为key, realName 为 value
export function envWrapper(envConfig:Recordable):ViteEnv {
    const envArray:any = [];
    for(const envName of Object.keys(envConfig)) {
        let realName = envConfig[envName];
        realName = realName === "true" ? true : realName==="false" ? false: realName ;
        if(realName == "VITE_PORT") realName = Number(realName);
        envArray[envName] = realName;  //添加数组的key value
    }
    return envArray;
}