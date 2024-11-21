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
        <el-select class="blog-select" v-model="blogSelect" :placeholder="'选择文章发布状态'">
          <el-option value=1 label="已发布"></el-option>
          <el-option value=0 label="未发布"></el-option>
        </el-select>
      </el-tooltip>
      <el-button-group class="blog-button-group">
        <el-button @click="getBlogTableData">
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
              v-for="item in blogTableProp"
              :prop="item.prop"
              :label="item.prop"
            >
              <template v-slot="scope">
                <!-- 判断是否需要显示 el-switch -->
                <el-switch
                    v-if="item.showState"
                    v-model="scope.row[item.prop]"
                    style="--el-switch-on-color: #13ce66"
                />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operation">
              <template #default="scope">
                <div class="operation-group">
                  <el-button link type="warning">
                    <span> 编辑 </span>
                  </el-button>
                </div>
              </template>
            </el-table-column>

        </el-table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref , onMounted} from 'vue'
import {Refresh, Search} from "@element-plus/icons-vue";
import router from '@/router/index'

import axios from "axios";

interface BlogTableProp {
  title: string,
  description: string,
  author: string,
  createTime: string,
  lastUpdatedTime: string,
  publishedState: boolean,
  tag: string,
  remark: string,
}

interface BlogTableResp {
  code: number,
  data: object
}

const getBlogInformationState = ref(false);

const blogSelect = ref()

const blogTableProp = reactive([
  {prop:'title' , showState:false},
  {prop:'description' , showState:false},
  {prop:'author' , showState:false},
  {prop:'createTime' , showState:false},
  {prop:'publishState' , showState:true},
  {prop:'tag' , showState:false},
  {prop:'remark' , showState:false},
  {prop:'lastUpdatedTime' , showState:false},
])

const blogReqConfig = {
  method: 'get',
  url: 'http://127.0.0.1:4523/m1/5361679-5033621-default/api/vi/blog/get',
};

// const blogTableData = reactive([
//   { title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
//   { title:'Article two' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
//   { title:'Article three' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
//   { title:'Article four' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
//   { title:'Article five' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
//   { title:'Article six' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
//   { title:'Article seven' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
//   { title:'Article eight' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
// ])

const blogTableData = reactive([])

async function getBlogTableData() {
  let blogResp: BlogTableResp = {code: 0, data: {}} ;
  try {
    blogResp = await axios(blogReqConfig)
  } catch (e) {
    console.log(e)
  } finally {
    console.log(blogResp)
  }

  blogResp.data.data.forEach((item)=>{
    blogTableData.push(item)
  })
}

function filterState(value, row, column) {
  const property = column['property'];
  return row[property] === value;
}

function createBlog() {
  router.push('/blog/publish')
}

onMounted(()=>{
  getBlogTableData();
})

</script>

<style scoped lang="scss">

</style>