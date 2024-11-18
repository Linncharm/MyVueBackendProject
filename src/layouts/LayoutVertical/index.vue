<!--这是纵向布局-->
<template>
  <el-container class="layout">

    <el-aside>
      <div class="aside-box" :style="{width : isCollapse ? '65px' : '210px' }">

        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo"/>
          <span v-show="!isCollapse" class="logo-text">{{ title }}</span>
        </div>

      <el-scrollbar>
        <div class="menu-container">
          <el-menu
              :router="false"
              :collapse="isCollapse"
              :collapse-transition="false"
          >
            <SubMenu :menu-list="menuList"></SubMenu>
          </el-menu>
          <el-button @click="addSubMenuItem" class="centered-button">
            <el-icon>
              <component :is="Edit" />
            </el-icon>
            <span v-show="!isCollapse">Add new item</span>
          </el-button>
        </div>
      </el-scrollbar>


      </div>
    </el-aside>

    <el-container>
      <el-header>
        <el-link
            type="primary"
            @click="isCollapse=!isCollapse"
        >
          <el-icon class="btn-icon">
            <component :is="isCollapse?'DArrowRight':'DArrowLeft'" />
          </el-icon>
        </el-link>
      </el-header>

      <Main/>

    </el-container>
  </el-container>

  <el-dialog
    v-model="dialogVisible"
    align-center
    width="50%"
    title="Add new item"
    :before-close="handleClosed"
  >
    <el-form>
      <el-form-item>
        <el-select placeholder="选择item添加位置" v-model="itemForm.type">
          <el-option label="Place in Menu" value="menu"/>
          <el-option label="Place in Submenu" value="submenu"/>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
        ref="formRef"
        v-model="itemForm"
        :rules="itemFormRules"
        v-if="itemForm.type === 'menu'">
      <el-form-item prop="title" label="Title" >
        <el-input v-model="itemForm.title" placeholder="Please enter the item title"/>
      </el-form-item>
      <el-form-item prop="index" label="Index">
        <el-select v-model="itemForm.index" placeholder="Please choose the index (The place put item)">
          <el-option
              v-for="(item,index) in showMenuListLength+1"
              :label="index"
              :key="item"
              :value="index"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="path" label="Path">
        <el-input v-model="itemForm.path" placeholder="Please enter the path"/>
      </el-form-item>
    </el-form>
    <el-form v-else-if="itemForm.type === 'submenu'">
        <el-form-item label="Title">
          <el-input v-model="itemForm.title" placeholder="Please enter the title"/>
        </el-form-item>
        <el-form-item label="Path">
          <el-input v-model="itemForm.path" placeholder="Please enter the path"/>
        </el-form-item>

    </el-form>
    <template #footer>
      <el-button @click="dialogVisible=false">Cancel</el-button>
      <el-button type="primary" @click="dialogConfirm(itemForm)">Confirm</el-button>
    </template>

  </el-dialog>

</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus"
import {computed, reactive, ref} from "vue";
import {useGlobalStore} from "@/stores/modules/global";
import {storeToRefs} from "pinia";
import { tempRouter } from "@/router/modules/tempRouter";
import SubMenu from "@/layouts/Major/Submenu/SubMenu.vue";
import Main from "@/layouts/Major/Main/index.vue"
import {Edit} from "@element-plus/icons-vue";

const title = import.meta.env.VITE_APP_TITLE
const globalStore = useGlobalStore();
//const isCollapse = computed(() => globalStore.isCollapse );
const {isCollapse} = storeToRefs(globalStore)

const { showMenuListLength } = storeToRefs(globalStore)

const formRef = ref<FormInstance>()

/*const confirmButton = {
  type: 'primary',
}*/

const itemForm =reactive({
  type:'',
  title:'',
  index:'',
  path:''
})

const itemFormRules ={
  title: [{ required: true, message: 'Please enter the item title', trigger: 'blur' }],
  index: [{ required: true, message: 'Please enter the index', trigger: 'change' }],
  path: [{ required: true, message: 'Please enter the path', trigger: 'blur' }]
}

const dialogVisible = ref(false);
const handleClosed = (done: ()=>void)=> {
  console.log("handleClosed");
  itemForm.type = '';
  done();
}

function dialogConfirm(itemForm:any){
  console.log("dialogConfirm", itemForm);
  if(!itemForm.type && itemForm.title && itemForm.index && itemForm.path){
    return;
  }
  if(itemForm.type === 'menu'){
    const transformedItem =  {
        path: itemForm.path,
        name: itemForm.title,
        component: ()=>import('@/views/about/index.vue'),
        meta: {
          title: itemForm.title,
          icon: 'UserFilled'
        }
      }
    console.log("transformedItem", transformedItem);
    globalStore.addMenuItem(transformedItem, itemForm.index);
  }else if(itemForm.type === 'submenu'){
    console.log("will add submenu item");
  }
  dialogVisible.value = false;

}

function addSubMenuItem(){
  dialogVisible.value = true;
}



console.log("Layout isCollapse", isCollapse);

//由computed计算出的是响应式数据
const menuList = computed(() => globalStore.showMenuList);
console.log("menuList", menuList.value);  //Proxy(Array)
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>