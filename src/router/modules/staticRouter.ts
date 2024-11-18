import { LOGIN_URL,HOME_URL } from "@/config/constants";
//import { tempRouter } from "@/router/modules/tempRouter";
import Publish from "@/views/blog/components/publish.vue";
import Management from "@/views/blog/components/management.vue";
import First from "@/components/Project/first.vue";
import Second from "@/components/Project/second.vue";
import Third from "@/components/Project/secondFirst.vue";
import Home from "@/views/home/index.vue";
import About from "@/views/about/index.vue";


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
        //存在暂时性死区问题，待解决
        children:[
            //关于嵌套路由的sample，用于检测menuList能否成功遍历
            {
                path:'/blog',
                name:"blog",
                //component: Blog,
                //redirect: '/blog/publish',
                children: [
                    {
                        path: '/blog/publish',
                        name: 'publish',
                        component: Publish,
                        meta: {
                            title: "Blog Publish",
                            icon: "DocumentCopy",
                            isAffix: false
                        }
                    },
                    {
                        path: '/blog/management',
                        name: 'management',
                        component: () => import("@/views/blog/components/management.vue"),
                        meta: {
                            title: "Blog Management",
                            icon: "Management",
                            isAffix: false
                        }
                    }
                ],
                meta:{
                    title:"Blog",
                    icon:"DocumentAdd",
                    isAffix: false
                }
            },
            {
                path:'/project',
                name:'project',
                redirect:'/project/First',
                children:[
                    {
                        path:'/project/first',
                        name:'First',
                        component:First,
                        meta:{
                            icon:"Files",
                            title:"First",
                            isAffix: false
                        }
                    },
                    {
                        path:'/project/second',
                        name:'Second',
                        component:Second,
                        children:[
                            {
                                path:'/project/second/second-first',
                                name:'Second-First',
                                component:Third,
                                meta:{
                                    icon:"Files",
                                    title:"Second-first",
                                    isAffix: false
                                }
                            }
                        ],
                        meta:{
                            title: "Second",
                            icon:"Folder",
                            isAffix: false
                        }
                    },
                ],
                meta: {
                    icon:"CirclePlus",
                    title: "Project",
                    isAffix: false
                }
            },

            {
                path:'/home/index/',
                name:'home',
                component:Home,
                meta:{
                    title:"Home",
                    icon:"HomeFilled",
                    isAffix:true
                }
            },
            {
                path:'/about/index',
                name:'about',
                component:About,
                meta: {
                    title:"About",
                    icon:"Star",
                    isAffix: false
                }
            }
        ]
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

