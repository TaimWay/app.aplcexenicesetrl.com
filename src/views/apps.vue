<template>
    <div class="app-box">
        <BackgroundElements></BackgroundElements>

        <div class="page-header">
            <div class="page-title">
                <span class="text">应用列表</span>
                <div class="bar"></div>
            </div>
            <div class="search-box">
                <input v-model="searchQuery" type="text" placeholder="搜索应用..." class="search-input"
                    @input="handleSearch" />
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                        fill="currentColor" />
                </svg>
            </div>
        </div>

        <div class="page-content">
            <!-- 分类导航 -->
            <div class="index glass-card">
                <div class="index-header">
                    <h3>分类</h3>
                </div>
                <div v-for="(category, index) in categories" :key="category.name" class="index-item"
                    :class="{ active: currentCategory === category.name }" @click="setCurrentCategory(category.name)">
                    <div v-html="getCategoryIcon(category.name)" class="index-icon"></div>

                    <div class="index-content">
                        <span class="index-name">{{ category.displayName }}</span>
                        <span class="index-app-number">{{ category.count }}</span>
                    </div>
                </div>
            </div>

            <!-- 应用网格 -->
            <div class="content-area">
                <div class="list glass-card">
                    <div class="list-header">
                        <h3>{{ getCurrentCategoryDisplayName() }}</h3>
                        <span class="app-count">{{ displayedApps.length }} 个应用</span>
                    </div>

                    <!-- 加载状态 -->
                    <div v-if="loading" class="loading-state">
                        <div class="loading-spinner"></div>
                        <span class="loading-text">加载应用中...</span>
                    </div>

                    <!-- 空状态 -->
                    <div v-else-if="displayedApps.length === 0" class="nofound">
                        <div class="nofound-icon">
                            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1024 512c0 282.763636-229.236364 512-512 512S0 794.763636 0 512 229.236364 0 512 0s512 229.236364 512 512z m-46.545455 0C977.454545 254.941091 769.058909 46.545455 512 46.545455S46.545455 254.941091 46.545455 512s208.395636 465.454545 465.454545 465.454545 465.454545-208.395636 465.454545-465.454545zM661.76 332.637091a23.272727 23.272727 0 0 1 32.919273 32.907636L546.56 513.652364 694.679273 661.76A23.272727 23.272727 0 0 1 661.76 694.690909L513.652364 546.56 365.544727 694.667636a23.272727 23.272727 0 0 1-32.907636-32.907636l148.107636-148.107636-148.107636-148.096a23.272727 23.272727 0 0 1 32.919273-32.919273l148.096 148.107636L661.76 332.637091z">
                                </path>
                            </svg>
                        </div>
                        <span class="text">哦不！这里没有任何应用</span>
                        <p class="subtext" v-if="searchQuery">尝试调整搜索条件</p>
                        <p class="subtext" v-else>该分类下暂时没有应用</p>
                    </div>

                    <!-- 应用网格 -->
                    <div v-else class="apps-grid-container">
                        <div class="apps-grid">
                            <div v-for="app in displayedApps" :key="app.id" class="app-grid-item" @click="openApp(app)"
                                @mouseenter="showTooltip(app, $event)" @mouseleave="hideTooltip">
                                <div class="app-icon-wrapper">
                                    <div class="app-icon" v-html="app.icon"></div>
                                </div>
                                <div class="app-name">{{ app.name }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tooltip -->
        <div v-if="tooltip.visible" class="app-tooltip" :style="{
            left: tooltip.x + 'px',
            top: tooltip.y + 'px'
        }">
            <div class="tooltip-content">
                <div class="tooltip-header">
                    <h4 class="tooltip-title">{{ tooltip.app?.name }}</h4>
                    <span v-if="tooltip.app?.category" class="tooltip-category">{{ tooltip.app.category }}</span>
                </div>
                <p class="tooltip-description">{{ tooltip.app?.description }}</p>
            </div>
            <div class="tooltip-arrow"></div>
        </div>
    </div>
    <div class="sys-msg glass-card">
        此页面正在编写中，请耐心等待最终页面发布
    </div>
</template>

<script setup>
import BackgroundElements from '../components/background-elements.vue';
</script>

<script>
import appManager from '../utils/appManager.js'

export default {
    name: 'AppsPage',
    data() {
        return {
            currentCategory: 'all',
            searchQuery: '',
            loading: true,
            tooltip: {
                visible: false,
                x: 0,
                y: 0,
                app: null
            },
            allApps: [],
            categories: []
        }
    },
    computed: {
        displayedApps() {
            if (this.searchQuery) {
                return appManager.searchApps(this.searchQuery)
            }

            if (this.currentCategory === 'all') {
                return this.allApps
            } else if (this.currentCategory === 'uncategorized') {
                return this.allApps.filter(app => !app.category)
            } else {
                return appManager.getAppsByCategory(this.currentCategory)
            }
        }
    },
    async mounted() {
        await this.loadApps()
        this.loading = false
    },
    methods: {
        async loadApps() {
            try {
                // 动态加载所有应用
                const appModules = import.meta.glob('../apps/*.vue')

                for (const path in appModules) {
                    try {
                        const module = await appModules[path]()
                        const appComponent = module.default

                        if (appComponent.toolInfo) {
                            appManager.registerApp(appComponent.toolInfo, appComponent)
                        }
                    } catch (error) {
                        console.error(`Failed to load app from ${path}:`, error)
                    }
                }

                this.allApps = appManager.getAllApps()
                this.categories = appManager.getCategories()

            } catch (error) {
                console.error('Failed to load apps:', error)
            }
        },

        setCurrentCategory(category) {
            this.currentCategory = category
            this.searchQuery = '' // 清除搜索条件
        },

        getCurrentCategoryDisplayName() {
            const category = this.categories.find(cat => cat.name === this.currentCategory)
            return category ? category.displayName : '应用'
        },

        getCategoryIcon(categoryName) {
            const icons = {
                'all': '<svg width="24" height="24" viewBox="0 0 1024 1024" fill="currentColor"><path d="M414.47619 121.904762a73.142857 73.142857 0 0 1 73.142858 73.142857v292.571429H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142858V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h219.428571z m73.142858 414.47619v292.571429a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-219.428571a73.142857 73.142857 0 0 1 73.142857-73.142858h292.571429z m231.619047-414.47619a182.857143 182.857143 0 1 1 0 365.714286 182.857143 182.857143 0 0 1 0-365.714286zM828.952381 536.380952a73.142857 73.142857 0 0 1 73.142857 73.142858v219.428571a73.142857 73.142857 0 0 1-73.142857 73.142857h-219.428571a73.142857 73.142857 0 0 1-73.142858-73.142857V536.380952h292.571429z"></path></svg>',
                'uncategorized': '<svg width="24" height="24" viewBox="0 0 1024 1024" fill="currentColor"><path d="M227.14123 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C321.728492 456.087573 279.288914 413.647995 227.14123 413.647995z"></path><path d="M510.903016 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C605.490278 456.087573 563.051723 413.647995 510.903016 413.647995z"></path><path d="M794.665825 413.647995c-52.14973 0-94.587262 42.439578-94.587262 94.587262 0 52.14973 42.437531 94.587262 94.587262 94.587262 52.147684 0 94.587262-42.437531 94.587262-94.587262C889.253086 456.087573 846.813508 413.647995 794.665825 413.647995z"></path></svg>'
            }

            return icons[categoryName] || '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V6h5.17l2 2H20v10z"></path></svg>'
        },

        openApp(app) {
            this.$router.push(`/app/${app.id}`)
        },

        handleSearch() {
            // 搜索时自动切换到全部应用分类
            if (this.searchQuery && this.currentCategory !== 'all') {
                this.currentCategory = 'all'
            }
        },

        showTooltip(app, event) {
            requestAnimationFrame(() => {
                const rect = event.currentTarget.getBoundingClientRect()
                this.tooltip = {
                    visible: true,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                    app: app
                }
            })
        },

        hideTooltip() {
            this.tooltip.visible = false
        }
    }
}
</script>

<style scoped>
/* 简化的动画提升性能 */
@keyframes float-simple {
    0% {
        transform: translate(0, 0) rotate(0deg);
    }

    50% {
        transform: translate(20px, 10px) rotate(180deg);
    }

    100% {
        transform: translate(0, 0) rotate(360deg);
    }
}

/* Main Style */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 32px;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;
    gap: 20px;
}

.page-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.page-title .text {
    font-weight: 700;
    font-size: 2.5rem;
    background: var(--app-title-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 8px;
}

.page-title .bar {
    width: 80px;
    height: 4px;
    border-radius: 2px;
    background: var(--app-title-bar);
}

.search-box {
    position: relative;
    min-width: 280px;
}

.search-input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: 1px solid var(--border-input);
    border-radius: var(--radius-lg);
    background: var(--bg-input);
    font-size: 14px;
    transition: var(--transition-normal);
    box-shadow: var(--shadow-input);
}

.search-input:focus {
    outline: none;
    border-color: var(--border-input-focus);
    box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1);
}

.search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: var(--text-secondary);
    pointer-events: none;
}

.page-content {
    display: flex;
    gap: 24px;
    position: relative;
    z-index: 1;
}

/* Index Styles */
.page-content .index {
    width: 280px;
    height: fit-content;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    overflow: hidden;
}

.index-header {
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--header-main-border);
}

.index-header h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
}

.page-content .index .index-item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    padding: 16px 20px;
    border: none;
    background: transparent;
    transition: var(--transition-normal);
    position: relative;
    overflow: hidden;
}

.page-content .index .index-item:hover {
    background: var(--app-index-bg-hover);
}

.page-content .index .index-item.active {
    background: var(--app-index-bg-active);
    color: var(--app-index-text-active);
}

.page-content .index .index-item .index-icon {
    width: 24px;
    height: 24px;
    fill: var(--app-index-icon-color);
    transition: var(--transition-normal);
}

.index-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
}

.index-name {
    font-size: 14px;
    font-weight: 500;
    transition: var(--transition-normal);
    color: var(--app-index-text-color);
}

.index-app-number {
    font-size: 12px;
    color: var(--text-secondary);
    transition: var(--transition-normal);
    background: var(--bg-icon);
    padding: 2px 8px;
    border-radius: 10px;
}

.page-content .index .index-item.active .index-icon {
    fill: var(--app-index-icon-active);
}

.page-content .index .index-item.active .index-name,
.page-content .index .index-item.active .index-app-number {
    color: var(--app-index-text-active);
}

/* Content Area */
.content-area {
    flex: 1;
    min-width: 0;
}

.list {
    height: auto;
    padding: 0;
    overflow: hidden;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid var(--header-main-border);
}

.list-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.app-count {
    font-size: 14px;
    color: var(--text-secondary);
    background: var(--bg-icon);
    padding: 4px 12px;
    border-radius: 12px;
}

/* 手机桌面风格的应用网格 */
.apps-grid-container {
    padding: 24px;
}

.apps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: var(--spacing-app-grid);
    justify-items: center;
}

.app-grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 16px 12px;
    border-radius: var(--radius-app-card);
    transition: all var(--transition-normal);
    width: 100%;
    max-width: 120px;
    position: relative;
    /* 优化性能：使用 transform 和 opacity */
    will-change: transform;
}

.app-grid-item:hover {
    transform: translateY(-5px);
    background: var(--app-index-bg-hover);
}

.app-grid-item:active {
    transform: translateY(-2px) scale(0.98);
}

.app-icon-wrapper {
    position: relative;
    margin-bottom: 12px;
}

.app-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-app-icon);
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
    overflow: hidden;
    /* 优化性能 */
    will-change: transform;
}

.app-grid-item:hover .app-icon {
    transform: scale(1.1);
    box-shadow: var(--shadow-lg);
}

.app-icon-img {
    width: 70%;
    height: 70%;
    object-fit: contain;
    border-radius: var(--radius-sm);
}

.app-icon-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.default-app-icon {
    width: 32px;
    height: 32px;
}

.app-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary);
    text-align: center;
    line-height: 1.3;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

/* Tooltip 样式 */
.app-tooltip {
    position: fixed;
    z-index: 1000;
    pointer-events: none;
    transform: translateX(-50%);
    margin-top: -10px;
    animation: tooltipFadeIn 0.2s ease-out;
    /* 优化性能 */
    will-change: transform, opacity;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.tooltip-content {
    background: var(--bg-card);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--border-card-glass);
    border-radius: var(--radius-md);
    padding: 16px;
    box-shadow: var(--shadow-lg);
    max-width: 280px;
    min-width: 200px;
}

.tooltip-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    gap: 12px;
}

.tooltip-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-primary);
    line-height: 1.3;
}

.tooltip-category {
    font-size: 12px;
    color: var(--color-primary);
    background: var(--bg-icon);
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
}

.tooltip-description {
    margin: 0;
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
}

.tooltip-arrow {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: var(--bg-card);
    border-right: 1px solid var(--border-card-glass);
    border-bottom: 1px solid var(--border-card-glass);
    transform: translateX(-50%) rotate(45deg);
}

/* No Found State */
.nofound {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 60px 20px;
    text-align: center;
}

.nofound-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-icon);
    border-radius: 50%;
    margin-bottom: 8px;
}

.nofound .icon {
    width: 40px;
    height: 40px;
    fill: var(--color-error);
}

.nofound .text {
    font-weight: 600;
    font-size: 1.25rem;
    color: var(--text-primary);
}

.nofound .subtext {
    color: var(--text-secondary);
    font-size: 14px;
    margin: 0;
}

/* Glass Card */
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
@media (max-width: 1024px) {
    .apps-grid {
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        gap: 16px;
    }

    .app-icon {
        width: 56px;
        height: 56px;
    }
}

@media (max-width: 768px) {
    .page-content {
        flex-direction: column;
    }

    .page-content .index {
        width: 100%;
    }

    .apps-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 12px;
    }

    .app-icon {
        width: 52px;
        height: 52px;
    }

    .app-name {
        font-size: 12px;
    }

    .page-header {
        flex-direction: column;
        align-items: stretch;
    }

    .search-box {
        min-width: auto;
    }

    .apps-grid-container {
        padding: 16px;
    }

    .tooltip-content {
        max-width: 240px;
    }
}

@media (max-width: 480px) {
    .app-box {
        padding: 16px;
    }

    .apps-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
    }

    .app-grid-item {
        padding: 12px 8px;
    }

    .app-icon {
        width: 48px;
        height: 48px;
    }

    .default-app-icon {
        width: 24px;
        height: 24px;
    }

    .tooltip-content {
        max-width: 200px;
        padding: 12px;
    }

    .tooltip-title {
        font-size: 14px;
    }

    .tooltip-description {
        font-size: 12px;
    }
}

/* 减少动画以提高性能的媒体查询 */
@media (prefers-reduced-motion: reduce) {

    .bg-circle,
    .app-grid-item,
    .app-icon,
    .app-tooltip,
    .glass-card {
        animation: none !important;
        transition: none !important;
    }
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 60px 20px;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-input);
    border-top: 3px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading-text {
    color: var(--text-secondary);
    font-size: 14px;
}

.sys-msg {
    position: fixed;
    right: 5px;
    bottom: 5px;
    z-index: 9999999;
    padding: 16px;
    color: var(--text-secondary);
    font-size: 14px;
}
</style>