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
        <el-select class="blog-select" v-model="blogTableFilters.publishedState" :placeholder="'选择文章发布状态'">
          <el-option value="all" label="全部"></el-option>
          <el-option value="done" label="已发布"></el-option>
          <el-option value="still" label="未发布"></el-option>
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
        <el-table style="height: 100%" stripe :data="filteredBlogTableData">

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

import {reactive, ref, onMounted, computed} from 'vue'
import {Refresh, Search} from "@element-plus/icons-vue";
import router from '@/router/index'

import axios from "axios";

interface BlogTableProp {
  title: string,
  description: string,
  author: string,
  createdTime: string,
  lastUpdatedTime: string,
  publishedState: string,
  tags: string,
  remark: string,
}

interface BlogTableResp {
  data: BlogTableProp[]
}

const getBlogInformationState = ref(false);

const blogSelect = ref()

const blogTableProp = reactive([
  {prop:'title' , showState:false},
  {prop:'description' , showState:false},
  {prop:'author' , showState:false},
  {prop:'createdTime' , showState:false},
  {prop:'publishedState' , showState:true},
  {prop:'tags' , showState:false},
  {prop:'remark' , showState:false},
  {prop:'lastUpdatedTime' , showState:false},
])

const blogTableFilters = reactive<BlogTableProp>({
  publishedState: '',
  title: '',
  description: '',
  author: '',
  createdTime: '',
  lastUpdatedTime: '',
  tags: '',
  remark: '',
})


const blogTableData = reactive<BlogTableProp[]>([])

//首先获取表格数据
async function getBlogTableData() {

  const blogReqConfig = {
    method: 'get',
    url: 'http://127.0.0.1:3000/api/v1/blog/get',
  };

  let blogResp: BlogTableResp =  {data: [ {title:'',description:'',author:'',createdTime:'',lastUpdatedTime:'',publishedState:'',tags:'',remark:''} ] };
  try {
    const response = await axios(blogReqConfig)

    //解构赋值即可！
    blogResp = {data: response.data}
    console.log("response",response)
    console.log("blogResp",blogResp)
  } catch (e) {
    console.log(e)
  } finally {
    console.log(blogResp)
  }

  //将获取到的数据替换到表格数据中
  blogTableData.splice(0, blogTableData.length, ...blogResp.data)
  console.log("BlogTableData ",blogTableData)
}

//实时计算出过滤后的表格数据
//数据量很大的情况下，这样做会不会有性能问题？
const filteredBlogTableData = computed(()=>{
  console.log("blogTableFilters.publishedState",blogTableFilters.publishedState)
  //如果是全部状态，直接返回所有数据
  if(String(blogTableFilters.publishedState) === 'all' || blogTableFilters.publishedState === ''){
    return blogTableData
  }else {
    return blogTableData.filter((item)=>{
      //return item.publishedState === blogTableFilters.publishedState
      if(String(item.publishedState) === 'true'){
        return String(blogTableFilters.publishedState) === 'done'
      }else {
        return String(blogTableFilters.publishedState) === 'still'
      }
    })
  }

})

function createBlog() {
  router.push('/blog/publish')
}

onMounted(()=>{
  getBlogTableData();
})

</script>

<style scoped lang="scss">

</style>