<template>
    <component :is="LayoutComponents[layout]"></component>
</template>

<script setup lang="ts">
import type {LayoutType} from "@/stores/interface";
import {computed,type Component} from "vue";
import LayoutVertical from "./LayoutVertical/index.vue"
import LayoutHorizontal from "./LayoutHorizontal/index.vue"
import {useGlobalStore} from "@/stores/modules/global";

//Record 为 键值对
const LayoutComponents:Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  horizontal: LayoutHorizontal,
}

const globalStore = useGlobalStore();

const layout = computed(() => globalStore.layout );

//注意！ 这是错误的写法
//const layout = computed(() => {globalStore.layout} );

</script>

<style scoped lang="scss">

</style>