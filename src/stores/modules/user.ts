import {defineStore} from "pinia";

const useUserStore = defineStore({
    id:"user",
    state:()=>({
        token:"",
        userInfo:{name:"Linncharm"}
    }),
    getters:{},

    //只有被显示调用时，actions的方法才会被执行
    actions:{
        //设置token
        setToken(token: string){
            this.token = token;
        },
        //设置userInfo 其中传入的userInfo为一个对象 ，只有一组key-value
        setUserInfo(userInfo:{name: string}){
            this.userInfo = userInfo;
        }
    },
    persist: {
        key:'token',
        storage: localStorage,
    }
})



export default useUserStore;