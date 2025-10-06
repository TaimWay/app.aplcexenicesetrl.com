<template>
    <div class="app-box">
        <!-- 添加通知组件 -->
        <Notification ref="notification" />
        
        <div class="app-header">
            <span class="title">颜色选择器</span>
            <span class="subtitle">直观的颜色选择工具，支持多种格式</span>
        </div>
        <div class="app-content">
            <div class="funct">
                <div class="glass-card">
                    <ul list-number>
                        <li>使用<span class="text-blod">颜色选择器</span>选择颜色或手动输入颜色值</li>
                        <li>选择所需的<span class="text-blod">颜色格式</span></li>
                        <li>实时预览<span class="text-blod">颜色效果</span></li>
                        <li>点击<span class="text-blod">复制</span>按钮以复制颜色值</li>
                    </ul>
                </div>
                <div class="glass-card">
                    <div class="form">
                        <div class="form-item">
                            <span class="form-title text-blod">颜色选择</span>
                            <div class="color-picker-container">
                                <input type="color" v-model="colorHex" class="color-picker" />
                                <input type="text" v-model="colorHex" class="color-input" placeholder="#000000" />
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">颜色格式</span>
                            <select v-model="colorFormat" name="color-format" id="color-format" class="useWebFonts">
                                <option value="hex">HEX (#RRGGBB)</option>
                                <option value="hex8">HEX8 (#RRGGBBAA)</option>
                                <option value="rgb">RGB (rgb(r,g,b))</option>
                                <option value="rgba">RGBA (rgba(r,g,b,a))</option>
                                <option value="hsl">HSL (hsl(h,s%,l%))</option>
                                <option value="hsla">HSLA (hsla(h,s%,l%,a))</option>
                                <option value="cmyk">CMYK (cmyk(c,m,y,k))</option>
                                <option value="name">颜色名称</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">透明度</span>
                            <div class="slider-container">
                                <input type="range" v-model="alpha" min="0" max="100" class="alpha-slider" />
                                <span class="alpha-value">{{ alpha }}%</span>
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">颜色值</span>
                            <div class="color-value-container">
                                <input class="color-value useWebFonts" type="text" v-model="currentColorValue" readonly />
                                <button class="btn btn-primary" @click="copyColorValue">复制</button>
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">最近颜色</span>
                            <div class="recent-colors">
                                <div 
                                    v-for="(color, index) in recentColors" 
                                    :key="index"
                                    class="recent-color"
                                    :style="{ backgroundColor: color }"
                                    @click="selectRecentColor(color)"
                                    :title="color"
                                ></div>
                            </div>
                        </div>
                        <div class="button-funct">
                            <button class="btn btn-ghost" @click="reset">重置</button>
                            <button class="btn btn-ghost" @click="randomColor">随机颜色</button>
                            <button class="btn btn-primary" @click="addToFavorites">收藏</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ioput">
                <div class="glass-card preview">
                    <div class="header">
                        <h1 class="title">颜色预览</h1>
                    </div>
                    <div class="preview-content">
                        <div class="color-display" :style="{ backgroundColor: currentColor }">
                            <div class="color-info">
                                <span class="color-text">{{ currentColorValue }}</span>
                                <span class="color-contrast" :style="{ color: textColor }">
                                    对比度文本示例
                                </span>
                            </div>
                        </div>
                        <div class="preview-grid">
                            <div class="preview-item" :style="{ backgroundColor: currentColor }">
                                <span>主色</span>
                            </div>
                            <div class="preview-item" :style="{ backgroundColor: lightColor }">
                                <span>浅色</span>
                            </div>
                            <div class="preview-item" :style="{ backgroundColor: darkColor }">
                                <span>深色</span>
                            </div>
                            <div class="preview-item" :style="{ backgroundColor: complementaryColor }">
                                <span>互补色</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="glass-card formats">
                    <div class="header">
                        <h1 class="title">颜色格式</h1>
                        <button class="btn btn-primary" @click="copyAllFormats">复制全部</button>
                    </div>
                    <div class="formats-content">
                        <div class="format-item" v-for="format in allFormats" :key="format.name">
                            <span class="format-name">{{ format.name }}</span>
                            <span class="format-value">{{ format.value }}</span>
                            <button class="btn btn-outline" @click="copyFormat(format.value)">复制</button>
                        </div>
                    </div>
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

.app-content .ioput .preview,
.app-content .ioput .formats {
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

.color-picker-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.color-picker {
    width: 60px;
    height: 40px;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
}

.color-input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid var(--border-input);
    border-radius: var(--radius-md);
    background: var(--bg-input);
    font-family: 'CascadiaCode', monospace;
}

.slider-container {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
}

.alpha-slider {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: var(--slider-track);
    outline: none;
    -webkit-appearance: none;
}

.alpha-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--slider-thumb);
    cursor: pointer;
}

.alpha-value {
    min-width: 40px;
    text-align: center;
    font-weight: 500;
}

.color-value-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.color-value {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid var(--border-input);
    border-radius: var(--radius-md);
    background: var(--bg-input);
    font-family: 'CascadiaCode', monospace;
}

.recent-colors {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    width: 100%;
}

.recent-color {
    width: 30px;
    height: 30px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-input);
    cursor: pointer;
    transition: transform 0.2s ease;
}

.recent-color:hover {
    transform: scale(1.1);
}

.preview-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.color-display {
    height: 120px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.color-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.color-text {
    font-size: 1.2rem;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.8);
    padding: 5px 10px;
    border-radius: var(--radius-md);
}

.color-contrast {
    font-size: 1rem;
    font-weight: 500;
}

.preview-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.preview-item {
    height: 60px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    border: 1px solid var(--border-input);
}

.formats-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.format-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    background: var(--bg-input);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-input);
}

.format-name {
    font-weight: 500;
    min-width: 100px;
}

.format-value {
    flex: 1;
    margin: 0 15px;
    font-family: 'CascadiaCode', monospace;
    font-size: 0.9rem;
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

    .color-picker-container {
        flex-direction: column;
        align-items: stretch;
    }

    .color-picker {
        width: 100%;
        height: 50px;
    }

    .preview-grid {
        grid-template-columns: 1fr;
    }

    .format-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .format-value {
        margin: 0;
        width: 100%;
        word-break: break-all;
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

    .preview-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

<script setup>
import { ref, computed, watch } from 'vue'
import Notification from '../../components/ui/Notification.vue'

// 响应式数据
const colorHex = ref('#3b82f6')
const colorFormat = ref('hex')
const alpha = ref(100)
const recentColors = ref([])

// 通知组件引用
const notification = ref(null)

// 计算属性：当前颜色值（带透明度）
const currentColor = computed(() => {
    if (alpha.value === 100) {
        return colorHex.value
    }
    
    const hex = colorHex.value
    const alphaHex = Math.round(alpha.value * 255 / 100).toString(16).padStart(2, '0')
    return hex + alphaHex
})

// 计算属性：根据格式显示的颜色值
const currentColorValue = computed(() => {
    return formatColor(currentColor.value, colorFormat.value)
})

// 计算属性：文本颜色（根据背景色自动选择黑色或白色）
const textColor = computed(() => {
    const hex = colorHex.value.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    // 计算亮度（YIQ公式）
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
    return yiq >= 128 ? '#000000' : '#ffffff'
})

// 计算属性：浅色版本
const lightColor = computed(() => {
    return lightenColor(colorHex.value, 30)
})

// 计算属性：深色版本
const darkColor = computed(() => {
    return darkenColor(colorHex.value, 30)
})

// 计算属性：互补色
const complementaryColor = computed(() => {
    return getComplementaryColor(colorHex.value)
})

// 计算属性：所有格式的颜色值
const allFormats = computed(() => {
    const color = currentColor.value
    return [
        { name: 'HEX', value: formatColor(color, 'hex') },
        { name: 'HEX8', value: formatColor(color, 'hex8') },
        { name: 'RGB', value: formatColor(color, 'rgb') },
        { name: 'RGBA', value: formatColor(color, 'rgba') },
        { name: 'HSL', value: formatColor(color, 'hsl') },
        { name: 'HSLA', value: formatColor(color, 'hsla') },
        { name: 'CMYK', value: formatColor(color, 'cmyk') },
        { name: '颜色名称', value: getColorName(color) }
    ]
})

// 颜色格式转换函数
const formatColor = (color, format) => {
    const hex = color.replace('#', '')
    let r, g, b, a
    
    if (hex.length === 8) {
        r = parseInt(hex.substr(0, 2), 16)
        g = parseInt(hex.substr(2, 2), 16)
        b = parseInt(hex.substr(4, 2), 16)
        a = parseInt(hex.substr(6, 2), 16) / 255
    } else {
        r = parseInt(hex.substr(0, 2), 16)
        g = parseInt(hex.substr(2, 2), 16)
        b = parseInt(hex.substr(4, 2), 16)
        a = alpha.value / 100
    }
    
    switch (format) {
        case 'hex':
            return `#${hex.substr(0, 6)}`
        case 'hex8':
            const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0')
            return `#${hex.substr(0, 6)}${alphaHex}`
        case 'rgb':
            return `rgb(${r}, ${g}, ${b})`
        case 'rgba':
            return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
        case 'hsl':
            const hsl = rgbToHsl(r, g, b)
            return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
        case 'hsla':
            const hsla = rgbToHsl(r, g, b)
            return `hsla(${Math.round(hsla.h)}, ${Math.round(hsla.s)}%, ${Math.round(hsla.l)}%, ${a.toFixed(2)})`
        case 'cmyk':
            const cmyk = rgbToCmyk(r, g, b)
            return `cmyk(${Math.round(cmyk.c)}%, ${Math.round(cmyk.m)}%, ${Math.round(cmyk.y)}%, ${Math.round(cmyk.k)}%)`
        case 'name':
            return getColorName(color)
        default:
            return color
    }
}

// RGB 转 HSL
const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    
    if (max === min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break
            case g: h = (b - r) / d + 2; break
            case b: h = (r - g) / d + 4; break
        }
        
        h /= 6
    }
    
    return {
        h: h * 360,
        s: s * 100,
        l: l * 100
    }
}

// RGB 转 CMYK
const rgbToCmyk = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    
    const k = 1 - Math.max(r, g, b)
    const c = (1 - r - k) / (1 - k) || 0
    const m = (1 - g - k) / (1 - k) || 0
    const y = (1 - b - k) / (1 - k) || 0
    
    return {
        c: c * 100,
        m: m * 100,
        y: y * 100,
        k: k * 100
    }
}

// 获取颜色名称
const getColorName = (color) => {
    const colorNames = {
        '#000000': '黑色',
        '#ffffff': '白色',
        '#ff0000': '红色',
        '#00ff00': '绿色',
        '#0000ff': '蓝色',
        '#ffff00': '黄色',
        '#ff00ff': '品红色',
        '#00ffff': '青色',
        '#ffa500': '橙色',
        '#800080': '紫色',
        '#008000': '深绿色',
        '#800000': '栗色',
        '#808000': '橄榄色',
        '#000080': '海军蓝',
        '#808080': '灰色'
    }
    
    // 简化颜色匹配（在实际应用中可能需要更复杂的匹配算法）
    const hex = color.length === 9 ? color.substr(0, 7) : color
    return colorNames[hex.toLowerCase()] || '未知颜色'
}

// 变亮颜色
const lightenColor = (color, percent) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    const newR = Math.min(255, r + (255 - r) * percent / 100)
    const newG = Math.min(255, g + (255 - g) * percent / 100)
    const newB = Math.min(255, b + (255 - b) * percent / 100)
    
    return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`
}

// 变暗颜色
const darkenColor = (color, percent) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    const newR = Math.max(0, r - r * percent / 100)
    const newG = Math.max(0, g - g * percent / 100)
    const newB = Math.max(0, b - b * percent / 100)
    
    return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`
}

// 获取互补色
const getComplementaryColor = (color) => {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    const newR = 255 - r
    const newG = 255 - g
    const newB = 255 - b
    
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

// 监听颜色变化，添加到最近使用
watch(colorHex, (newColor) => {
    if (!recentColors.value.includes(newColor)) {
        recentColors.value.unshift(newColor)
        if (recentColors.value.length > 8) {
            recentColors.value.pop()
        }
    }
})

// 选择最近颜色
const selectRecentColor = (color) => {
    colorHex.value = color
}

// 生成随机颜色
const randomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    colorHex.value = color
    showNotification('已生成随机颜色', 'success')
}

// 添加到收藏
const addToFavorites = () => {
    // 在实际应用中，这里可以保存到本地存储或用户账户
    showNotification('颜色已添加到收藏', 'success')
}

// 复制颜色值
const copyColorValue = async () => {
    try {
        await navigator.clipboard.writeText(currentColorValue.value)
        showNotification('颜色值已复制到剪贴板', 'success')
    } catch (err) {
        console.error('复制失败:', err)
        showNotification('复制失败，请手动复制', 'error')
    }
}

// 复制格式值
const copyFormat = async (value) => {
    try {
        await navigator.clipboard.writeText(value)
        showNotification('格式值已复制到剪贴板', 'success')
    } catch (err) {
        console.error('复制失败:', err)
        showNotification('复制失败，请手动复制', 'error')
    }
}

// 复制所有格式
const copyAllFormats = async () => {
    const allText = allFormats.value.map(format => `${format.name}: ${format.value}`).join('\n')
    try {
        await navigator.clipboard.writeText(allText)
        showNotification('所有颜色格式已复制到剪贴板', 'success')
    } catch (err) {
        console.error('复制失败:', err)
        showNotification('复制失败，请手动复制', 'error')
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
    colorHex.value = '#3b82f6'
    colorFormat.value = 'hex'
    alpha.value = 100
    showNotification('已重置颜色设置', 'info')
}
</script>

<script>
export default {
    name: 'ColorPicker',
    toolInfo: {
        id: 'color-picker',
        name: '颜色选择器',
        description: '直观的颜色选择工具，支持多种格式',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M159.744 888.832V135.168h360.448v196.608c0 17.92 14.848 32.768 32.768 32.768h196.608v158.208h65.536V299.008h-1.024c0.512-9.728-2.56-19.456-9.728-26.112l-194.048-193.536c-7.168-7.168-16.896-10.24-27.136-9.216H159.744c-36.352 0-65.536 29.184-65.536 65.536v753.152c0 36.352 29.184 65.536 65.536 65.536h392.192v-65.536H159.744z m425.984-737.792l148.48 147.968h-148.48V151.04z"></path><path d="M227.328 716.8h37.888c8.704 0.512 17.408-0.512 26.112-2.048 4.096-1.536 7.68-4.608 9.216-8.192 2.048-6.144 3.072-12.288 3.072-18.944V675.84c0.512-6.144-1.024-12.8-4.096-18.432-4.096-4.608-9.216-7.68-15.36-8.704 5.12-0.512 9.728-3.072 13.824-6.656 2.56-4.608 4.096-10.24 3.584-15.36 0.512-8.192-1.024-16.384-5.12-23.552-3.072-4.608-7.68-8.192-12.8-9.728-7.68-2.048-15.872-2.56-23.552-2.56h-32.768V716.8z m39.936-103.936c1.536 0.512 2.56 1.536 3.072 3.072 1.024 2.56 1.024 5.632 1.024 8.192 0.512 4.608 0 9.216-1.536 13.824-1.536 2.048-3.584 2.56-6.144 2.56h-3.072v-28.16c2.048-0.512 4.096 0 6.656 0.512z m2.048 49.152c1.536 3.072 2.048 6.656 1.536 9.728v11.776c0.512 3.072 0 6.656-2.048 9.728-2.56 1.536-5.632 2.56-8.704 2.048v-35.328c3.072-0.512 6.656 0.512 9.216 2.048z m78.336-19.456c0-3.584 0-7.168 1.024-10.752 0.512-1.536 2.56-2.56 4.096-2.048 1.536 0 3.072 1.024 4.096 2.56 1.024 3.584 1.536 7.168 1.024 10.752 0 3.072 0 5.632-1.024 8.704-5.12 3.584-10.752 6.656-16.384 8.192-6.656 2.048-12.8 5.12-18.432 9.728-3.072 4.608-4.096 10.24-3.584 15.872v8.704c-1.024 7.68 1.536 14.848 7.168 20.48 4.608 3.072 9.728 4.608 15.36 4.608 7.68 0.512 14.848-4.096 18.432-11.264v9.216h30.72V665.6c0.512-11.264 0-22.528-1.536-33.792-1.024-5.632-4.608-10.752-9.728-13.824-14.336-7.168-31.232-7.68-46.08-0.512-4.608 2.56-8.704 6.656-11.264 11.264-2.048 6.144-3.072 12.288-2.56 18.432v7.168h29.696l-1.024-11.776z m10.24 46.592c0 3.072 0 6.656-1.024 9.728-1.024 1.536-2.56 2.048-4.096 2.048s-3.584-0.512-4.096-2.56c-1.024-3.584-1.536-6.656-1.024-10.24 0-3.584 0.512-7.168 1.024-10.752 2.048-4.096 5.12-7.168 8.704-9.216v20.992h0.512z m109.056-48.64c0-4.096 0-7.68-1.024-11.264-1.024-3.072-2.56-5.632-4.608-8.192-3.072-3.072-6.656-5.632-11.264-7.168-5.632-2.048-11.776-2.56-17.408-2.56-6.144 0-12.288 1.024-18.432 3.072-4.608 1.536-8.704 5.12-11.264 9.216-2.56 5.632-3.584 11.776-3.072 18.432 0 5.12 1.024 10.24 3.072 15.36 4.096 6.144 10.24 11.264 16.896 14.336 6.144 3.072 12.288 7.168 18.432 11.264 1.536 3.072 2.048 6.144 1.536 9.216 0 2.56 0 5.12-1.536 7.168-1.024 1.024-3.072 2.048-4.608 1.536-1.536 0-3.584-1.024-4.096-2.56-1.024-3.584-1.536-7.168-1.024-10.752V680.96h-28.16v5.12c-0.512 6.656 0.512 13.312 3.072 19.456 2.56 4.608 6.656 8.192 11.776 10.24 6.656 2.56 13.312 4.096 20.48 3.584 6.144 0 12.8-1.024 18.432-3.584 4.608-2.048 8.704-5.632 10.752-9.728 2.56-6.144 3.584-12.8 3.072-18.944 0.512-6.144-1.024-12.288-4.096-17.408-5.12-5.632-11.264-9.728-17.92-12.8-4.608-2.048-9.216-4.608-13.824-7.68-1.536-1.024-3.072-3.072-4.096-5.12-0.512-2.048-0.512-4.608-0.512-7.168 0-2.048 0.512-3.584 1.536-5.12 1.024-1.024 2.56-2.048 4.096-1.536 1.536-0.512 3.072 0.512 4.096 2.048 0.512 3.072 1.024 6.144 1.024 9.216v5.632h28.16l0.512-6.656z m90.112 12.8c0.512-8.192-1.024-15.872-3.584-23.552-2.56-5.632-6.656-10.24-12.288-13.312-6.656-3.584-14.336-5.12-22.016-5.12-6.656 0-13.312 1.536-18.944 4.096-5.12 2.56-9.728 6.656-11.776 11.776-2.56 6.656-4.096 14.336-3.584 21.504v30.208c0 6.144 0.512 11.776 1.536 17.408 1.024 4.096 3.072 7.68 6.144 11.264s7.168 6.144 11.776 7.68c5.632 2.048 11.776 3.072 17.408 3.072s11.776-1.024 16.896-3.072c4.608-2.048 8.192-5.12 11.264-8.704 2.56-3.072 4.608-7.168 5.632-10.752 1.024-4.608 1.536-9.728 1.024-14.848v-7.68H527.36v13.824c0 3.584 0 7.168-1.024 10.24-1.024 2.048-2.56 3.072-4.608 2.56-1.536 0-3.072-0.512-4.096-2.048-1.024-3.072-1.024-6.144-1.024-9.216v-22.528h40.96l-0.512-12.8z m-40.448-3.072v-7.68c0-3.584 0-7.168 1.024-10.752 1.024-1.536 2.56-2.048 4.096-2.048s3.072 1.024 3.584 2.56c0.512 3.584 1.024 6.656 1.024 10.24v7.68h-9.728zM521.216 522.752H506.88v25.6h-34.816v-25.6H397.824v-28.672l56.832-111.616h39.424L438.784 492.544h33.792V450.56H506.88v41.984h14.336v30.208z m-175.104 21.504c-18.432 7.68-39.936 7.68-58.368 0-7.68-3.584-14.336-9.728-18.432-16.896-4.608-8.192-6.656-17.92-6.144-27.136 0-6.656 1.024-12.8 2.56-18.944 1.536-7.168 4.096-13.824 7.168-19.968 0.512-1.024 1.024-2.048 1.536-3.584s1.024-2.048 1.536-3.072l37.376-71.68h39.424L315.904 450.56c2.048-0.512 4.608-0.512 6.656-0.512 9.216-0.512 17.92 1.536 26.112 5.632 7.168 3.584 12.8 9.728 16.384 16.896 4.096 8.192 6.144 17.408 5.632 26.624 0.512 9.728-2.048 18.944-6.144 27.648-4.096 7.68-10.752 13.824-18.432 17.408z m-10.24-43.008c0.512-5.632-1.536-11.264-5.12-15.872-3.584-4.096-8.704-5.632-14.336-5.632-5.12-0.512-10.752 1.536-14.336 5.632-3.584 4.608-5.12 10.24-5.12 15.872-0.512 5.12 1.536 10.24 5.12 13.824 8.192 6.656 19.968 6.144 28.672 0 3.584-3.584 5.632-8.704 5.12-13.824zM916.48 669.184h-217.088c-2.56 0.512-4.608-1.024-4.608-3.584 0-34.816 28.672-62.976 64-62.976h14.848c14.336 0 27.648 4.608 37.888 12.288 10.24 8.192 20.48 22.016 34.816 21.504 10.24-0.512 22.016-8.704 20.992-21.504-17.92-33.28-53.248-56.32-93.184-56.32H757.76c-58.88 0-106.496 47.616-106.496 106.496v4.096h-35.84c-15.872 0-29.184 12.8-29.184 29.184v214.016c0 15.872 12.8 29.184 29.184 29.184H916.48c15.872 0 29.184-12.8 29.184-29.184v-214.016c0-15.872-13.312-29.184-29.184-29.184z m-24.064 224.768h-252.928v-176.64h252.928v176.64z"></path><path d="M765.952 878.08c9.728 0 17.408-7.68 17.408-17.408v-110.592c0-9.728-8.192-17.408-17.408-17.408-9.728 0-17.408 7.68-17.408 17.408v110.592c0 9.728 7.68 17.408 17.408 17.408z"></path></svg>',
        category: '设计'
    },
    title: '颜色选择器'
}
</script>