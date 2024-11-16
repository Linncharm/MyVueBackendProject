import { createRouter, createWebHistory } from 'vue-router'
import Nprogress from "@/config/nprogress";
import useUserStore from "@/stores/modules/user";
import {LOGIN_URL} from "@/config/constants";
import {staticRouter,errorRouter} from "@/router/modules/staticRouter";
import {tempRouter} from "@/router/modules/tempRouter";

const router = createRouter({
  history: createWebHistory(),
  // [...]为展开语法，适合将多个数组合并
  routes: [...staticRouter,...errorRouter],

  strict: false,

  scrollBehavior:()=>({left:0,top:0}), //在导航到新视图时，页面总是从顶部开始显示
})


//设置一个路由的全局守卫beforeEach 在路由跳转前被调用
//to为即将要进入的路由对象 from为正要离开的 next为必须要调用的方法
//使用了async await异步函数
router.beforeEach(async (to, from, next) => {
  console.log('to',to);        //目标路由
  console.log('from',from);    //当前路由
  //初始化一个userStore的实例
  const userStore = useUserStore();
  //1111.首先开始进度条
  Nprogress.start();

  //2222.判断是不是登录页面，若有token就在渲染当前页面，没有就跳转登录页面
  if(to.path.toLocaleLowerCase() === LOGIN_URL){
    console.log("beforeEach-token",userStore.token);
    if(userStore.token){
      return next(from.fullPath);
    }
    return next();
  }

  //3333.没有token就重定向到login页面
  if(!userStore.token){
    return next({path:LOGIN_URL,replace:true});
    //replace代表浏览器不会后退回历史了
  }

  //4444.正常访问页面
  next();
})


//重置路由 通过比哪里菜单列表，移除所有已注册路由，用于在用户登出时清理路由状态
export const resetRouter=()=>{

}


//路由跳转结束
router.afterEach(()=>{
  Nprogress.done();
});

export default router
