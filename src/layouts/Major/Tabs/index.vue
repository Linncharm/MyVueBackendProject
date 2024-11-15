<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="removeTab">
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
            {{  item.title }}
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
import router from "@/router";

const route = useRoute();

const globalStore = useGlobalStore();
const {showMenuList} = globalStore
const flatMenuList = getFlatMenuList(showMenuList);
console.log("flatMenuList",flatMenuList);

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
    console.log("tabMenuList",tabStores.tabsMenuList)
  })

}

//Click the tab to jump to the corresponding page
const tabClick = (tabItem)=>{
  const fullPath = tabItem.props.name as string;
  router.push(fullPath);
}

//remove tab
const removeTab = (tabItem)=>{
  const fullPath = tabItem.props.name as string;
  tabStores.removeTab(fullPath);
}

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>