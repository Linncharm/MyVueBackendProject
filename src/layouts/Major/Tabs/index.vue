<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" >
        <el-tab-pane
            v-for="item in flatMenuList"
            :key="item.path"
            :label="item.name"
            :name="item.path"
            :closable="true">
          <template #label>
            <el-icon v-if="item.meta.icon" class="tabs-icon">
              <component :is="item.meta.icon"></component>
            </el-icon>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTabStores} from "@/stores/modules/tabs";
import {useGlobalStore} from "@/stores/modules/global";
import {getFlatMenuList} from "@/utils";
import {onMounted,ref} from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const globalStore = useGlobalStore();
const {showMenuList} = globalStore
const flatMenuList = getFlatMenuList(showMenuList);

const tabsMenuValue = ref(route.fullPath)

onMounted(()=>{
  console.log("showMenuList", showMenuList);
  console.log("flatMenuList",flatMenuList);
  initTabs();
})


const tabStores = useTabStores();

const initTabs = ()=>{
  flatMenuList.forEach(item=>{
    const tabsParams = {
      icon : item.meta.icon,
      title : item.meta.title,
      path : item.path,
      name : item.meta.name,
    }
    tabStores.addTabs(tabsParams);
  })
}

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>