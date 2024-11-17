import {defineStore} from "pinia";
import router from "@/router";
import type { TabMenuProps , TabsState } from "@/stores/interface";

export const useTabStores = defineStore({
    id:"linncharm-tabs",
    state:():TabsState=>({
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
        //如果没有提供isCurrent参数，则默认为true
        async removeTab(tabPath:string,isCurrent: boolean=true){
            if(isCurrent){
                this.tabsMenuList.forEach((item,index)=>{
                    if(item.path!=tabPath) return;
                    //navigate to a neighbor tab
                    const nextTab = this.tabsMenuList[index+1] || this.tabsMenuList[index-1];
                    if(!nextTab) return;
                    router.push(nextTab.path);
                });
            }
        }
    }
})