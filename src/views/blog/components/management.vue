<template>
  <div class="blog-management-container">
    <el-radio-group class="blog-radio-group">
      <el-radio-button value="chinese">中文</el-radio-button>
      <el-radio-button value="english">English</el-radio-button>
    </el-radio-group>

    <div class="blog-filter-group">
      <el-tooltip content="选择文章发布状态" placement="top">
        <el-select class="blog-select" v-model="blogSelect" :placeholder="blogSelect">
          <el-option value="已发布"> 已发布 </el-option>
          <el-option value="未发布"> 未发布 </el-option>
        </el-select>
      </el-tooltip>
      <el-button-group class="blog-button-group">
        <el-button @click="requestBlogInformation">
          <span> 重置 </span>
          <el-icon style="margin-left: 2px" :class="getBlogInformationState ? 'is-loading' : '' ">
            <Refresh/>
          </el-icon>
        </el-button>
        <el-button style="background-color: skyblue">
          <span> 搜索 </span>
          <el-icon>
            <Search/>
          </el-icon>
        </el-button>
        <el-button style="background-color: var(--el-menu-active-color); font-weight: bold" @click="createBlog">
          <span> 创建文章 </span>
        </el-button>
      </el-button-group>
    </div>

    <el-table class="blog-table">

    </el-table>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import {Refresh, Search} from "@element-plus/icons-vue";
import router from '@/router/index'

const getBlogInformationState = ref(false);

const blogSelect = ref('选择文章发布状态')

function createBlog() {
  router.push('/blog/publish')
}

async function requestBlogInformation(){
  console.log("blog information is pending")
}

</script>

<style scoped lang="scss">

</style>