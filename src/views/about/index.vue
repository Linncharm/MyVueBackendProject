<template>
  <div class="about-main">
    <div class="about-information">
      <el-card>
      </el-card>
    </div>
    <div class="about-latest-commit">
      <el-card>
        <div class="committer-container">
          <div class="committer-title">
            <span style="margin-bottom: 2px"> 🍉 Show the latest 5 records of commit </span>

            <el-tooltip content="Backend Project repository set as default" placement="top">
              <el-select class="branch-select" placeholder="Select repo" v-model="repoInformation">
                <el-option
                    v-for="item in repoData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                />
              </el-select>
            </el-tooltip>
            <el-tooltip content="Main branch set as default" placement="top">
              <el-select class="branch-select" placeholder="Select branch" v-model="commitBranchInformation">
                <el-option
                    v-for="item in branchData"
                    :key="item.name"
                    :value="item.name"
                    :label="item.name"
                />
              </el-select>
            </el-tooltip>

            <el-button class="committer-button" @click="resetCommitInformation">
              <span>Reset</span>
              <el-icon :class="getCommitInformationState ? 'is-loading' : '' ">
                <Refresh/>
              </el-icon>
            </el-button>
          </div>
          <div class="committer-body">
            <el-scrollbar max-height="300px">
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
            </el-scrollbar>

          </div>
          <div class="committer-footer">
            <el-select
              v-model="perPage"
              placeholder="Choose per_page number"
            >
              <el-option :value=5 label="5 commits per page"></el-option>
              <el-option :value=10 label="10 commits per page"></el-option>
              <el-option :value=15 label="15 commits per page"></el-option>
              <el-option :value=20 label="20 commits per page"></el-option>
              <el-option :value=25 label="25 commits per page"></el-option>
            </el-select>
            <el-pagination
                :page-size="perPage"
                :total="totalRecords"
                :current-page="currentPage"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
    </div>
    <div class="about-usage">
      <el-card>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { Octokit } from "octokit";
import {Refresh} from "@element-plus/icons-vue";
import NProgress from "@/config/nprogress";
import { ElMessage } from "element-plus";
import * as process from "node:process";

const tableData = ref([]);
const repoData = ref([]);
const branchData = ref([]);

const currentPage = ref(1);
const perPage = ref(5);

//总条目数
const totalRecords = ref(0);

const repoInformation = ref('');
//是否改变了总条目数
const isTotalRecordChanged = ref(false);

const octokit = new Octokit({
  //my github token
  auth:process.env.GITHUB_TOKEN,
  request: {
    timeout: 500
  }
})

const commitBranchInformation = ref('');

const getCommitInformationState = ref(false);

function handleCurrentChange(page: number){
  console.log("page",page)
  currentPage.value = page;
  getCommitInformation();
}


//一百多行的函数，不太好，应该拆分 try catch finally 嵌套过多 ，待优化
async function getCommitInformation(){
    //不能使用const resp = ...
    //The resp variable is declared inside the try block, so it is not accessible in the finally block
    let resp:any;
    let respRepo:any;
    let respBranch:any;
    try{
      getCommitInformationState.value = true;
      NProgress.start();
      resp = await octokit.request('GET /repos/{owner}/{repo}/commits',{
        owner:'Linncharm',
        repo: repoInformation.value || 'MyVueBackendProject',
        sha:commitBranchInformation.value || 'main',
        per_page:perPage.value || 5,
        page:currentPage.value,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        },
      })

      if(resp.status === 403)  console.error("403 Forbidden 错误：可能是速率限制或权限不足导致。");
      // .then(()=>{
      //   console.log("respData",resp)
      // })
    }
    catch (e){
      getCommitInformationState.value = false;
      ElMessage.error("Check the network")
      NProgress.done();
      console.error("github api went wrong",e)
    }
    finally {
      console.log("respData",resp)
      getCommitInformationState.value = false;
      try {
        //如何只让这个加载一次？
          if(repoData.value.length === 0){
            if(!respRepo){
              respRepo = await octokit.request('GET /users/Linncharm/repos', {
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
            }
          }
      }
      catch (e) {
        getCommitInformationState.value = false;
        ElMessage.error("Repo information went wrong")
        NProgress.done();
        console.error("github api went wrong",e)
      }
      finally {
        //若为undefined说明已经加载过了
        console.log("respRepo",respRepo)
        try{
          respBranch = await octokit.request('GET /repos/{owner}/{repo}/branches', {
            owner: 'Linncharm',
            repo: repoInformation.value || 'MyVueBackendProject',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        }
        catch (e) {
          getCommitInformationState.value = false;
          ElMessage.error("Branch information went wrong")
          NProgress.done();
          console.error("github api went wrong",e)
        }
        finally {
          console.log("respBranch",respBranch)
        }
      }
      NProgress.done();
    }

    //获取commit信息
    tableData.value = resp.data.map((item:any) => {
      return {
        date: convertDate(item.commit.committer.date),
        name: item.commit.committer.name,
        content: capitalizeFirstLetter(item.commit.message),
        avatar: item.committer.avatar_url,
      }
    })

  //获取repo信息,根据 create-time 降序排序,同时去除不是自己的项目
  if(repoData.value.length === 0){
    repoData.value = respRepo.data
        .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .filter((item:any) => !item.fork)
        .map((item: any) => {
          return {
            name: item.name,
          };
        });
  }

    //获取repo信息
    branchData.value = respBranch.data.map((item:any) => {
      return {
        name:item.name,
      }
    })



  //获取总条目数
  if(!isTotalRecordChanged.value){
    totalRecords.value = resp.headers.link ?
        Number([...resp.headers.link.matchAll(/&page=(\d+)>; rel="last"/g)][0]?.[1]) * perPage.value : 1 ;
    console.log("totalRecords",totalRecords.value)  //10 correctly returned
    isTotalRecordChanged.value = true;
  }

}


function resetCommitInformation(){
  currentPage.value = 1;
  isTotalRecordChanged.value = false;
  getCommitInformation();
}

watch(
    ()=>repoInformation.value + commitBranchInformation.value + perPage.value,
    ()=>{
      resetCommitInformation();
    }
)

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