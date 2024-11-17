<template>
  <div class="vditor-container">
    <div id="vditor" style="width: 100% ; height: 80%"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

defineProps({
  content: {
    type: String,
    default: "",
  },
});

defineEmits(["update:content"]);

onMounted(() => {
  console.log("Vditor mounted");
  new Vditor("vditor", {
    height: 300,
    mode: "sv",
  });
});
</script>

<style>
@import "vditor/dist/index.css";
@import "./index.scss";
</style>
