<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import {computed,reactive} from "vue";
import { useGlobalStore } from "/src/stores/modules/global"
import {ElConfigProvider} from "element-plus";
import {getBrowserLang, getNormalLang} from "@/utils";
import en from "element-plus/es/locale/lang/en";
import zhCn from "element-plus/es/locale/lang/zh-cn";

//配置全局设置
const globalStore = useGlobalStore()
//全局配置
// element language

//简单的获取语言
const locale = getNormalLang()=="zhCn"?zhCn:en ;
/*
动态获取语言
const dynamicLocale = computed(() => {
  if (globalStore.language == "zh") return zhCn;
  if (globalStore.language == "en") return en;
  return getBrowserLang() == "zh" ? zhCn : en;  //恒定返回zh
});

 */


// element assemblySize
const assemblySize = computed(() => globalStore.assemblySize);

// element button config
const buttonConfig = reactive({ autoInsertSpace: false });

</script>