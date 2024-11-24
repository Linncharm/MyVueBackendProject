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
        <el-select class="blog-select" v-model="blogTableFilters.publishFilterModel" :placeholder="'选择文章发布状态'">
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
                <!-- 这里的:before-change必须是回调函数的类型，这样才能在改变时触发 -->
                <el-switch
                    v-if="item.showState"
                    v-model="scope.row.publishAction"
                    style="--el-switch-on-color: #13ce66"
                    :before-change="() => handleBeforeChange(scope.row.id, scope.row.publishAction)"
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
    <div>
      <el-dialog
          v-model="publishConfirmDialogVisible"
      >
        <template #header>
          <div style="display: flex;flex-direction:row;justify-content: center">
            <span> {{ publishText }} </span>
          </div>
        </template>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="publishBlogCancel">取消</el-button>
            <el-button type="primary" @click="isPublishBlog(singleBlogActionState)">确认</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script setup lang="ts">

import {reactive, ref, onMounted, computed} from 'vue'
import {Refresh, Search} from "@element-plus/icons-vue";
import router from '@/router/index'

import axios from "axios";

interface BlogTableProp {
  id: number,
  title: string,
  description: string,
  author: string,
  createdTime: string,
  lastUpdatedTime: string,
  publishState: number,
  publishAction: boolean
  tags: string,
  remark: string,
  category: string
}

interface BlogTableResp {
  data: BlogTableProp[]
}

interface BlogFilterProp {
  publishFilterModel: string
}

const getBlogInformationState = ref(false);

//table中的展示列
const blogTableProp = reactive([
  {prop:'title' , showState:false},
  {prop:'description' , showState:false},
  {prop:'author' , showState:false},
  {prop:'createdTime' , showState:false},
  {prop:'publishState' , showState:true},
  {prop:'tags' , showState:false},
  {prop:'remark' , showState:false},
  {prop:'lastUpdatedTime' , showState:false},
])

const blogTableFilters = reactive<BlogFilterProp>({
  publishFilterModel: '',
})




const blogTableData = reactive<BlogTableProp[]>([])

//首先获取表格数据
async function getBlogTableData() {

  const blogReqConfig = {
    method: 'get',
    url: 'http://127.0.0.1:3000/api/v1/blog/get',
  };

  //为什么publishState会变为false?问题在于publishState绑定到了switch的model上，而switch的model是Boolean类型，只有ture和false两种类型
  let blogResp: BlogTableResp =  {data: [ {id:0,title:'',description:'',author:'',createdTime:'',lastUpdatedTime:'',publishState:0,tags:'',remark:'',category:'',publishAction:false} ] };
  try {
    const response = await axios(blogReqConfig)

    console.log("response",response)
    //解构赋值即可！
    // blogResp = {data: response.data.map((item: BlogTableProp)=>{
    //   return {...item, publishAction: item.publishState === 1}
    // })};
    blogResp = {data: response.data};
    // 深拷贝（使用 JSON 方法）
    //blogResp = {data: JSON.parse(JSON.stringify(response.data))};
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
  console.log("blogTableFilters.publishState",blogTableFilters.publishFilterModel)
  //如果是全部状态，直接返回所有数据
  if(String(blogTableFilters.publishFilterModel) === 'all' || blogTableFilters.publishFilterModel === ''){
    return blogTableData
  }else {
    return blogTableData.filter((item)=>{
      //return item.publishState === blogTableFilters.publishState
      if(item.publishState === 1){
        return String(blogTableFilters.publishFilterModel) === 'done'
      }else {
        return String(blogTableFilters.publishFilterModel) === 'still'
      }
    })
  }

})

/* 以下是博客发布的逻辑 */
const publishText = ref('确认发布');
const CancelPublishText = ref('取消发布');
const publishConfirmDialogVisible = ref(false);

//从开到关或者关到开都要提示

/*let getId = () => {}*/
//可以封装这个闭包

let createGetID = ()=>{
  //设置id默认值
  let id: number=-1;
  return {
    setID: (newID: number) => {
      id = newID;
    },
    getID(){
      return id;
    }
  }
}

const getIdHandler = createGetID();
//单一博客操作的状态，用于判断是发布还是取消发布，由handleBeforeChange设置
//后续如果需要在其他组件使用这个状态可以考虑迁移至pinia
const singleBlogActionState = ref(false);



function handleBeforeChange(id: number,action: boolean) {

  //获取这条博客的id并传递给confirm，通过闭包将id传递出去，避免污染全局作用域
  getIdHandler.setID(id);
  singleBlogActionState.value = action;
  publishConfirmDialogVisible.value = true;

  //此处可以返回一个Promise，如果返回false，switch就不会切换，结合弹窗使用
  //需要实现和isPublishBlog的异步逻辑
  return new Promise((resolve, reject) => {

    //确认分为成功确认和失败确认
    const onDialogConfirm = () => {

      resolve(true); // 用户点击确定，resolve为true
    };

    const onDialogCancel = () => {
      resolve(false); // 用户点击取消，resolve为false
    };

  });
}

function publishBlogCancel() {
  console.log("cancelPublishBlog")
  publishConfirmDialogVisible.value = false;
}

//当确定发布时，向后端提交请求，将发布状态(publishState)改为1/0
//此处的action是switch before-change前的状态, false表示从关到开，对应发布操作
//可以尝试直接将这个合并到handleBeforeChange中
async function isPublishBlog(action: boolean) {
  //通过闭包从handleBeforeChange中获取到id
  const blogID = getIdHandler.getID();
  console.log("isPublishBlog", blogID, action)
  try{
    const a = setTimeout(()=>{
      console.log("setTimeout")
    },1000)
  }catch (e){

  }finally {
    publishConfirmDialogVisible.value = false;
  }
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