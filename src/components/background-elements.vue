<template>
    <!-- 背景装饰元素 -->
    <div class="background-elements">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-circle circle-4"></div>
    </div>
</template>

<style scoped>
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: var(--color-primary);
  opacity: 0.05;
  filter: blur(40px);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
}

.circle-2 {
  width: 400px;
  height: 400px;
  bottom: 10%;
  right: 5%;
}

.circle-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  left: 70%;
}

.circle-4 {
  width: 200px;
  height: 200px;
  top: 70%;
  left: 20%;
}
</style>