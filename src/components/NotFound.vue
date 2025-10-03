<template>
  <!-- 背景装饰元素 -->
  <BackgroundElements></BackgroundElements>
  <div class="app-box not-found">
    <h1 class="title">404 - Page Not Found</h1>
    <p class="subtitle">The page you are looking for does not exist.</p>
    <a class="link" href="/">返回 「首页」</a>
  </div>
</template>

<script setup>
import BackgroundElements from './background-elements.vue';
</script>

<script>
export default {
  name: 'NotFound'
}
</script>

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

.not-found {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.title {
  color: var(--logo-color);
  text-shadow: 0 0 10px var(--logo-glow);
  font-weight: 700;
  margin: 0;
}

.subtitle {
  color: var(--text-primary);
  font-weight: bold;
  font-size: 18px;
}

.link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  background: transparent;
  position: relative;
  z-index: 1;
}

/* 悬浮发光效果 */
.link:hover {
  color: var(--color-primary-hover);
  text-shadow: 0 0 10px var(--logo-glow);
}

.link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.link:hover::before {
  opacity: 1;
}
</style>