<template>
  <el-main>
    <router-view v-slot="{ Component , route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">

        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";  //将存储对象变为响应式
import {useKeepAliveStore} from "@/stores/modules/keepAlive";
const useKeepAliveStore = useKeepAliveStore();

const { keepAliveName } = storeToRefs(useKeepAliveStore);

</script>

<style scoped lang="scss">

</style>