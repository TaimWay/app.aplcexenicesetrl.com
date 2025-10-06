<template>
  <div class="home-page">
    <!-- 背景装饰元素 -->
    <BackgroundElements></BackgroundElements>
    
    <!-- 主要内容区域 -->
    <main class="home-content">
      <!-- 英雄区域 -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">
                <span class="title-main">APlcexenicesetrl</span>
                <span class="title-sub">工具箱</span>
              </h1>
              <p class="hero-description">
                完全免费的在线工具集合，为您提供高效、便捷的解决方案。<br>
                无需下载，无需注册，即刻使用。
              </p>
              <div class="hero-actions">
                <button class="btn btn-primary" @click="scrollToTools">
                  探索工具
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </button>
                <button class="btn btn-secondary" @click="scrollToFeatures">
                  了解特点
                </button>
              </div>
            </div>
            <div class="hero-visual">
              <div class="floating-cards">
                <div class="floating-card card-1 glass-card">
                  <div class="card-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32">
                      <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.09,8.59L17.5,10L11,16.5Z" />
                    </svg>
                  </div>
                  <h3>文本处理</h3>
                </div>
                <div class="floating-card card-2 glass-card">
                  <div class="card-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32">
                      <path fill="currentColor" d="M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z" />
                    </svg>
                  </div>
                  <h3>格式转换</h3>
                </div>
                <div class="floating-card card-3 glass-card">
                  <div class="card-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32">
                      <path fill="currentColor" d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
                    </svg>
                  </div>
                  <h3>图像编辑</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 特性区域 -->
      <section class="features-section" id="features">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">为什么选择我们</h2>
            <p class="section-subtitle">我们提供最优质的工具体验</p>
          </div>
          <div class="features-grid">
            <div class="feature-item glass-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V10.7C15.4,10.9 16,11.3 16.4,11.9C17.2,10.9 18.8,10.9 19.6,11.9C20.1,12.5 20.1,13.4 19.5,14C19.1,14.5 18.4,14.7 17.8,14.7H16.3C15.9,16.4 14.4,17.5 12.7,17.5H11.3C9.6,17.5 8.1,16.4 7.7,14.7H6.2C5.6,14.7 5,14.4 4.5,14C4,13.4 4,12.5 4.5,11.9C5.3,10.9 6.9,10.9 7.7,11.9C8.2,11.3 8.8,10.9 9.4,10.7V10C9.4,8.6 10.8,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5C10.5,10.3 11,10.8 11.8,10.8C12.6,10.8 13.1,10.3 13.1,9.5C13.1,8.7 12.6,8.2 12,8.2Z" />
                </svg>
              </div>
              <h3>安全可靠</h3>
              <p>所有工具都经过严格测试，确保用户数据安全和隐私保护。您的数据永远不会被存储或共享。</p>
            </div>
            
            <div class="feature-item glass-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" />
                </svg>
              </div>
              <h3>多样化工具</h3>
              <p>涵盖文本处理、图像编辑、格式转换、编码解码等多种实用工具，满足不同场景需求。</p>
            </div>
            
            <div class="feature-item glass-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
                </svg>
              </div>
              <h3>持续更新</h3>
              <p>我们不断添加新功能和优化现有工具，保持与时俱进。您的反馈将帮助我们变得更好。</p>
            </div>
            
            <div class="feature-item glass-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" width="48" height="48">
                  <path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
                </svg>
              </div>
              <h3>完全免费</h3>
              <p>所有工具完全免费使用，没有任何隐藏费用或限制。我们相信优质的工具应该对所有人开放。</p>
            </div>

            <div class="feature-item glass-card">
              <div class="feature-icon">
                <svg fill="currentColor" viewBox="0 0 1024 1024" width="48" height="48"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
              </div>
              <h3>开源</h3>
              <p>所有工具都会在 Github 上开源，因此非常安全，你可以到我们的仓库里查看源代码</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 工具展示区域 -->
      <section class="tools-section" id="tools">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">热门工具</h2>
            <p class="section-subtitle">探索我们最受欢迎的工具</p>
          </div>
          <div class="tools-grid">
            <div class="tool-card glass-card" v-for="tool in tools" :key="tool.id">
              <div class="tool-icon">
                <svg :viewBox="tool.icon.viewBox" width="40" height="40">
                  <path :fill="tool.icon.fill" :d="tool.icon.path" />
                </svg>
              </div>
              <h3>{{ tool.name }}</h3>
              <p>{{ tool.description }}</p>
              <button class="btn-tool" @click="navigateToTool(tool.path)">
                使用工具
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="tools-actions">
            <button class="btn btn-outline" @click="navigateToApps">
              查看所有工具
            </button>
          </div>
        </div>
      </section>
      
      <!-- CTA区域 -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content glass-card">
            <h2>准备好开始使用了吗？</h2>
            <p>立即体验我们的工具箱，提升您的工作效率</p>
            <button class="btn btn-primary" @click="navigateToApps">
              开始使用
            </button>
          </div>
        </div>
      </section>
    </main>
    
    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h3>APlcexenicesetrl Apps</h3>
            <p>完全免费的在线工具箱</p>
          </div>
          <div class="footer-links">
            <a>LETS GOOOOOOOOOOO!</a>
          </div>
        </div>
        <div class="footer-copyright">
          <p>APlcexenicesetrl Apps, Copyright (C) CNT DT. 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import BackgroundElements from '../components/background-elements.vue'
</script>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      tools: [
        {
          id: 1,
          name: '文本格式化',
          description: '快速格式化文本，包括大小写转换、空格处理等',
          path: 'text-format',
          icon: {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            path: 'M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z'
          }
        },
        {
          id: 2,
          name: 'JSON格式化',
          description: '美化和验证JSON数据，提高可读性',
          path: 'json-format',
          icon: {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            path: 'M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z'
          }
        },
        {
          id: 3,
          name: 'BaseX编码',
          description: '快速将文本或文件转换为BaseX编码',
          path: 'basex-code',
          icon: {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            path: 'M12,2C13.85,2 15.55,2.78 16.9,4.1L18.6,1.93L20.18,3.16L18.2,5.68C19.33,7.41 20,9.6 20,12C20,17.52 15.52,22 10,22C4.48,22 0,17.52 0,12C0,6.48 4.48,2 10,2H12M10,4C5.58,4 2,7.58 2,12C2,16.42 5.58,20 10,20C14.42,20 18,16.42 18,12C18,9.78 17.23,7.74 15.95,6.14L14.77,4.89C13.26,4.33 11.67,4 10,4V4Z'
          }
        },
        {
          id: 4,
          name: '颜色选择器',
          description: '直观的颜色选择工具，支持多种格式',
          path: 'color-picker',
          icon: {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            path: 'M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z'
          }
        },
        {
          id: 5,
          name: '图片压缩',
          description: '减小图片文件大小，保持视觉质量',
          path: 'image-compress',
          icon: {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            path: 'M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18M16,18H8V6H16V18Z'
          }
        },
        {
          id: 6,
          name: '二维码生成',
          description: '快速生成自定义二维码，支持多种内容',
          path: 'qr-generator',
          icon: {
            viewBox: '0 0 24 24',
            fill: 'currentColor',
            path: 'M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z'
          }
        }
      ]
    }
  },
  mounted() {
    this.animateOnLoad();
  },
  methods: {
    animateOnLoad() {
      setTimeout(() => {
        const elements = document.querySelectorAll('.glass-card');
        elements.forEach((el, index) => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 150);
        });
      }, 100);
    },
    scrollToTools() {
      const element = document.getElementById('tools');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    scrollToFeatures() {
      const element = document.getElementById('features');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    navigateToTool(path) {
      // 在实际应用中，这里应该使用Vue Router进行导航
      this.$router.push('/app/' + path);
    },
    navigateToApps() {
      // 在实际应用中，这里应该使用Vue Router进行导航
      this.$router.push('/app');
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-page);
  position: relative;
  overflow-x: hidden;
}

.home-content {
  position: relative;
  z-index: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 英雄区域样式 */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text {
  max-width: 500px;
}

.hero-title {
  margin-bottom: 24px;
}

.title-main {
  display: block;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.1;
}

.title-sub {
  display: block;
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-primary);
  margin-top: 8px;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 40px;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--text-button);
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 71, 87, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-card);
}

.btn-secondary:hover {
  background: var(--bg-card);
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-card);
}

.btn-outline:hover {
  background: var(--bg-card);
  transform: translateY(-2px);
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-cards {
  position: relative;
  width: 300px;
  height: 300px;
}

.floating-card {
  position: absolute;
  width: 180px;
  padding: 20px;
  text-align: center;
  transition: all 0.5s ease;
}

.floating-card:hover {
  z-index: 10;
}

.card-1 {
  top: 0;
  left: 0;
  animation: float1 6s ease-in-out infinite;
}

.card-2 {
  top: 60px;
  right: 0;
  animation: float2 7s ease-in-out infinite;
}

.card-3 {
  bottom: 0;
  left: 60px;
  animation: float3 8s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-15px) rotate(5deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-20px) rotate(-3deg); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

.card-icon {
  margin-bottom: 12px;
  color: var(--color-primary);
}

.floating-card h3 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin: 0;
}

/* 特性区域样式 */
.features-section {
  padding: 100px 0;
  background: var(--bg-section);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-item {
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
  margin-bottom: 24px;
  color: var(--color-primary);
}

.feature-item h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.feature-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* 工具区域样式 */
.tools-section {
  padding: 100px 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 100px;
  margin-bottom: 50px;
}

.tool-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tool-icon {
  color: var(--color-primary);
  margin-bottom: 20px;
}

.tool-card h3 {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.tool-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
}

.btn-tool {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--border-card);
  align-self: flex-start;
}

.btn-tool:hover {
  background: var(--color-primary);
  color: var(--text-button);
  transform: translateY(-2px);
}

.tools-actions {
  transform: translateY(50px);
  text-align: center;
}

/* CTA区域样式 */
.cta-section {
  padding: 100px 0;
  background: var(--bg-section);
}

.cta-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  padding: 60px 40px;
}

.cta-content h2 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.cta-content p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 30px;
}

/* 页脚样式 */
.footer {
  background: var(--bg-footer);
  border-top: 1px solid var(--border-card);
  padding: 40px 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.footer-logo h3 {
  color: var(--text-primary);
  margin-bottom: 8px;
}

.footer-logo p {
  color: var(--text-secondary);
}

.footer-links {
  display: flex;
  gap: 30px;
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid var(--border-card);
}

.footer-copyright p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .hero-text {
    max-width: 100%;
  }
  
  .title-main {
    font-size: 3rem;
  }
  
  .title-sub {
    font-size: 1.8rem;
  }
}

@media (max-width: 1024px) {
  .hero-section {
    padding: 100px 0 60px;
  }
  
  .title-main {
    font-size: 2.5rem;
  }
  
  .title-sub {
    font-size: 1.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
    justify-content: center;
  }
  
  .floating-cards {
    width: 250px;
    height: 250px;
  }
  
  .floating-card {
    width: 150px;
    padding: 15px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-section,
  .tools-section,
  .cta-section {
    padding: 80px 0;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .footer-links {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .title-main {
    font-size: 2rem;
  }
  
  .title-sub {
    font-size: 1.3rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .features-grid,
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .glass-card {
    padding: 20px;
  }
  
  .cta-content {
    padding: 40px 20px;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
}


</style>