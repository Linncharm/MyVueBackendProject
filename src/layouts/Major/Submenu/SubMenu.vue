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

<!--    剩下的都是单独的item组件-->
    <el-menu-item v-else :index="subItem.path">
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
//  const props = defineProps(["menuList"])  const { menuList } = props
defineProps<{menuList:any}>()  //暂时写成any
</script>

<style lang="scss">
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
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
</style>