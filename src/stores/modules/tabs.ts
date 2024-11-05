import {defineStore} from "pinia";
import router from "@/router";
import {TabMenuProps} from "@/stores/interface";

export const useTabStores = defineStore({
    id:"linncharm-tabs",
    state:()=>({
        tabsMenuList:[],
    }),
    actions:{
        //先构建add方法
        async addTabs(tabItem:TabMenuProps){
            // every: 每一个回调都返回true才为true  //等同于判断tabItem.path在tabsMenuList中是否存在
            if(this.tabsMenuList.every(item=>(item.path!==tabItem.path))){
                this.tabsMenuList.push(tabItem);
            }
        },
        async removeTab(tabItem:TabMenuProps){

        }
    }
})