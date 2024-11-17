<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="removeTab">
        <el-tab-pane
            v-for="item in tabsMenuList"
            :key="item.path"
            :label="item.name"
            :name="item.path"
            :closable="true">
          <template #label>
            <el-icon v-if="item.icon" class="tabs-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useTabStores} from "@/stores/modules/tabs";
import {useGlobalStore} from "@/stores/modules/global";
import { storeToRefs } from "pinia";
import {getFlatMenuList} from "@/utils";
import {computed, onMounted, ref , watch} from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const globalStore = useGlobalStore();
//const {showMenuList} = globalStore
const flatMenuList = getFlatMenuList(globalStore.showMenuList);

//使用tabStores前必须先调用useTabStores
const tabStores = useTabStores();

console.log("flatMenuList",flatMenuList);

const tabsMenuList = computed(()=>tabStores.tabsMenuList)
console.log("tabsMenuList after computed",tabsMenuList.value);

const tabsMenuValue = ref(route.fullPath)

onMounted(()=>{
  //console.log("showMenuList", showMenuList);
  console.log("flatMenuList",flatMenuList);
  initTabs();
})

watch(
    ()=>flatMenuList,
    ()=>{
      console.log("flatMenuList watch");
      initTabs();
    }
)

const initTabs = () => {
  flatMenuList.forEach(item => {
    if(item.meta.isAffix) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix
      }
    tabStores.addTabs(tabsParams);
    }
  })
  console.log("tabMenuList",tabStores.tabsMenuList)
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