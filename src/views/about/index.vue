<template>
  <div class="about-main">
    <div class="about-information">
      <el-card>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
      </el-card>
    </div>
    <div class="about-latest-commit">
      <el-card>
        <span class="committer-title"> Show the latest 5 records of commit </span>
        <el-button>
          <span>Reset</span>
          <el-icon>
            <Loading/>
          </el-icon>
        </el-button>
        <el-table :data="tableData" border style="width: 100%" empty-text="No data yet">
          <el-table-column prop="date" label="Latest Day" width="180"></el-table-column>
          <el-table-column label="Commiter" width="180">
            <template #default="{ row }">
              <div style="display: flex; align-items: center">
                <el-avatar :src="row.avatar" size="small" style="margin-right: 8px"></el-avatar>
                <span class="committer-name">
                  {{ row.name }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="Content"></el-table-column>
        </el-table>
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
import axios from "axios";
import { Octokit } from "octokit";
import {Loading, Star} from "@element-plus/icons-vue";
const tableData = ref([]);

const octokit = new Octokit({
  //my github token
  auth:import.meta.env.VITE_GITHUB_TOKEN
})

onMounted(async () => {

  //不能使用const resp = ...
  //The resp variable is declared inside the try block, so it is not accessible in the finally block
  let resp:any;
  try{
    resp = await octokit.request('GET /repos/{owner}/{repo}/commits',{
      owner:'Linncharm',
      repo:'MyVueBackendProject',
      per_page:5,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
    })
        // .then(()=>{
        //   console.log("respData",resp)
        // })
  }catch (e){
    console.error("github api went wrong",e)
  }finally {
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
})

function capitalizeFirstLetter(originString:string){
  return originString.slice(0,1).toUpperCase() + originString.slice(1)
}

function convertDate(originDate:string){
  const year = originDate.slice(0,4);
  const month = originDate.slice(5,7);
  const day = originDate.slice(8,10);
  const hour = Number(originDate.slice(11,13))+8;  // 转换为北京时间
  const minute = originDate.slice(14,16);
  const second = originDate.slice(17,19);
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>