<template>
  <div class="vditor-container">
    <div id="vditor"></div>
  </div>
</template>

<script setup>
import { onMounted , ref } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";
import { Setting } from "@element-plus/icons-vue";

const delay = ref(100);

defineProps({
  content: {
    type: String,
    default: "",
  },
});

defineEmits(["update:content"]);

onMounted(() => {
  console.log("Vditor mounted");
  const vditor = new Vditor("vditor", {
    height: "90%",
    width: "100%",
    mode: "sv",
    toolbar: [
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
    preview:{
      //预览 debounce 毫秒间隔
      delay: delay.value,
      mode: "both",
      //暂时不知道有什么用
      actions: ["desktop"],
      theme: {}
    },
    counter:{
      enable: true,
    },
    resize: {
      enable: true,
      position: "top",
    },
    theme: "classic",
  });

  //vditor.setTheme("dark");
});
//vditor.setTheme("dark");
</script>

<style>
@import "vditor/dist/index.css";
@import "./index.scss";
</style>
