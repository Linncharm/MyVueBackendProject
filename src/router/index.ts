import { createRouter, createWebHistory } from 'vue-router'
import Nprogress from "@/config/nprogress";
import useUserStore from "./useUserStore";
import {HOME_URL} from "@/config/constants";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      //在需要的时候动态引入组件
      component:()=>import("/src/views/login/index.vue")
    }
  ],
  strict: false,

  scrollBehavior:()=>({left:0,top:0}), //在导航到新视图时，页面总是从顶部开始显示
})


//设置一个路由的全局守卫beforeEach 在路由跳转前被调用
//to为即将要进入的路由对象 from为正要离开的 next为必须要调用的方法
//使用了async await异步函数
router.beforeEach(async (to, from, next) => {

  //初始化一个userStore的实例
  const userStore = useUserStore();
  //1111.首先开始进度条
  Nprogress.start();

  //2222.没有token就重定向到login页面
  if(!userStore.token){
    return next({path:HOME_URL,replace:true});
    //replace代表浏览器不会后退回历史了
  }

  //3333.正常访问页面
  next();
})


//路由跳转结束
router.afterEach(()=>{
  Nprogress.done();
});

export default router
