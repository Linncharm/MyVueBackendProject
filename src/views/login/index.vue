<template>
  <div class="login-container flx-center">
    <div class="login-box">

      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="Login"/>
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/hatch-chicken.svg" alt="Logo"/>
          <h2 class="logo-text"> Linncharm </h2>
        </div>
        <Loginform/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts" name="login">
  import Loginform from "@/views/login/component/loginform.vue"
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>