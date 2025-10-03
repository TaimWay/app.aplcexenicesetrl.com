<script setup>
import HeaderMenu from './components/header-menu.vue';
import ThemeSwitchBall from './components/theme-switch-ball.vue';
</script>

<template>
  <div class="box">
    <HeaderMenu />
    <router-view></router-view>
    <ThemeSwitchBall></ThemeSwitchBall>
  </div>
</template>

<style scoped>
</style>
