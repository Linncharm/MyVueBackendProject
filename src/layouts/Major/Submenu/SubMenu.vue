<!--子菜单-->
<template>
<!--  通过模板遍历整个menuList,然后内部筛选子目录或者目录项-->
  <template v-for="subItem in menuList" :key="subItem.path">
<!--    如果有children属性且长度不为0，就渲染sub-menu属性，使用?可以防止返回NULL-->
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">

      <template #title>
        <el-icon v-if="subItem.meta.icon">
          <component :is="subItem.meta.icon" />
        </el-icon>
        <span class="sle">{{subItem.meta.title}}</span>
      </template>

      <!--嵌套传递-->
      <SubMenu :menu-list="subItem.children"></SubMenu>

    </el-sub-menu>

<!--    剩下的都是单独的item组件,要添加点击后跳转方法-->
    <el-menu-item v-else :index="subItem.path" @click="changeToMenuItem(subItem)">
      <el-icon>
        <component :is="subItem.meta.icon" />
      </el-icon>

      <template #title>
        <span class="sle">{{subItem.meta.title}}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">

import router from "@/router/index";
//  const props = defineProps(["menuList"])  const { menuList } = props
defineProps<{menuList:any}>()  //暂时写成any

import { useTabStores } from "@/stores/modules/tabs";
import { getFlatMenuList } from "@/utils";

const tabStores = useTabStores();

const changeToMenuItem = (item:any)=>{
  console.log("changeToMenuItem", item);
  item.meta.isAffix = true;
  //globalStore.addTabs(item);
  //console.log("getFlatMenuList", getFlatMenuList([item])[0]);
  const tabsParams = {
    icon: item.meta.icon,
    title: item.meta.title,
    path: item.path,
    name: item.name,
    close: !item.meta.isAffix
  }
  tabStores.addTabs(tabsParams);
  console.log("tabsMenuList", tabStores.tabsMenuList);
  router.push(item.path)
}

</script>

<style lang="scss">
:root {
  --el-color-primary: #da5d5d;
  --el-menu-bg-color: #ffffff;
  --el-menu-hover-bg-color: #cccccc;
  --el-menu-active-bg-color: var(--el-color-primary-light-8);
  --el-menu-text-color: #333333;
  --el-menu-active-color: #13a9ea;
  --el-menu-hover-text-color: #333333;
  --el-menu-horizontal-sub-item-height: 50px;
}

.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    &::before {
      left: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
</style>