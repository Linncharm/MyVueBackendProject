<template>

  <el-main>
    <router-view v-slot="{ Component , route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component
              :is="createComponentWrapper(Component,route)"
              v-if="isRouterShow"
              :key="route.fullPath"
          >
          </component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-show="footer">
    <Footer/>
  </el-footer>

</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";  //将存储对象变为响应式
import {useKeepAliveStore} from "@/stores/modules/keepAlive";
import {useGlobalStore} from "@/stores/modules/global";
import Footer from "@/layouts/Major/Footer/index.vue"

import {onBeforeMount, onBeforeUnmount, watch} from "vue";

import {h, ref} from "vue";
const KeepAliveStore = useKeepAliveStore();
const globalStore = useGlobalStore();

const title = import.meta.env.VITE_DLOB_APP_TITLE

const { footer } = storeToRefs(globalStore);
const { keepAliveName } = storeToRefs(KeepAliveStore);

const isRouterShow=ref(true)

const wrapperMap = new Map();

function createComponentWrapper(component,route){
  if(!component){
    return;
  }
  console.log("route",route);
  console.log("component",component);
  const wrapperName = route.fullPath
  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper){
    wrapper= {name:wrapperName,render:()=>h(component)};
  }
}

//------监听窗口大小变化，折叠侧边栏------
//注意要转换为响应式，然后使用value
import { useDebounceFn } from "@vueuse/core";

const { isCollapse } = storeToRefs(globalStore);
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(()=>{
  screenWidth.value = document.body.clientWidth;
  console.log(screenWidth.value)
  if(!isCollapse.value&&screenWidth.value<1000){
    globalStore.setGlobalState("isCollapse",true);
    console.log("isCollapse",isCollapse.value);
  }
  if(isCollapse.value&&screenWidth.value>1000){
    globalStore.setGlobalState("isCollapse",false);
    console.log("isCollapse",isCollapse.value);
  }
},100);

console.log("!!!",isCollapse.value)

window.addEventListener("resize",listeningWindow,true);
onBeforeUnmount(()=>{
  window.removeEventListener("resize",listeningWindow);
})

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>