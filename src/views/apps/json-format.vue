<template>
    <div class="app-box">
        <!-- 添加通知组件 -->
        <Notification ref="notification" />
        
        <div class="app-header">
            <span class="title">JSON 格式化工具</span>
            <span class="subtitle">美化和验证 JSON 数据，提高可读性</span>
        </div>
        <div class="app-content">
            <div class="funct">
                <div class="glass-card">
                    <ul list-number>
                        <li>将需要<span class="text-blod">格式化/验证</span>的 JSON 输入到<span class="text-blod">输入区</span>中</li>
                        <li>选择<span class="text-blod">格式化</span>所需的选项</li>
                        <li>点击<span class="text-blod">格式化</span>按钮进行处理</li>
                        <li><span class="text-blod">格式化</span>后的 JSON 会输出到<span class="text-blod">输出区</span>，可点击<span
                                class="text-blod">复制</span>按钮以复制文本</li>
                    </ul>
                </div>
                <div class="glass-card">
                    <div class="form">
                        <div class="form-item">
                            <span class="form-title text-blod">缩进方式</span>
                            <select v-model="indentOption" name="indent-option" id="indent-option" class="useWebFonts">
                                <option value="2">2 个空格</option>
                                <option value="4" selected>4 个空格</option>
                                <option value="tab">制表符</option>
                                <option value="minify">压缩（无缩进）</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">JSON 类型</span>
                            <select v-model="jsonType" name="json-type" id="json-type" class="useWebFonts">
                                <option value="auto" selected>自动检测</option>
                                <option value="object">对象</option>
                                <option value="array">数组</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">其他选项</span>
                            <div class="checkbox-group">
                                <label class="checkbox-item">
                                    <input type="checkbox" v-model="sortKeys" />
                                    <span class="checkmark"></span>
                                    按键名排序
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" v-model="escapeUnicode" />
                                    <span class="checkmark"></span>
                                    转义 Unicode 字符
                                </label>
                                <label class="checkbox-item">
                                    <input type="checkbox" v-model="validateOnly" />
                                    <span class="checkmark"></span>
                                    仅验证不格式化
                                </label>
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">验证信息</span>
                            <div class="validation-info" :class="validationClass">
                                <span class="validation-text">{{ validationMessage }}</span>
                            </div>
                        </div>
                        <div class="button-funct">
                            <button class="btn btn-ghost" @click="reset">重置</button>
                            <button class="btn btn-ghost" @click="swap">交换</button>
                            <button class="btn btn-outline" @click="compress">压缩</button>
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
                    <textarea class="editor glass-card code-list" v-model="inputText" name="json-input" id="json-input"
                        placeholder="请输入 JSON 数据..." @input="validateJson"></textarea>
                </div>
                <div class="glass-card output">
                    <div class="header">
                        <h1 class="title">输出区</h1>
                        <button class="btn btn-outline" @click="clearOutput">清空</button>
                        <button class="btn btn-primary" @click="copyOutput">复制</button>
                    </div>
                    <textarea class="editor glass-card code-list" v-model="outputText" name="json-output"
                        id="json-output" placeholder="等待格式化 JSON..." readonly></textarea>
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

.validation-info {
    padding: 10px 15px;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    width: 100%;
    text-align: center;
    transition: var(--transition-fast);
}

.validation-success {
    background-color: rgba(46, 213, 115, 0.1);
    border: 1px solid rgba(46, 213, 115, 0.3);
    color: var(--color-success);
}

.validation-warning {
    background-color: rgba(255, 165, 2, 0.1);
    border: 1px solid rgba(255, 165, 2, 0.3);
    color: var(--color-warning);
}

.validation-error {
    background-color: rgba(232, 65, 24, 0.1);
    border: 1px solid rgba(232, 65, 24, 0.3);
    color: var(--color-error);
}

.validation-info .validation-text {
    font-weight: 500;
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
    font-family: 'CascadiaCode', monospace;
    font-size: 14px;
    line-height: 1.5;
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
const indentOption = ref('4')
const jsonType = ref('auto')
const sortKeys = ref(false)
const escapeUnicode = ref(false)
const validateOnly = ref(false)
const validationMessage = ref('等待输入 JSON 数据...')
const validationClass = ref('validation-info')

// 通知组件引用
const notification = ref(null)

// 计算属性：验证状态
const validationStatus = computed(() => {
    if (!inputText.value.trim()) {
        return {
            message: '等待输入 JSON 数据...',
            class: 'validation-info'
        }
    }
    
    try {
        JSON.parse(inputText.value)
        return {
            message: 'JSON 格式正确',
            class: 'validation-success'
        }
    } catch (error) {
        return {
            message: `JSON 格式错误: ${error.message}`,
            class: 'validation-error'
        }
    }
})

// 验证 JSON
const validateJson = () => {
    const status = validationStatus.value
    validationMessage.value = status.message
    validationClass.value = status.class
}

// 格式化函数
const format = () => {
    if (!inputText.value.trim()) {
        showNotification('请输入要格式化的 JSON 数据', 'warning')
        return
    }

    try {
        const parsedJson = JSON.parse(inputText.value)
        
        if (validateOnly.value) {
            outputText.value = 'JSON 格式验证通过'
            showNotification('JSON 格式正确', 'success')
            return
        }
        
        let indent = '  ' // 默认2个空格
        if (indentOption.value === '4') {
            indent = '    '
        } else if (indentOption.value === 'tab') {
            indent = '\t'
        } else if (indentOption.value === 'minify') {
            indent = null
        }
        
        let replacer = null
        if (sortKeys.value) {
            replacer = (key, value) => {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    return Object.keys(value).sort().reduce((sorted, key) => {
                        sorted[key] = value[key]
                        return sorted
                    }, {})
                }
                return value
            }
        }
        
        outputText.value = JSON.stringify(parsedJson, replacer, indent)
        
        if (escapeUnicode.value) {
            outputText.value = outputText.value.replace(/[\u007F-\uFFFF]/g, (chr) => {
                return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
            })
        }
        
        showNotification('JSON 格式化成功', 'success')
    } catch (error) {
        outputText.value = `JSON 格式化错误: ${error.message}`
        showNotification(`JSON 格式化失败: ${error.message}`, 'error')
    }
}

// 压缩函数
const compress = () => {
    if (!inputText.value.trim()) {
        showNotification('请输入要压缩的 JSON 数据', 'warning')
        return
    }

    try {
        const parsedJson = JSON.parse(inputText.value)
        outputText.value = JSON.stringify(parsedJson)
        showNotification('JSON 压缩成功', 'success')
    } catch (error) {
        outputText.value = `JSON 压缩错误: ${error.message}`
        showNotification(`JSON 压缩失败: ${error.message}`, 'error')
    }
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
    indentOption.value = '4'
    jsonType.value = 'auto'
    sortKeys.value = false
    escapeUnicode.value = false
    validateOnly.value = false
    validationMessage.value = '等待输入 JSON 数据...'
    validationClass.value = 'validation-info'
    showNotification('已重置所有设置', 'info')
}

// 交换输入输出
const swap = () => {
    const temp = inputText.value
    inputText.value = outputText.value
    outputText.value = temp
    validateJson()
    showNotification('已交换输入输出内容', 'info')
}

// 清空输入
const clearInput = () => {
    inputText.value = ''
    validateJson()
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
    name: 'JsonFormatter',
    toolInfo: {
        id: 'json-format',
        name: 'JSON 格式化工具',
        description: '美化和验证 JSON 数据，提高可读性',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M159.744 888.832V135.168h360.448v196.608c0 17.92 14.848 32.768 32.768 32.768h196.608v158.208h65.536V299.008h-1.024c0.512-9.728-2.56-19.456-9.728-26.112l-194.048-193.536c-7.168-7.168-16.896-10.24-27.136-9.216H159.744c-36.352 0-65.536 29.184-65.536 65.536v753.152c0 36.352 29.184 65.536 65.536 65.536h392.192v-65.536H159.744z m425.984-737.792l148.48 147.968h-148.48V151.04z"></path><path d="M227.328 716.8h37.888c8.704 0.512 17.408-0.512 26.112-2.048 4.096-1.536 7.68-4.608 9.216-8.192 2.048-6.144 3.072-12.288 3.072-18.944V675.84c0.512-6.144-1.024-12.8-4.096-18.432-4.096-4.608-9.216-7.68-15.36-8.704 5.12-0.512 9.728-3.072 13.824-6.656 2.56-4.608 4.096-10.24 3.584-15.36 0.512-8.192-1.024-16.384-5.12-23.552-3.072-4.608-7.68-8.192-12.8-9.728-7.68-2.048-15.872-2.56-23.552-2.56h-32.768V716.8z m39.936-103.936c1.536 0.512 2.56 1.536 3.072 3.072 1.024 2.56 1.024 5.632 1.024 8.192 0.512 4.608 0 9.216-1.536 13.824-1.536 2.048-3.584 2.56-6.144 2.56h-3.072v-28.16c2.048-0.512 4.096 0 6.656 0.512z m2.048 49.152c1.536 3.072 2.048 6.656 1.536 9.728v11.776c0.512 3.072 0 6.656-2.048 9.728-2.56 1.536-5.632 2.56-8.704 2.048v-35.328c3.072-0.512 6.656 0.512 9.216 2.048z m78.336-19.456c0-3.584 0-7.168 1.024-10.752 0.512-1.536 2.56-2.56 4.096-2.048 1.536 0 3.072 1.024 4.096 2.56 1.024 3.584 1.536 7.168 1.024 10.752 0 3.072 0 5.632-1.024 8.704-5.12 3.584-10.752 6.656-16.384 8.192-6.656 2.048-12.8 5.12-18.432 9.728-3.072 4.608-4.096 10.24-3.584 15.872v8.704c-1.024 7.68 1.536 14.848 7.168 20.48 4.608 3.072 9.728 4.608 15.36 4.608 7.68 0.512 14.848-4.096 18.432-11.264v9.216h30.72V665.6c0.512-11.264 0-22.528-1.536-33.792-1.024-5.632-4.608-10.752-9.728-13.824-14.336-7.168-31.232-7.68-46.08-0.512-4.608 2.56-8.704 6.656-11.264 11.264-2.048 6.144-3.072 12.288-2.56 18.432v7.168h29.696l-1.024-11.776z m10.24 46.592c0 3.072 0 6.656-1.024 9.728-1.024 1.536-2.56 2.048-4.096 2.048s-3.584-0.512-4.096-2.56c-1.024-3.584-1.536-6.656-1.024-10.24 0-3.584 0.512-7.168 1.024-10.752 2.048-4.096 5.12-7.168 8.704-9.216v20.992h0.512z m109.056-48.64c0-4.096 0-7.68-1.024-11.264-1.024-3.072-2.56-5.632-4.608-8.192-3.072-3.072-6.656-5.632-11.264-7.168-5.632-2.048-11.776-2.56-17.408-2.56-6.144 0-12.288 1.024-18.432 3.072-4.608 1.536-8.704 5.12-11.264 9.216-2.56 5.632-3.584 11.776-3.072 18.432 0 5.12 1.024 10.24 3.072 15.36 4.096 6.144 10.24 11.264 16.896 14.336 6.144 3.072 12.288 7.168 18.432 11.264 1.536 3.072 2.048 6.144 1.536 9.216 0 2.56 0 5.12-1.536 7.168-1.024 1.024-3.072 2.048-4.608 1.536-1.536 0-3.584-1.024-4.096-2.56-1.024-3.584-1.536-7.168-1.024-10.752V680.96h-28.16v5.12c-0.512 6.656 0.512 13.312 3.072 19.456 2.56 4.608 6.656 8.192 11.776 10.24 6.656 2.56 13.312 4.096 20.48 3.584 6.144 0 12.8-1.024 18.432-3.584 4.608-2.048 8.704-5.632 10.752-9.728 2.56-6.144 3.584-12.8 3.072-18.944 0.512-6.144-1.024-12.288-4.096-17.408-5.12-5.632-11.264-9.728-17.92-12.8-4.608-2.048-9.216-4.608-13.824-7.68-1.536-1.024-3.072-3.072-4.096-5.12-0.512-2.048-0.512-4.608-0.512-7.168 0-2.048 0.512-3.584 1.536-5.12 1.024-1.024 2.56-2.048 4.096-1.536 1.536-0.512 3.072 0.512 4.096 2.048 0.512 3.072 1.024 6.144 1.024 9.216v5.632h28.16l0.512-6.656z m90.112 12.8c0.512-8.192-1.024-15.872-3.584-23.552-2.56-5.632-6.656-10.24-12.288-13.312-6.656-3.584-14.336-5.12-22.016-5.12-6.656 0-13.312 1.536-18.944 4.096-5.12 2.56-9.728 6.656-11.776 11.776-2.56 6.656-4.096 14.336-3.584 21.504v30.208c0 6.144 0.512 11.776 1.536 17.408 1.024 4.096 3.072 7.68 6.144 11.264s7.168 6.144 11.776 7.68c5.632 2.048 11.776 3.072 17.408 3.072s11.776-1.024 16.896-3.072c4.608-2.048 8.192-5.12 11.264-8.704 2.56-3.072 4.608-7.168 5.632-10.752 1.024-4.608 1.536-9.728 1.024-14.848v-7.68H527.36v13.824c0 3.584 0 7.168-1.024 10.24-1.024 2.048-2.56 3.072-4.608 2.56-1.536 0-3.072-0.512-4.096-2.048-1.024-3.072-1.024-6.144-1.024-9.216v-22.528h40.96l-0.512-12.8z m-40.448-3.072v-7.68c0-3.584 0-7.168 1.024-10.752 1.024-1.536 2.56-2.048 4.096-2.048s3.072 1.024 3.584 2.56c0.512 3.584 1.024 6.656 1.024 10.24v7.68h-9.728zM521.216 522.752H506.88v25.6h-34.816v-25.6H397.824v-28.672l56.832-111.616h39.424L438.784 492.544h33.792V450.56H506.88v41.984h14.336v30.208z m-175.104 21.504c-18.432 7.68-39.936 7.68-58.368 0-7.68-3.584-14.336-9.728-18.432-16.896-4.608-8.192-6.656-17.92-6.144-27.136 0-6.656 1.024-12.8 2.56-18.944 1.536-7.168 4.096-13.824 7.168-19.968 0.512-1.024 1.024-2.048 1.536-3.584s1.024-2.048 1.536-3.072l37.376-71.68h39.424L315.904 450.56c2.048-0.512 4.608-0.512 6.656-0.512 9.216-0.512 17.92 1.536 26.112 5.632 7.168 3.584 12.8 9.728 16.384 16.896 4.096 8.192 6.144 17.408 5.632 26.624 0.512 9.728-2.048 18.944-6.144 27.648-4.096 7.68-10.752 13.824-18.432 17.408z m-10.24-43.008c0.512-5.632-1.536-11.264-5.12-15.872-3.584-4.096-8.704-5.632-14.336-5.632-5.12-0.512-10.752 1.536-14.336 5.632-3.584 4.608-5.12 10.24-5.12 15.872-0.512 5.12 1.536 10.24 5.12 13.824 8.192 6.656 19.968 6.144 28.672 0 3.584-3.584 5.632-8.704 5.12-13.824zM916.48 669.184h-217.088c-2.56 0.512-4.608-1.024-4.608-3.584 0-34.816 28.672-62.976 64-62.976h14.848c14.336 0 27.648 4.608 37.888 12.288 10.24 8.192 20.48 22.016 34.816 21.504 10.24-0.512 22.016-8.704 20.992-21.504-17.92-33.28-53.248-56.32-93.184-56.32H757.76c-58.88 0-106.496 47.616-106.496 106.496v4.096h-35.84c-15.872 0-29.184 12.8-29.184 29.184v214.016c0 15.872 12.8 29.184 29.184 29.184H916.48c15.872 0 29.184-12.8 29.184-29.184v-214.016c0-15.872-13.312-29.184-29.184-29.184z m-24.064 224.768h-252.928v-176.64h252.928v176.64z"></path><path d="M765.952 878.08c9.728 0 17.408-7.68 17.408-17.408v-110.592c0-9.728-8.192-17.408-17.408-17.408-9.728 0-17.408 7.68-17.408 17.408v110.592c0 9.728 7.68 17.408 17.408 17.408z"></path></svg>',
        category: '开发'
    },
    title: 'JSON 格式化工具'
}
</script>