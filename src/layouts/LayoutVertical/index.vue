<!--这是纵向布局-->
<template>
  <el-container class="layout">

    <el-aside>
      <div class="aside-box" :style="{width : isCollapse ? '65px' : '210px' }">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo"/>
          <span v-show="!isCollapse" class="logo-text">{{ title }}</span>
        </div>
      </div>
      <el-scrollbar>
        <el-menu
          :router="false"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <SubMenu :menu-list="menuList"></SubMenu>
        </el-menu>
      </el-scrollbar>

    </el-aside>

    <el-container>
      <el-header>

      </el-header>

      <Main/>

    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {useGlobalStore} from "@/stores/modules/global";
import {storeToRefs} from "pinia";

import SubMenu from "@/layouts/Major/Submenu/SubMenu.vue";
import Main from "@/layouts/Major/Main/index.vue"

const title = "Dynamic Title"
const globalStore = useGlobalStore();
//const isCollapse = computed(() => globalStore.isCollapse );
const {isCollapse} = storeToRefs(globalStore)

console.log("Layout isCollapse", isCollapse);

//由computed计算出的是响应式数据
const menuList = computed(() => globalStore.showMenuList);
console.log("menuList", menuList.value);  //Proxy(Array)
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>