<template>
  <div class="home-container">
    <div class="home-title">
      <span ref="typedText"></span>
    </div>
    <div class="home-content">
      <img class="home-bg" src="@/assets/images/login_left.png" alt="welcome">
    </div>
  </div>
</template>

<script setup lang="ts">
import Typed from "typed.js";
import { onMounted, ref } from "vue";

const typedText = ref(null);

function createTypedText(){
  const options = {
    strings: [" Welcome to my Vue Project ! ", "Practice makes perfect ~ "],
    typeSpeed: 100,
    backSpeed: 70,
    loop: true,
  };

  new Typed(typedText.value, options);
}

onMounted(() => {
  createTypedText();
});

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>