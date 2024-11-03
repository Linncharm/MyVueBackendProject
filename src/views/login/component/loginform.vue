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

  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> Reset </el-button>
    <el-button
        :icon="UserFilled"
        round size="large"
        :loading="loading"
        type="primary"
        @click="login(loginFormRef)">
      Login
    </el-button>
  </div>
</template>



<script setup lang="ts">
//引入Login接口
import {Login} from "@/api/interface";
import {CircleClose,UserFilled} from "@element-plus/icons-vue";
import {ref,reactive,onMounted,onBeforeUnmount} from "vue";
import {HOME_URL} from "@/config/constants";
import {ElNotification, type FormInstance} from "element-plus";
//import type 为导入类型声明
import type {ElForm} from "element-plus";
import md5 from "md5"
import {Lock, User} from "@element-plus/icons-vue";
import {loginApi} from "@/api/modules/login";
import router from "@/router";
import useUserStore from "@/stores/modules/user";
import {initDynamicRouter} from "@/router/modules/dynamicRouter";

//FormInstance将代表ElForm的组件实例类型
type FormInstance = InstanceType<typeof ElForm>;

const userStore = useUserStore();

//一个响应式引用对象，类型为FormInstance
const loginFormRef = ref<FormInstance>();

const loading = ref(false);

const loginRules=reactive({
  //required 代表必填  trigger为blur代表在输入框失去焦点时验证
  username:[{required:true,message:"Enter the username",trigger:"blur"}],
  password:[{required:true,message:"Enter the password",trigger:"blur"}]
})


//loginForm的结构符合Login.RequestLoginForm的类型
const loginForm = reactive<Login.RequestLoginForm>({
  username:"",
  password:"",
})

//-------登录-------
const login = (form: FormInstance | undefined) => {
  //如果为空直接返回
  if(!form){
    return;
  }
  //validate会根据loginRule的规则进行验证
  form.validate(async (valid) => {
    if(!valid){
      return;
    }
    loading.value = true;

    try{
      //1. -------登录接口--------
      // 注意，这里使用的是静态验证，如果要使用http的get方法则要await
      const allData = loginApi({...loginForm, password: md5(loginForm.password)});
      console.log("allData",allData);
      const {data,msg} = allData;
      console.log("data",data);
      userStore.setToken(data.access_token);



      //2. -------初始化路由-------
      //根据传递的msg值来决定弹窗的内容
      initDynamicRouter(msg);

      //3. -------跳转首页--------
      //router.push(HOME_URL);

      //4. ------弹窗通知------
      ElNotification({
        title: "Success to Login",
        message: " Welcome to Home ",
        type: "success",
        duration: 3000,
      })
    }finally{
      loading.value = false;
    }
  });
};

//重置表单
//接收一个表单实例或者undefined值
const resetForm = (form: FormInstance | undefined ) => {
  if(!form){
    return;
  }
  form.resetFields();
}

</script>

<style scoped lang="scss">
@import "@/views/login/index.scss";
</style>