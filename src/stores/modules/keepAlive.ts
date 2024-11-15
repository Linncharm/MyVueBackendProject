import {defineStore} from "pinia";

export const useKeepAliveStore = defineStore({
    id:"linncharm-keepAlive",
    state:()=>({
        keepAliveName:[]
    }),
    actions:{
        async addKeepAliveName(name:string){
            //如果name不在数组中，那么执行后面的操作
            //参见更多ES6简写
            // https://www.cnblogs.com/yc8930143/p/8531654.html
            !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
        }
    }
})