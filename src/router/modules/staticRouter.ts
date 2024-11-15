import { LOGIN_URL,HOME_URL } from "@/config/constants";
import { tempRouter } from "@/router/modules/tempRouter";
//import { RouteRecordRaw } from "vue-router"; //用于定义路由中的记录类型
/*
静态路由
 */
export const staticRouter=[
    {
        path:'/',
        //redirect:'HOME_URL',
        redirect:HOME_URL,
    },
    {
        path:LOGIN_URL,
        component:()=>import("@/views/login/index.vue"),
        //meta可以在页面渲染时候使用
        meta:{
            title:"登录"
        }
    },
    {
        //children里的子路由都会经过/layout 从而定向至layouts里的index实现布局
        path:'/layout',
        component:()=>import("@/layouts/index.vue"),
        redirect:HOME_URL,
        children:tempRouter,
    }
]

/*
错误路由
 */

export const errorRouter=[
    {
        path:'/404',
        name:'404',
        component:()=>import("@/components/ErrorPages/404.vue")
    }
]

