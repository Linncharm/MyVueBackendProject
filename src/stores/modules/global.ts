import {defineStore} from "pinia";

//export default useGlobalStore 的区别
export const useGlobalStore = defineStore({
    id: 'MyVueBackendProject',
    state:()=>({
        //当前系统语言
        language:null,
    })
})