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
        <el-form :model="blogPublishForm" class="blog-publish-form">
          <el-form-item>
            <div class="blog-publish-form-input-group">
              <el-input v-model="blogPublishForm.title" placeholder="请输入文章标题" style="width: 45%; margin-top: 10px"></el-input>
              <el-input v-model="blogPublishForm.author" placeholder="请输入文章作者" style="width: 45%; margin-top: 10px"></el-input>
              <el-input v-model="blogPublishForm.description" placeholder="请输入文章描述" style="width: 45%; margin-top:10px"></el-input>
              <el-input v-model="blogPublishForm.remark" placeholder="请输入文章备注" style="width: 45%; margin-top: 10px"></el-input>
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
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
              >
                <template #footer>
                  <el-button text bg size="small" @click="onAddOption">

                  </el-button>
                </template>
              </el-select>
            </div>
          </el-form-item>
        </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="blogDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="blogDialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      title="添加标签"
      v-model="addTagVisible"
    >

    </el-dialog>
  </div>


</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { Setting } from "@element-plus/icons-vue";

const blogPublishForm = reactive({
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
