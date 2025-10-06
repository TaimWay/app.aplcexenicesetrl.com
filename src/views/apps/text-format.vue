<template>
    <div class="app-box">
        <!-- 添加通知组件 -->
        <Notification ref="notification" />
        
        <div class="app-header">
            <span class="title">文本格式化工具</span>
            <span class="subtitle">快速格式化文本，包括大小写转换、空格处理等</span>
        </div>
        <div class="app-content">
            <div class="funct">
                <div class="glass-card">
                    <ul list-number>
                        <li>将需要<span class="text-blod">格式化</span>的文本输入到<span class="text-blod">输入区</span>中</li>
                        <li>选择<span class="text-blod">格式化</span>所需的选项</li>
                        <li>点击<span class="text-blod">格式化</span>按钮进行处理</li>
                        <li><span class="text-blod">格式化</span>后的文本会输出到<span class="text-blod">输出区</span>，可点击<span
                                class="text-blod">复制</span>按钮以复制文本</li>
                    </ul>
                </div>
                <div class="glass-card">
                    <div class="form">
                        <div class="form-item">
                            <span class="form-title text-blod">大小写转换</span>
                            <select v-model="caseOption" name="case-option" id="case-option" class="useWebFonts">
                                <option value="none" selected>不转换</option>
                                <option value="upper">全部大写</option>
                                <option value="lower">全部小写</option>
                                <option value="title">单词首字母大写</option>
                                <option value="sentence">句子首字母大写</option>
                                <option value="invert">反转大小写</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">空格处理</span>
                            <select v-model="spaceOption" name="space-option" id="space-option" class="useWebFonts">
                                <option value="none" selected>保持不变</option>
                                <option value="trim">去除首尾空格</option>
                                <option value="single">合并多个空格</option>
                                <option value="remove">移除所有空格</option>
                                <option value="normalize">规范化空格</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">换行处理</span>
                            <select v-model="lineOption" name="line-option" id="line-option" class="useWebFonts">
                                <option value="none" selected>保持不变</option>
                                <option value="remove">移除所有换行</option>
                                <option value="unix">Unix换行符(LF)</option>
                                <option value="windows">Windows换行符(CR+LF)</option>
                                <option value="double">双倍换行</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">其他选项</span>
                            <div class="checkbox-group">
                                <label class="checkbox-item">
                                    <input type="checkbox" v-model="removePunctuation" />
                                    <span class="checkmark"></span>
                                    移除标点符号
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" v-model="reverseText" />
                                    <span class="checkmark"></span>
                                    反转文本
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" v-model="sortLines" />
                                    <span class="checkmark"></span>
                                    按行排序
                                </label>
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">统计信息</span>
                            <div class="stats">
                                <div class="stat-item">
                                    <span class="stat-label">字符数:</span>
                                    <span class="stat-value">{{ characterCount }}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">单词数:</span>
                                    <span class="stat-value">{{ wordCount }}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">行数:</span>
                                    <span class="stat-value">{{ lineCount }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="button-funct">
                            <button class="btn btn-ghost" @click="reset">重置</button>
                            <button class="btn btn-ghost" @click="swap">交换</button>
                            <button class="btn btn-primary" @click="format">格式化</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ioput">
                <div class="glass-card input">
                    <div class="header">
                        <h1 class="title">输入区</h1>
                        <button class="btn btn-outline" @click="clearInput">清空</button>
                        <button class="btn btn-primary" @click="copyInput">复制</button>
                    </div>
                    <textarea class="editor glass-card code-list" v-model="inputText" name="text-input" id="text-input"
                        placeholder="请输入文本..." @input="updateStats"></textarea>
                </div>
                <div class="glass-card output">
                    <div class="header">
                        <h1 class="title">输出区</h1>
                        <button class="btn btn-outline" @click="clearOutput">清空</button>
                        <button class="btn btn-primary" @click="copyOutput">复制</button>
                    </div>
                    <textarea class="editor glass-card code-list" v-model="outputText" name="text-output"
                        id="text-output" placeholder="等待格式化文本..." readonly></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-content {
    flex-direction: column;
}

.app-content .funct {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.app-content .ioput {
    display: flex;
    gap: 20px;
}

.app-content .ioput .input,
.app-content .ioput .output {
    width: 100%;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form .form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}

.form .form-item .form-title {
    color: var(--text-primary);
    margin-right: 15px;
    min-width: 120px;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.checkbox-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-left: 30px;
    color: var(--text-primary);
}

.checkbox-item input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: var(--bg-input);
    border: 1px solid var(--border-input);
    border-radius: 4px;
    transition: var(--transition-fast);
}

.checkbox-item:hover input ~ .checkmark {
    background-color: var(--bg-card);
}

.checkbox-item input:checked ~ .checkmark {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.checkbox-item input:checked ~ .checkmark:after {
    display: block;
}

.checkbox-item .checkmark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.stats {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    width: 100%;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 80px;
}

.stat-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 5px;
}

.stat-value {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--color-primary);
}

.code-list {
    color: var(--text-primary);
}

.ioput .header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.ioput .header .title {
    margin-right: auto;
    font-size: 1.2rem;
    color: var(--text-primary)
}

.ioput .editor {
    width: 100%;
    min-height: 200px;
    resize: vertical;
    border-radius: var(--radius-md);
    outline: none;
    padding: 20px;
    border: 1px solid var(--border-input);
    background: var(--bg-input);
    font-family: monospace;
    font-size: 14px;
}

.button-funct {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .app-content .ioput {
        flex-direction: column;
    }

    .form .form-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .form .form-item .form-title {
        margin-right: 0;
        margin-bottom: 5px;
    }

    .stats {
        flex-direction: column;
        gap: 10px;
    }

    .stat-item {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }

    .button-funct {
        justify-content: stretch;
    }

    .button-funct .btn {
        flex: 1;
        min-width: 120px;
    }

    .ioput .header {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }

    .ioput .header .title {
        margin-right: 0;
        text-align: center;
    }

    .ioput .header .btn {
        flex: 1;
    }
}

/* 平板适配 */
@media (min-width: 769px) and (max-width: 1024px) {
    .app-box {
        padding: 80px 30px;
    }

    .form {
        gap: 15px;
    }

    .form .form-item {
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>

<script setup>
import { ref, computed } from 'vue'
import Notification from '../../components/ui/Notification.vue'

// 响应式数据
const inputText = ref('')
const outputText = ref('')
const caseOption = ref('none')
const spaceOption = ref('none')
const lineOption = ref('none')
const removePunctuation = ref(false)
const reverseText = ref(false)
const sortLines = ref(false)

// 通知组件引用
const notification = ref(null)

// 计算属性：统计信息
const characterCount = computed(() => {
    return inputText.value.length
})

const wordCount = computed(() => {
    if (!inputText.value.trim()) return 0
    return inputText.value.trim().split(/\s+/).length
})

const lineCount = computed(() => {
    if (!inputText.value) return 0
    return inputText.value.split('\n').length
})

// 更新统计信息
const updateStats = () => {
    // 计算属性会自动更新
}

// 格式化函数
const format = () => {
    if (!inputText.value.trim()) {
        showNotification('请输入要格式化的文本', 'warning')
        return
    }

    try {
        let text = inputText.value
        
        // 处理空格
        text = processSpaces(text)
        
        // 处理换行
        text = processLines(text)
        
        // 处理大小写
        text = processCase(text)
        
        // 其他处理
        text = processOther(text)
        
        outputText.value = text
        showNotification('格式化成功', 'success')
    } catch (error) {
        outputText.value = `格式化错误: ${error.message}`
        showNotification(`格式化错误: ${error.message}`, 'error')
    }
}

// 处理空格
const processSpaces = (text) => {
    switch (spaceOption.value) {
        case 'trim':
            return text.trim()
        case 'single':
            return text.replace(/\s+/g, ' ')
        case 'remove':
            return text.replace(/\s+/g, '')
        case 'normalize':
            return text.replace(/\s+/g, ' ').trim()
        default:
            return text
    }
}

// 处理换行
const processLines = (text) => {
    switch (lineOption.value) {
        case 'remove':
            return text.replace(/\r?\n/g, ' ')
        case 'unix':
            return text.replace(/\r\n/g, '\n')
        case 'windows':
            return text.replace(/\r?\n/g, '\r\n')
        case 'double':
            return text.replace(/\r?\n/g, '\n\n')
        default:
            return text
    }
}

// 处理大小写
const processCase = (text) => {
    switch (caseOption.value) {
        case 'upper':
            return text.toUpperCase()
        case 'lower':
            return text.toLowerCase()
        case 'title':
            return text.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            })
        case 'sentence':
            return text.replace(/(^\s*|[.!?]\s+)(\w)/g, (match, p1, p2) => {
                return p1 + p2.toUpperCase()
            })
        case 'invert':
            return text.split('').map(char => {
                if (char === char.toUpperCase()) {
                    return char.toLowerCase()
                } else {
                    return char.toUpperCase()
                }
            }).join('')
        default:
            return text
    }
}

// 其他处理
const processOther = (text) => {
    let result = text
    
    // 移除标点符号
    if (removePunctuation.value) {
        result = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    }
    
    // 反转文本
    if (reverseText.value) {
        result = result.split('').reverse().join('')
    }
    
    // 按行排序
    if (sortLines.value) {
        const lines = result.split('\n')
        lines.sort()
        result = lines.join('\n')
    }
    
    return result
}

// 显示通知
const showNotification = (message, type = 'info') => {
    if (notification.value) {
        notification.value.show({
            title: getNotificationTitle(type),
            message: message,
            type: type,
            duration: 3000
        })
    }
}

// 获取通知标题
const getNotificationTitle = (type) => {
    const titles = {
        'success': '操作成功',
        'error': '操作失败',
        'warning': '提示',
        'info': '信息'
    }
    return titles[type] || '通知'
}

// 重置函数
const reset = () => {
    inputText.value = ''
    outputText.value = ''
    caseOption.value = 'none'
    spaceOption.value = 'none'
    lineOption.value = 'none'
    removePunctuation.value = false
    reverseText.value = false
    sortLines.value = false
    showNotification('已重置所有设置', 'info')
}

// 交换输入输出
const swap = () => {
    const temp = inputText.value
    inputText.value = outputText.value
    outputText.value = temp
    showNotification('已交换输入输出内容', 'info')
}

// 清空输入
const clearInput = () => {
    inputText.value = ''
    showNotification('已清空输入区', 'info')
}

// 清空输出
const clearOutput = () => {
    outputText.value = ''
    showNotification('已清空输出区', 'info')
}

// 复制输入
const copyInput = async () => {
    try {
        await navigator.clipboard.writeText(inputText.value)
        showNotification('输入文本已复制到剪贴板', 'success')
    } catch (err) {
        console.error('复制失败:', err)
        showNotification('复制失败，请手动复制文本', 'error')
    }
}

// 复制输出
const copyOutput = async () => {
    try {
        await navigator.clipboard.writeText(outputText.value)
        showNotification('输出文本已复制到剪贴板', 'success')
    } catch (err) {
        console.error('复制失败:', err)
        showNotification('复制失败，请手动复制文本', 'error')
    }
}
</script>

<script>
export default {
    name: 'TextFormatter',
    toolInfo: {
        id: 'text-format',
        name: '文本格式化工具',
        description: '快速格式化文本，包括大小写转换、空格处理等',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M159.744 888.832V135.168h360.448v196.608c0 17.92 14.848 32.768 32.768 32.768h196.608v158.208h65.536V299.008h-1.024c0.512-9.728-2.56-19.456-9.728-26.112l-194.048-193.536c-7.168-7.168-16.896-10.24-27.136-9.216H159.744c-36.352 0-65.536 29.184-65.536 65.536v753.152c0 36.352 29.184 65.536 65.536 65.536h392.192v-65.536H159.744z m425.984-737.792l148.48 147.968h-148.48V151.04z"></path><path d="M227.328 716.8h37.888c8.704 0.512 17.408-0.512 26.112-2.048 4.096-1.536 7.68-4.608 9.216-8.192 2.048-6.144 3.072-12.288 3.072-18.944V675.84c0.512-6.144-1.024-12.8-4.096-18.432-4.096-4.608-9.216-7.68-15.36-8.704 5.12-0.512 9.728-3.072 13.824-6.656 2.56-4.608 4.096-10.24 3.584-15.36 0.512-8.192-1.024-16.384-5.12-23.552-3.072-4.608-7.68-8.192-12.8-9.728-7.68-2.048-15.872-2.56-23.552-2.56h-32.768V716.8z m39.936-103.936c1.536 0.512 2.56 1.536 3.072 3.072 1.024 2.56 1.024 5.632 1.024 8.192 0.512 4.608 0 9.216-1.536 13.824-1.536 2.048-3.584 2.56-6.144 2.56h-3.072v-28.16c2.048-0.512 4.096 0 6.656 0.512z m2.048 49.152c1.536 3.072 2.048 6.656 1.536 9.728v11.776c0.512 3.072 0 6.656-2.048 9.728-2.56 1.536-5.632 2.56-8.704 2.048v-35.328c3.072-0.512 6.656 0.512 9.216 2.048z m78.336-19.456c0-3.584 0-7.168 1.024-10.752 0.512-1.536 2.56-2.56 4.096-2.048 1.536 0 3.072 1.024 4.096 2.56 1.024 3.584 1.536 7.168 1.024 10.752 0 3.072 0 5.632-1.024 8.704-5.12 3.584-10.752 6.656-16.384 8.192-6.656 2.048-12.8 5.12-18.432 9.728-3.072 4.608-4.096 10.24-3.584 15.872v8.704c-1.024 7.68 1.536 14.848 7.168 20.48 4.608 3.072 9.728 4.608 15.36 4.608 7.68 0.512 14.848-4.096 18.432-11.264v9.216h30.72V665.6c0.512-11.264 0-22.528-1.536-33.792-1.024-5.632-4.608-10.752-9.728-13.824-14.336-7.168-31.232-7.68-46.08-0.512-4.608 2.56-8.704 6.656-11.264 11.264-2.048 6.144-3.072 12.288-2.56 18.432v7.168h29.696l-1.024-11.776z m10.24 46.592c0 3.072 0 6.656-1.024 9.728-1.024 1.536-2.56 2.048-4.096 2.048s-3.584-0.512-4.096-2.56c-1.024-3.584-1.536-6.656-1.024-10.24 0-3.584 0.512-7.168 1.024-10.752 2.048-4.096 5.12-7.168 8.704-9.216v20.992h0.512z m109.056-48.64c0-4.096 0-7.68-1.024-11.264-1.024-3.072-2.56-5.632-4.608-8.192-3.072-3.072-6.656-5.632-11.264-7.168-5.632-2.048-11.776-2.56-17.408-2.56-6.144 0-12.288 1.024-18.432 3.072-4.608 1.536-8.704 5.12-11.264 9.216-2.56 5.632-3.584 11.776-3.072 18.432 0 5.12 1.024 10.24 3.072 15.36 4.096 6.144 10.24 11.264 16.896 14.336 6.144 3.072 12.288 7.168 18.432 11.264 1.536 3.072 2.048 6.144 1.536 9.216 0 2.56 0 5.12-1.536 7.168-1.024 1.024-3.072 2.048-4.608 1.536-1.536 0-3.584-1.024-4.096-2.56-1.024-3.584-1.536-7.168-1.024-10.752V680.96h-28.16v5.12c-0.512 6.656 0.512 13.312 3.072 19.456 2.56 4.608 6.656 8.192 11.776 10.24 6.656 2.56 13.312 4.096 20.48 3.584 6.144 0 12.8-1.024 18.432-3.584 4.608-2.048 8.704-5.632 10.752-9.728 2.56-6.144 3.584-12.8 3.072-18.944 0.512-6.144-1.024-12.288-4.096-17.408-5.12-5.632-11.264-9.728-17.92-12.8-4.608-2.048-9.216-4.608-13.824-7.68-1.536-1.024-3.072-3.072-4.096-5.12-0.512-2.048-0.512-4.608-0.512-7.168 0-2.048 0.512-3.584 1.536-5.12 1.024-1.024 2.56-2.048 4.096-1.536 1.536-0.512 3.072 0.512 4.096 2.048 0.512 3.072 1.024 6.144 1.024 9.216v5.632h28.16l0.512-6.656z m90.112 12.8c0.512-8.192-1.024-15.872-3.584-23.552-2.56-5.632-6.656-10.24-12.288-13.312-6.656-3.584-14.336-5.12-22.016-5.12-6.656 0-13.312 1.536-18.944 4.096-5.12 2.56-9.728 6.656-11.776 11.776-2.56 6.656-4.096 14.336-3.584 21.504v30.208c0 6.144 0.512 11.776 1.536 17.408 1.024 4.096 3.072 7.68 6.144 11.264s7.168 6.144 11.776 7.68c5.632 2.048 11.776 3.072 17.408 3.072s11.776-1.024 16.896-3.072c4.608-2.048 8.192-5.12 11.264-8.704 2.56-3.072 4.608-7.168 5.632-10.752 1.024-4.608 1.536-9.728 1.024-14.848v-7.68H527.36v13.824c0 3.584 0 7.168-1.024 10.24-1.024 2.048-2.56 3.072-4.608 2.56-1.536 0-3.072-0.512-4.096-2.048-1.024-3.072-1.024-6.144-1.024-9.216v-22.528h40.96l-0.512-12.8z m-40.448-3.072v-7.68c0-3.584 0-7.168 1.024-10.752 1.024-1.536 2.56-2.048 4.096-2.048s3.072 1.024 3.584 2.56c0.512 3.584 1.024 6.656 1.024 10.24v7.68h-9.728zM521.216 522.752H506.88v25.6h-34.816v-25.6H397.824v-28.672l56.832-111.616h39.424L438.784 492.544h33.792V450.56H506.88v41.984h14.336v30.208z m-175.104 21.504c-18.432 7.68-39.936 7.68-58.368 0-7.68-3.584-14.336-9.728-18.432-16.896-4.608-8.192-6.656-17.92-6.144-27.136 0-6.656 1.024-12.8 2.56-18.944 1.536-7.168 4.096-13.824 7.168-19.968 0.512-1.024 1.024-2.048 1.536-3.584s1.024-2.048 1.536-3.072l37.376-71.68h39.424L315.904 450.56c2.048-0.512 4.608-0.512 6.656-0.512 9.216-0.512 17.92 1.536 26.112 5.632 7.168 3.584 12.8 9.728 16.384 16.896 4.096 8.192 6.144 17.408 5.632 26.624 0.512 9.728-2.048 18.944-6.144 27.648-4.096 7.68-10.752 13.824-18.432 17.408z m-10.24-43.008c0.512-5.632-1.536-11.264-5.12-15.872-3.584-4.096-8.704-5.632-14.336-5.632-5.12-0.512-10.752 1.536-14.336 5.632-3.584 4.608-5.12 10.24-5.12 15.872-0.512 5.12 1.536 10.24 5.12 13.824 8.192 6.656 19.968 6.144 28.672 0 3.584-3.584 5.632-8.704 5.12-13.824zM916.48 669.184h-217.088c-2.56 0.512-4.608-1.024-4.608-3.584 0-34.816 28.672-62.976 64-62.976h14.848c14.336 0 27.648 4.608 37.888 12.288 10.24 8.192 20.48 22.016 34.816 21.504 10.24-0.512 22.016-8.704 20.992-21.504-17.92-33.28-53.248-56.32-93.184-56.32H757.76c-58.88 0-106.496 47.616-106.496 106.496v4.096h-35.84c-15.872 0-29.184 12.8-29.184 29.184v214.016c0 15.872 12.8 29.184 29.184 29.184H916.48c15.872 0 29.184-12.8 29.184-29.184v-214.016c0-15.872-13.312-29.184-29.184-29.184z m-24.064 224.768h-252.928v-176.64h252.928v176.64z"></path><path d="M765.952 878.08c9.728 0 17.408-7.68 17.408-17.408v-110.592c0-9.728-8.192-17.408-17.408-17.408-9.728 0-17.408 7.68-17.408 17.408v110.592c0 9.728 7.68 17.408 17.408 17.408z"></path></svg>',
        category: '文本'
    },
    title: '文本格式化工具'
}
</script>   