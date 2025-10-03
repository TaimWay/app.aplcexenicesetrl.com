```vue
<template>
  <div class="about-page">
    <!-- 背景装饰元素 -->
    <BackgroundElements></BackgroundELements>
    
    <!-- 主要内容区域 -->
    <main class="about-content">
      <div class="container">
        <!-- 标题区域 -->
        <header class="about-header">
          <h1 class="about-title">About APlcexenicesetrl Apps</h1>
          <div class="title-underline"></div>
        </header>
        
        <!-- 内容区域 -->
        <div class="about-body">
          <!-- 介绍卡片 -->
          <section class="intro-card glass-card">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.09,8.59L17.5,10L11,16.5Z" />
              </svg>
            </div>
            <h2>完全免费的工具箱</h2>
            <p>APlcexenicesetrl Apps 是一个集合了多种实用功能的网站工具箱，所有功能完全免费且没有任何使用限制。我们致力于为用户提供便捷、高效的在线工具体验。</p>
          </section>
          
          <!-- 特性网格 -->
          <section class="features-section">
            <h2 class="section-title">我们的特点</h2>
            <div class="features-grid">
              <div class="feature-card glass-card">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32">
                    <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V10.7C15.4,10.9 16,11.3 16.4,11.9C17.2,10.9 18.8,10.9 19.6,11.9C20.1,12.5 20.1,13.4 19.5,14C19.1,14.5 18.4,14.7 17.8,14.7H16.3C15.9,16.4 14.4,17.5 12.7,17.5H11.3C9.6,17.5 8.1,16.4 7.7,14.7H6.2C5.6,14.7 5,14.4 4.5,14C4,13.4 4,12.5 4.5,11.9C5.3,10.9 6.9,10.9 7.7,11.9C8.2,11.3 8.8,10.9 9.4,10.7V10C9.4,8.6 10.8,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5C10.5,10.3 11,10.8 11.8,10.8C12.6,10.8 13.1,10.3 13.1,9.5C13.1,8.7 12.6,8.2 12,8.2Z" />
                  </svg>
                </div>
                <h3>安全可靠</h3>
                <p>所有工具都经过严格测试，确保用户数据安全和隐私保护。</p>
              </div>
              
              <div class="feature-card glass-card">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32">
                    <path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
                  </svg>
                </div>
                <h3>多样化工具</h3>
                <p>涵盖文本处理、图像编辑、格式转换等多种实用工具，满足不同需求。</p>
              </div>
              
              <div class="feature-card glass-card">
                <div class="feature-icon">
                  <svg viewBox="0 0 24 24" width="32" height="32">
                    <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                  </svg>
                </div>
                <h3>持续更新</h3>
                <p>我们不断添加新功能和优化现有工具，保持与时俱进。</p>
              </div>
            </div>
          </section>
          
          <!-- 版权信息 -->
          <section class="copyright-section">
            <div class="copyright-card glass-card">
              <p>APlcexenicesetrl Apps, Copyright (C) CNT DT. 2025.</p>
              <p>All rights reserved.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import BackgroundElements from '../components/background-elements.vue'
</script>

<script>
export default {
  name: 'AboutPage',
  mounted() {
    // 添加页面加载动画
    this.animateOnLoad();
  },
  methods: {
    animateOnLoad() {
      // 使用setTimeout确保DOM已渲染
      setTimeout(() => {
        const elements = document.querySelectorAll('.glass-card');
        elements.forEach((el, index) => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 200);
        });
      }, 100);
    }
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--bg-page);
  position: relative;
  overflow: hidden;
}

.about-content {
  position: relative;
  z-index: 1;
  padding: 120px 0 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-header {
  text-align: center;
  margin-bottom: 60px;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title-underline {
  width: 100px;
  height: 4px;
  background: var(--color-primary);
  margin: 0 auto;
  border-radius: 2px;
}

.about-body {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.intro-card {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.card-icon {
  color: var(--color-primary);
  margin-bottom: 20px;
}

.intro-card h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.intro-card p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.features-section {
  margin-top: 40px;
}

.section-title {
  font-size: 2.2rem;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-icon);
  border-radius: 50%;
  margin-bottom: 20px;
  color: var(--color-primary);
}

.feature-card h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 15px;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.copyright-section {
  text-align: center;
  margin-top: 40px;
}

.copyright-card {
  display: inline-block;
  padding: 20px 40px;
}

.copyright-card p {
  margin: 5px 0;
  color: var(--text-secondary);
  font-weight: 500;
}

.glass-card {
  background: var(--bg-card-glass);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border-card-glass);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: var(--transition-normal);
}

.glass-card:hover {
  box-shadow: var(--shadow-lg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-content {
    padding: 100px 0 40px;
  }
  
  .about-title {
    font-size: 2.2rem;
  }
  
  .intro-card h2 {
    font-size: 1.7rem;
  }
  
  .intro-card p {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .glass-card {
    padding: 20px;
  }
}
</style>
```