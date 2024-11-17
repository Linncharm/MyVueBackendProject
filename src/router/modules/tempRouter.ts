import {HOME_URL} from "@/config/constants";
import Home from "@/views/home/index.vue";
import Blog from "@/views/blog/index.vue";
import First from "@/components/Project/first.vue";
import Second from "@/components/Project/second.vue";
import Third from "@/components/Project/secondFirst.vue";
import About from "@/views/about/index.vue";

import Publish from "@/views/blog/components/publish.vue";
import Management from "@/views/blog/components/management.vue";
//这里pinia还没有启动，不能从global引入路由

export const tempRouter = [
    //关于嵌套路由的sample，用于检测menuList能否成功遍历
    {
        path:'/blog',
        name:"blog",
        component: Publish,
        redirect: '/blog/publish',
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
                component: Management,
                meta: {
                    title: "Blog Management",
                    icon: "Management",
                    isAffix: false
                }
            }
        ],
        meta:{
            title:"Blog Management",
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
