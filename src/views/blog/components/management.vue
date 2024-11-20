<template>

  <div class="blog-management-container">
    <div>
      <el-radio-group class="blog-radio-group">
        <el-radio-button value="chinese">中文</el-radio-button>
        <el-radio-button value="english">English</el-radio-button>
      </el-radio-group>
    </div>


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
    <div class="blog-content">
      <div class="blog-table">
        <el-table style="height: 100%" stripe :data="blogTableData">

            <el-table-column
              v-for="item in blogTableData"
              :prop="item.prop"
              :label="item.prop"
            />

            <el-table-column fixed="right" label="111"></el-table-column>

        </el-table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from 'vue'
import {Refresh, Search} from "@element-plus/icons-vue";
import router from '@/router/index'

const getBlogInformationState = ref(false);

const blogSelect = ref('选择文章发布状态')

// const blogTableData = reactive([
//   { label:'文章标题' , prop:'title' , title:['Article one','Article two','Article three','Article four','Article five','Article six','Article seven'] },
//   { label:'文章描述' , prop:'description' , description:['test 1','test 2','test 3','test 4','test 5','test 6','test 7'] },
//   { label:'作者' , prop:'author' , author:['AAA','BBB','CCC','DDD','EEE','FFF','GGG'] },
//   { label:'创建时间' , prop:'createTime' , creatTime:['2024-11-08T15:08:43Z','2024-11-08T15:08:43Z']},
//   { label:'发布状态' , prop:'publishedState' , publishedState:[false,false,false,false,false,false,false] },
//   { label:'标签' , prop:'tag' ,tag:['default tag','default tag','default tag','default tag','default tag','default tag','default tag'] },
//   { label:'备注' , prop:'remark' , remark:['remark test','remark test','remark test','remark test','remark test','remark test','remark test'] },
// ])

const blogTableData = reactive([
  { prop:'title' , title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" ,publishedState:false , tag:'default tag' , remark:'remark test'},
  { prop:'description' , title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" ,publishedState:false , tag:'default tag' , remark:'remark test'},
  { prop:'author' , title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" ,publishedState:false , tag:'default tag' , remark:'remark test'},
  { prop:'createTime' , title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" ,publishedState:false , tag:'default tag' , remark:'remark test'},
  { prop:'publishState' , title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" ,publishedState:false , tag:'default tag' , remark:'remark test'},
  { prop:'tag' , title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" ,publishedState:false , tag:'default tag' , remark:'remark test'},
  { prop:'remark' , title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" ,publishedState:false , tag:'default tag' , remark:'remark test'},
])

function createBlog() {
  router.push('/blog/publish')
}

async function requestBlogInformation(){
  console.log("blog information is pending")
}

</script>

<style scoped lang="scss">

</style>