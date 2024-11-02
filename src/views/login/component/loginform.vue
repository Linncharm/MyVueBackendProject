<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">

    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="Username: admin/user">

        <template #prefix>
          <el-icon class="el-input__icon">
            <user/>
          </el-icon>
        </template>

      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="Password: 123456" show-password autocomplete="new-password">

        <template #prefix>
          <el-icon class="el-input__icon">
            <lock/>
          </el-icon>
        </template>

      </el-input>
    </el-form-item>


  </el-form>
</template>



<script setup lang="ts">
//引入Login接口
import {Login} from "@/api/interface";

import {ref,reactive,onMounted,onBeforeUnmount} from "vue";
import {useRouter} from "vue-router";
import {HOME_URL} from "@/config/constants";
import {ElNotification} from "element-plus";
//import type 为导入类型声明
import type {ElForm} from "element-plus";
import md5 from "md5"
import {Lock, User} from "@element-plus/icons-vue";

const loginRules=reactive({
  //required 代表必填  trigger为blur代表在输入框失去焦点时验证
  userName:[{required:true,message:"Enter the username",trigger:"blur"}],
  password:[{required:true,message:"Enter the password",trigger:"blur"}]
})


//loginForm的结构符合Login.RequestLoginForm的类型
const loginForm = reactive<Login.RequestLoginForm>({
  username:"",
  password:"",
})
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>