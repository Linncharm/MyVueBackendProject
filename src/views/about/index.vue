<template>
  <div class="about-main">
    <div class="about-information">
      <el-card>
        <p>111</p>
      </el-card>
    </div>
    <div class="about-latest-commit">
      <el-card class="committer-body">
        <div class="committer-title">
          <span> 🍉 Show the latest 5 records of commit </span>
          <el-button class="committer-button" @click="resetCommitInformation">
            <span>Reset</span>
            <el-icon style="margin-left: 1.5px" :class="getCommitInformationState ? 'is-loading' : '' ">
              <Refresh/>
            </el-icon>
          </el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" empty-text="No data yet">
          <el-table-column prop="date" label="Latest Day" width="180"></el-table-column>
          <el-table-column label="Commiter" width="180">
            <template #default="{ row }">
              <div style="display: flex; align-items: center ; font-weight: bold">
                <el-avatar :src="row.avatar" shape="square" size="small" style="margin-right: 8px"></el-avatar>
                <span class="committer-name">
                  {{ row.name }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="Content"></el-table-column>
        </el-table>
        <el-pagination style="margin-top: 10px ; scale: 90%"
          :page-size="perPage"
          :total="totalRecords"
          :current-page="currentPage"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        />
      </el-card>
    </div>
    <div class="about-usage">
      <el-card>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted , ref} from "vue";
import { Octokit } from "octokit";
import {Refresh} from "@element-plus/icons-vue";
import NProgress from "@/config/nprogress";
import { ElMessage } from "element-plus";

const tableData = ref([]);

const currentPage = ref(1);
const perPage = ref(5);

//总条目数
const totalRecords = ref(0);

const octokit = new Octokit({
  //my github token
  auth:import.meta.env.VITE_GITHUB_TOKEN,
  request: {
    timeout: 500
  }
})

const getCommitInformationState = ref(false);

function handleCurrentChange(page: number){
  console.log("page",page)
  currentPage.value = page;
  getCommitInformation();
}

async function getCommitInformation(){
    //不能使用const resp = ...
    //The resp variable is declared inside the try block, so it is not accessible in the finally block
    let resp:any;
    try{
      getCommitInformationState.value = true;
      NProgress.start();
      resp = await octokit.request('GET /repos/{owner}/{repo}/commits',{
        owner:'Linncharm',
        repo:'MyVueBackendProject',
        per_page:perPage.value,
        page:currentPage.value,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
      })
      // .then(()=>{
      //   console.log("respData",resp)
      // })
    }catch (e){
      getCommitInformationState.value = false;
      ElMessage.error("Check the network")
      NProgress.done();
      console.error("github api went wrong",e)
    }finally {
      getCommitInformationState.value = false;
      NProgress.done();
      console.log("respData",resp)
    }

    tableData.value = resp.data.map((item:any) => {
      return {
        date: convertDate(item.commit.committer.date),
        name: item.commit.committer.name,
        content: capitalizeFirstLetter(item.commit.message),
        avatar: item.committer.avatar_url,
      }
    })

    totalRecords.value = resp.headers.link ?
        Number([...resp.headers.link.matchAll(/&page=(\d+)>; rel="last"/g)][0]?.[1]) * perPage.value : 1 ;
    console.log("totalRecords",totalRecords.value)  //10 correctly returned
}

function resetCommitInformation(){
  currentPage.value = 1;
  getCommitInformation();
}

onMounted(()=>{
  getCommitInformation();
})

function capitalizeFirstLetter(originString:string){
  return originString.slice(0,1).toUpperCase() + originString.slice(1)
}

function convertDate(originDate:string){
  const morning = '☀️';  //7-12
  const afternoon = '🌤️';  //12-18
  const evening = '🌙';    //18-24
  const midnight = '🌑';   //0-8
  const year = originDate.slice(2,4);
  const month = originDate.slice(5,7);
  let hour = Number(originDate.slice(11,13))+8;  // 转换为北京时间
  let day = Number(originDate.slice(8,10));
  const minute = originDate.slice(14,16);
  const second = originDate.slice(17,19);

  if(hour > 24){
    hour -= 24;
    day += 1;
  }
  const prefixEmoji = hour >= 7 && hour < 12 ? morning : hour >= 12 && hour < 18 ? afternoon : hour >= 18 && hour < 24 ? evening : midnight;
  return `${prefixEmoji} ${year}/${month}/${day} ${hour}:${minute}:${second}`
}

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>