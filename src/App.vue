<script setup>
import HeaderMenu from './components/header-menu.vue';
import ThemeSwitchBall from './components/theme-switch-ball.vue';
</script>

<template>
  <div class="box">
    <HeaderMenu />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
    <ThemeSwitchBall></ThemeSwitchBall>
  </div>
</template>

<style scoped>
/* 渐入渐出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  /* 动画持续时间0.5秒，使用ease的过渡效果 */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  /* 透明度从0开始 */
}
</style>
