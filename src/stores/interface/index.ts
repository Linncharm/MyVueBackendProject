import {type Reactive} from "vue";

//分配的组件大小选择
export type AssemblySizeType = "large" | "small" | "medium" | "default";

//布局样式选择 竖or横
export type LayoutType = "vertical" | "horizontal" ;

/*全局样式接口定义*/
export interface GlobalState {
    language?: string;
    layout: LayoutType;
    assemblySize: AssemblySizeType;
    isCollapsed: boolean;
    showMenuList: Reactive<Array>;
}

//tabItem 接口定义
export interface TabMenuProps {
    icon:string;
    title:string;
    path:string;
    name:string;
    close?:boolean;
    isKeepAlive?:boolean;
}