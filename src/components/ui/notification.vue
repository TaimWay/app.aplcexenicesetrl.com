<template>
  <div class="notification-wrapper">
    <transition-group name="notification" tag="div" class="notifications-container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'notification',
          `notification--${notification.type}`,
          { 'notification--closing': notification.closing }
        ]"
        @mouseenter="pauseAutoClose(notification)"
        @mouseleave="resumeAutoClose(notification)"
      >
        <div class="notification__header">
          <div class="notification__icon">
            <div v-if="notification.type === 'success'" class="notification__icon-success">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <div v-else-if="notification.type === 'warning'" class="notification__icon-warning">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
            </div>
            <div v-else-if="notification.type === 'error'" class="notification__icon-error">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
            <div v-else class="notification__icon-info">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
          </div>
          <h3 class="notification__title">{{ notification.title }}</h3>
          <button class="notification__close" @click="closeNotification(notification)">
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div class="notification__content">
          <p>{{ notification.message }}</p>
        </div>
        <div v-if="notification.progress" class="notification__progress">
          <div class="notification__progress-bar" :style="{ width: `${notification.progress}%` }"></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      notifications: [],
      nextId: 1
    }
  },
  methods: {
    /**
     * 显示通知
     * @param {Object} options 通知选项
     * @param {string} options.title 通知标题
     * @param {string} options.message 通知内容
     * @param {string} options.type 通知类型: 'info', 'success', 'warning', 'error'
     * @param {number} options.duration 自动关闭时间(毫秒)，0表示不自动关闭
     * @param {number} options.progress 进度条百分比(0-100)
     * @returns {number} 通知ID，可用于手动关闭
     */
    show(options) {
      const id = this.nextId++
      const notification = {
        id,
        title: options.title || '通知',
        message: options.message || '',
        type: options.type || 'info',
        duration: options.duration !== undefined ? options.duration : 5000,
        progress: options.progress || null,
        closing: false,
        timer: null
      }

      this.notifications.unshift(notification)
      
      // 设置自动关闭
      if (notification.duration > 0) {
        notification.timer = setTimeout(() => {
          this.closeNotification(notification)
        }, notification.duration)
      }
      
      return id
    },
    
    /**
     * 关闭通知
     * @param {Object} notification 通知对象
     */
    closeNotification(notification) {
      if (notification.closing) return
      
      notification.closing = true
      
      // 添加关闭动画延迟
      setTimeout(() => {
        const index = this.notifications.findIndex(n => n.id === notification.id)
        if (index !== -1) {
          this.notifications.splice(index, 1)
        }
      }, 300)
    },
    
    /**
     * 暂停自动关闭(鼠标悬停时)
     * @param {Object} notification 通知对象
     */
    pauseAutoClose(notification) {
      if (notification.timer) {
        clearTimeout(notification.timer)
        notification.timer = null
      }
    },
    
    /**
     * 恢复自动关闭(鼠标离开时)
     * @param {Object} notification 通知对象
     */
    resumeAutoClose(notification) {
      if (notification.duration > 0 && !notification.timer && !notification.closing) {
        notification.timer = setTimeout(() => {
          this.closeNotification(notification)
        }, notification.duration)
      }
    },
    
    /**
     * 更新通知进度
     * @param {number} id 通知ID
     * @param {number} progress 进度百分比(0-100)
     */
    updateProgress(id, progress) {
      const notification = this.notifications.find(n => n.id === id)
      if (notification) {
        notification.progress = Math.min(100, Math.max(0, progress))
      }
    },
    
    /**
     * 关闭所有通知
     */
    closeAll() {
      this.notifications.forEach(notification => {
        if (notification.timer) {
          clearTimeout(notification.timer)
        }
        notification.closing = true
      })
      
      setTimeout(() => {
        this.notifications = []
      }, 300)
    }
  }
}
</script>

<style scoped>
.notification-wrapper {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  pointer-events: none;
}

.notifications-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 360px;
  pointer-events: auto;
}

.notification {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  transform: translateX(0);
  opacity: 1;
  position: relative;
  overflow: hidden;
}

.notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.notification--success::before {
  background: var(--color-success);
}

.notification--warning::before {
  background: var(--color-warning);
}

.notification--error::before {
  background: var(--color-error);
}

.notification--info::before {
  background: var(--color-info);
}

.notification__header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.notification__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
}

.notification__icon-success {
  color: var(--color-success);
}

.notification__icon-warning {
  color: var(--color-warning);
}

.notification__icon-error {
  color: var(--color-error);
}

.notification__icon-info {
  color: var(--color-info);
}

.notification__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
}

.notification__close {
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-fast);
}

.notification__close:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-primary);
}

.notification__content {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.notification__content p {
  margin: 0;
}

.notification__progress {
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-top: 12px;
  overflow: hidden;
}

.notification__progress-bar {
  height: 100%;
  background: var(--color-primary);
  transition: width 0.3s ease;
}

/* 进入和离开动画 */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-active {
  position: absolute;
  right: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notification-wrapper {
    top: 10px;
    right: 10px;
    left: 10px;
  }
  
  .notifications-container {
    max-width: none;
  }
}
</style>