<template>
  <div class="vditor-container">
    <div id="vditor"></div>
    <el-dialog
        title="保存文章"
        v-model="blogDialogVisible"
        width="80%"
        height="90%"
    >
      <span>This is a message</span>
        <el-form :model="blogPublishForm" class="blog-publish-form" :rules="blogPublishFormRules">
            <div class="blog-publish-form-input-group">
              <el-form-item
                  v-for="(item,index) in formOption"
                  :key="item.prop"
                  :prop="item.prop"
                  style="width: 45%; margin-top: 10px"
              >
                <el-input v-model="blogPublishForm[item.model]" :placeholder="item.placeholder"></el-input>
              </el-form-item>
              <el-select
                  style="width: 45%; margin-top: 10px"
                  placeholder="请选择文章分类"
                  v-model="blogPublishForm.category"
              >
                <el-option value="zh" label="中文文章"></el-option>
                <el-option value="en" label="英文文章"></el-option>
              </el-select>
              <el-select
                  style="width: 45%; margin-top: 10px"
                  placeholder="请选择文章标签"
                  v-model="blogPublishForm.tags"
                  multiple
              >
                <el-option v-for="item in tagStorage"
                  :label="item"
                  :value="item"
                >

                </el-option>
                <template #footer>
                  <el-button text bg size="small" @click="onAddOption">
                    <span> 添加一个标签 </span>
                    <el-icon style="margin-left: 5px">
                      <DocumentAdd/>
                    </el-icon>
                  </el-button>
                </template>
              </el-select>
            </div>

        </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="blogDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="saveToList">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      title="添加标签"
      v-model="addTagVisible"
      width="40%"
      align-center
    >
      <template #header>
        <div style="display: flex;flex-direction:row;justify-content: center">
          <span> 添加标签 </span>
        </div>

      </template>
        <div class="addTagForm" v-for="(item,index) in tagFormNumber">
          <div class="addTagRowGroup" :key="index">
            <el-input
                style="width: 60%;"
                placeholder="添加标签"
                v-model="tempTagsStorage[index]"
                maxlength="10"
                show-word-limit
            >

            </el-input>
            <el-tooltip content="增加新输入框">
              <el-button @click="modifiedTagFormNumber(1)">
                <el-icon>
                  <Plus/>
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="减少新输入框">
              <el-button @click="modifiedTagFormNumber(-1)" style="margin-left: 0">
                <el-icon>
                  <Minus/>
                </el-icon>
              </el-button>
            </el-tooltip>

          </div>
        </div>
      <template #footer>
        <div class="addTag-dialog-footer">
          <el-button @click="addTagVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addTagConfirm">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>


</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import {DocumentAdd, Minus, Plus, Setting} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const blogPublishFormRules = reactive({
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
  ],
})

const  tagFormNumber = ref(1)

const formOption = reactive([
    { prop: "title", placeholder: "请输入文章标题", model: "blogPublishForm.title" },
    { prop: "author", placeholder: "请输入文章作者", model: "blogPublishForm.author" },
    { prop: "description", placeholder: "请输入文章描述", model: "blogPublishForm.description" },
    { prop: "remark", placeholder: "请输入文章备注", model: "blogPublishForm.remark" },
])

function modifiedTagFormNumber(num){
  if(num===-1 && tagFormNumber.value===1) {
    ElMessage.warning('不能再删除了！');
    return;
  }
  if(num===1 && tagFormNumber.value >= 5) {
    ElMessage.warning('不能再添加了！');
    return;
  }

  tagFormNumber.value += num
}

const tempTagsStorage = ref([])
const tagStorage = ref(['默认标签']);

function saveToList(){
  blogDialogVisible.value = false
}

function addTagConfirm() {
  tagStorage.value = Array.from(new Set([...tagStorage.value, ...tempTagsStorage.value]));
  tempTagsStorage.value = []; // Clear tempTagsStorage
  addTagVisible.value = false;
}

const blogPublishForm = ref({
  title: "",
  author: "",
  description: "",
  tags: [],

  remark:"",
  category: "",
  content: "",
})

const delay = ref(100);

defineProps({
  content: {
    type: String,
    default: "",
  },
});

defineEmits(["update:content"]);

const blogDialogVisible = ref(false);
const addTagVisible = ref(false)

function onAddOption(){
  addTagVisible.value=true
}

function loadVditor() {
  console.log("Vditor mounted");
  const vditor = new Vditor("vditor", {
    height: "90%",
    width: "100%",
    mode: "sv",
    toolbar: [
      {
        name: "save",
        tip: "保存文章",
        tipPosition: "s",
        className: "right",
        //icon的svg设置，直接从svg文件里面复制即可
        icon: '<?xml version="1.0" ?><svg height="32" viewBox="-3 3 40 40" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path d="M10 8v4h28v-4h-28zm0 20h8v12h12v-12h8l-14-14-14 14z"/></svg>',
        click: () => {
          //需要用div包裹el-dialog，否则会报错，因为组件根节点为非dom节点
          blogDialogVisible.value = true;
          console.log("blogDialogVisible", blogDialogVisible.value);
        },
      },
      "|",
      "emoji",
      "headings",
      "bold",
      "italic",
      "strike",
      "link",
      "|",
      "list",
      "ordered-list",
      "check",
      "outdent",
      "indent",
      "|",
      "quote",
      "line",
      "code",
      "inline-code",
      "insert-before",
      "insert-after",
      "|",
      "upload",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullscreen",
      "edit-mode",
      {
        name: "more",
        toolbar: [
          "both",
          "code-theme",
          "content-theme",
          "export",
          "outline",
          "preview",
        ],
      },
      /*{
        name: "customize",
        tip: "自定义工具栏",
        className: "right",
        icon: Setting,
        click:()=>{
          console.log("customize");
          //alert("输入自定义的debounce时间，单位毫秒");
          const input = prompt("输入自定义的debounce时间，单位毫秒", delay.value);

          const newDelay = parseInt(input, 10);
          if (!isNaN(newDelay) && newDelay > 0) {
            delay.value = newDelay;
            alert(`新的 debounce 时间已设置为：${newDelay} 毫秒`);
          } else {
            alert("请输入有效的正整数！");
          }
          console.log("delay", delay.value);
        },
      }*/
    ],
    preview: {
      //预览 debounce 毫秒间隔
      delay: delay.value,
      mode: "both",
      //暂时不知道有什么用
      actions: ["desktop"],
      theme: {}
    },
    counter: {
      enable: true,
    },
    resize: {
      enable: true,
      position: "top",
    },
    theme: "classic",
  });
}
  //vditor.setTheme("dark");
  //setTipPositionForAllTools(toolbar, 's');
//vditor.setTheme("dark");
/*

const setTipPositionForAllTools = (tools, position) => {
  tools.forEach((tool, index) => {
    if (typeof tool === "object" && tool !== null) {
      // 设置 tipPosition
      tool.tipPosition = position;
    }
  });
  console.log("setTipPositionForAllTools", tools);
};
*/


onMounted(() => {
  loadVditor();
})

</script>

<style>
@import "vditor/dist/index.css";
@import "./index.scss";
</style>
