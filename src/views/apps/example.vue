<template>
    <div class="app-box">
        <div class="app-header">
            <h1>示例应用</h1>
            <p>这是一个演示应用，展示了应用的基本结构</p>
        </div>
        
        <div class="app-content">
            <div class="feature-card glass-card">
                <h3>APP List</h3>
                <ul>
                    <li>example</li>
                    <li>?</li>
                </ul>
            </div>
            
            <div class="feature-card glass-card">
                <h3>使用说明</h3>
                <p>这个应用展示了如何在系统中集成新的工具应用。</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'example',
    toolInfo: {
        id: 'example',
        name: '示例应用',
        description: '这是一个演示应用，展示了应用的基本结构和功能',
        icon: '<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
        category: '工具'
    }
}
</script>

<style scoped>
.app-header {
    text-align: center;
    margin-bottom: 40px;
}

.app-header h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
    background: var(--text-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.app-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    padding: 24px;
}

.feature-card h3 {
    margin-bottom: 16px;
    color: var(--text-primary);
}

.feature-card ul {
    list-style: none;
    padding: 0;
}

.feature-card li {
    padding: 8px 0;
    border-bottom: 1px solid var(--hm-border);
}

.feature-card li:last-child {
    border-bottom: none;
}
</style>