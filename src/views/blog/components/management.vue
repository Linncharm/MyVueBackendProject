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
              v-for="item in blogTableProp"
              :prop="item.prop"
              :label="item.prop"
              :filter-method="filterState()"
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

import {reactive, ref} from 'vue'
import {Refresh, Search} from "@element-plus/icons-vue";
import router from '@/router/index'

const getBlogInformationState = ref(false);

const blogSelect = ref()

// const blogTableData = reactive([
//   { label:'文章标题' , prop:'title' , title:['Article one','Article two','Article three','Article four','Article five','Article six','Article seven'] },
//   { label:'文章描述' , prop:'description' , description:['test 1','test 2','test 3','test 4','test 5','test 6','test 7'] },
//   { label:'作者' , prop:'author' , author:['AAA','BBB','CCC','DDD','EEE','FFF','GGG'] },
//   { label:'创建时间' , prop:'createTime' , creatTime:['2024-11-08T15:08:43Z','2024-11-08T15:08:43Z']},
//   { label:'发布状态' , prop:'publishedState' , publishedState:[false,false,false,false,false,false,false] },
//   { label:'标签' , prop:'tag' ,tag:['default tag','default tag','default tag','default tag','default tag','default tag','default tag'] },
//   { label:'备注' , prop:'remark' , remark:['remark test','remark test','remark test','remark test','remark test','remark test','remark test'] },
// ])

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

const blogTableData = reactive([
  { title:'Article one' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
  { title:'Article two' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
  { title:'Article three' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
  { title:'Article four' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
  { title:'Article five' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
  { title:'Article six' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
  { title:'Article seven' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
  { title:'Article eight' , description:'test 1' , author:'AAA' ,createTime:"2024-11-08T15:08:43Z" , lastUpdatedTime:"2024-11-08T15:08:43Z" , publishedState:false , tag:'default tag' , remark:'remark test'},
])

function filterState(value, row, column) {
  const property = column['property'];
  return row[property] === value;
}

function createBlog() {
  router.push('/blog/publish')
}

async function requestBlogInformation(){
  console.log("blog information is pending")
}

</script>

<style scoped lang="scss">

</style>