<template>
    <div class="app-box">
        <!-- 添加通知组件 -->
        <Notification ref="notification" />
        
        <div class="app-header">
            <span class="title">二维码生成器</span>
            <span class="subtitle">快速生成自定义二维码，支持多种内容</span>
        </div>
        <div class="app-content">
            <div class="funct">
                <div class="glass-card">
                    <ul list-number>
                        <li>选择<span class="text-blod">内容类型</span>并输入相应内容</li>
                        <li>自定义二维码的<span class="text-blod">尺寸、颜色和样式</span></li>
                        <li>选择<span class="text-blod">纠错级别</span>和添加<span class="text-blod">LOGO</span></li>
                        <li>点击<span class="text-blod">生成</span>按钮创建二维码</li>
                        <li>使用<span class="text-blod">刷新、复制、下载</span>按钮管理二维码</li>
                    </ul>
                </div>
                <div class="glass-card">
                    <div class="form">
                        <div class="form-item">
                            <span class="form-title text-blod">内容类型</span>
                            <select v-model="contentType" name="content-type" id="content-type" class="useWebFonts" @change="onContentTypeChange">
                                <option value="text">文本</option>
                                <option value="url">URL</option>
                                <option value="email">电子邮箱</option>
                                <option value="phone">电话号码</option>
                                <option value="wifi">WIFI网络</option>
                                <option value="sms">短信</option>
                                <option value="vcard">联系人</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">内容</span>
                            <textarea v-model="content" class="content-input" :placeholder="contentPlaceholder" rows="3"></textarea>
                        </div>
                        
                        <!-- WIFI网络特殊字段 -->
                        <div v-if="contentType === 'wifi'" class="form-item wifi-fields">
                            <span class="form-title text-blod">网络名称</span>
                            <input v-model="wifiConfig.ssid" type="text" class="content-input" placeholder="输入WIFI名称">
                        </div>
                        <div v-if="contentType === 'wifi'" class="form-item wifi-fields">
                            <span class="form-title text-blod">密码</span>
                            <input v-model="wifiConfig.password" type="text" class="content-input" placeholder="输入WIFI密码">
                        </div>
                        <div v-if="contentType === 'wifi'" class="form-item wifi-fields">
                            <span class="form-title text-blod">加密类型</span>
                            <select v-model="wifiConfig.encryption" class="useWebFonts">
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">无加密</option>
                            </select>
                        </div>
                        
                        <!-- 联系人特殊字段 -->
                        <div v-if="contentType === 'vcard'" class="form-item vcard-fields">
                            <span class="form-title text-blod">姓名</span>
                            <input v-model="vcardConfig.name" type="text" class="content-input" placeholder="输入姓名">
                        </div>
                        <div v-if="contentType === 'vcard'" class="form-item vcard-fields">
                            <span class="form-title text-blod">电话</span>
                            <input v-model="vcardConfig.phone" type="text" class="content-input" placeholder="输入电话号码">
                        </div>
                        <div v-if="contentType === 'vcard'" class="form-item vcard-fields">
                            <span class="form-title text-blod">邮箱</span>
                            <input v-model="vcardConfig.email" type="text" class="content-input" placeholder="输入电子邮箱">
                        </div>
                        
                        <!-- 短信特殊字段 -->
                        <div v-if="contentType === 'sms'" class="form-item sms-fields">
                            <span class="form-title text-blod">电话号码</span>
                            <input v-model="smsConfig.phone" type="text" class="content-input" placeholder="输入接收短信的电话号码">
                        </div>
                        <div v-if="contentType === 'sms'" class="form-item sms-fields">
                            <span class="form-title text-blod">短信内容</span>
                            <textarea v-model="smsConfig.message" class="content-input" placeholder="输入短信内容" rows="2"></textarea>
                        </div>
                        
                        <div class="form-item">
                            <span class="form-title text-blod">二维码尺寸</span>
                            <div class="slider-container">
                                <input type="range" v-model="size" min="100" max="500" class="size-slider" />
                                <span class="size-value">{{ size }}px</span>
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">前景色</span>
                            <div class="color-container">
                                <input type="color" v-model="colorDark" class="color-picker" />
                                <input type="text" v-model="colorDark" class="color-input" placeholder="#000000" />
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">背景色</span>
                            <div class="color-container">
                                <input type="color" v-model="colorLight" class="color-picker" />
                                <input type="text" v-model="colorLight" class="color-input" placeholder="#FFFFFF" />
                            </div>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">纠错级别</span>
                            <select v-model="errorLevel" name="error-level" id="error-level" class="useWebFonts">
                                <option value="L">L (约7%错误更正)</option>
                                <option value="M">M (约15%错误更正)</option>
                                <option value="Q">Q (约25%错误更正)</option>
                                <option value="H" selected>H (约30%错误更正)</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">LOGO添加</span>
                            <select v-model="logoType" name="logo-type" id="logo-type" class="useWebFonts" @change="onLogoTypeChange">
                                <option value="none">无</option>
                                <option value="default">默认</option>
                                <option value="local">本地</option>
                                <option value="url">URL</option>
                            </select>
                        </div>
                        <div v-if="logoType === 'url'" class="form-item">
                            <span class="form-title text-blod">LOGO URL</span>
                            <input v-model="logoUrl" type="text" class="content-input" placeholder="输入LOGO图片URL">
                        </div>
                        <div v-if="logoType === 'local'" class="form-item">
                            <span class="form-title text-blod">上传LOGO</span>
                            <input type="file" @change="onLogoUpload" accept="image/*" class="file-input">
                        </div>
                        <div class="button-funct">
                            <button class="btn btn-ghost" @click="reset">重置</button>
                            <button class="btn btn-primary" @click="generateQRCode">生成二维码</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ioput">
                <div class="glass-card preview">
                    <div class="header">
                        <h1 class="title">二维码预览</h1>
                        <div class="preview-actions">
                            <button class="btn btn-outline" @click="refreshQRCode">刷新</button>
                            <button class="btn btn-outline" @click="copyQRCode">复制</button>
                            <button class="btn btn-primary" @click="downloadQRCode">下载</button>
                        </div>
                    </div>
                    <div class="preview-content">
                        <div class="qrcode-container" :style="{ width: size + 'px', height: size + 'px' }">
                            <canvas ref="qrcodeCanvas" :width="size" :height="size"></canvas>
                            <img v-if="logoData" :src="logoData" class="qrcode-logo" :style="logoStyle" />
                        </div>
                        <div class="qrcode-info">
                            <h3>二维码信息</h3>
                            <div class="info-item">
                                <span class="info-label">内容类型:</span>
                                <span class="info-value">{{ getContentTypeLabel() }}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">编码内容:</span>
                                <span class="info-value content-value">{{ finalContent }}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">尺寸:</span>
                                <span class="info-value">{{ size }} × {{ size }} 像素</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">纠错级别:</span>
                                <span class="info-value">{{ getErrorLevelLabel() }}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">生成时间:</span>
                                <span class="info-value">{{ generationTime || '未生成' }}</span>
                            </div>
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

.app-content .ioput .preview {
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

.content-input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid var(--border-input);
    border-radius: var(--radius-md);
    background: var(--bg-input);
    font-family: 'CascadiaCode', monospace;
    resize: vertical;
    min-height: 40px;
}

.wifi-fields, .vcard-fields, .sms-fields {
    width: 100%;
    margin-left: 120px;
}

.wifi-fields .form-title,
.vcard-fields .form-title,
.sms-fields .form-title {
    min-width: 100px;
}

.slider-container {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
}

.size-slider {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: var(--slider-track);
    outline: none;
    -webkit-appearance: none;
}

.size-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--slider-thumb);
    cursor: pointer;
}

.size-value {
    min-width: 60px;
    text-align: center;
    font-weight: 500;
}

.color-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.color-picker {
    width: 50px;
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

.file-input {
    flex: 1;
    padding: 8px 15px;
    border: 1px solid var(--border-input);
    border-radius: var(--radius-md);
    background: var(--bg-input);
}

.preview-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 20px;
}

.qrcode-container {
    position: relative;
    border: 1px solid var(--border-input);
    border-radius: var(--radius-md);
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.qrcode-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    pointer-events: none;
}

.qrcode-info {
    width: 100%;
    max-width: 500px;
    background: var(--bg-input);
    border-radius: var(--radius-md);
    padding: 20px;
    border: 1px solid var(--border-input);
}

.qrcode-info h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-input);
    padding-bottom: 10px;
}

.info-item {
    display: flex;
    margin-bottom: 10px;
    align-items: flex-start;
}

.info-label {
    font-weight: 500;
    min-width: 100px;
    color: var(--text-secondary);
}

.info-value {
    flex: 1;
    word-break: break-all;
}

.content-value {
    font-family: 'CascadiaCode', monospace;
    font-size: 0.9rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 5px 8px;
    border-radius: 4px;
}

.preview-actions {
    display: flex;
    gap: 10px;
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

    .wifi-fields, .vcard-fields, .sms-fields {
        margin-left: 0;
    }

    .color-container {
        flex-direction: column;
        align-items: stretch;
    }

    .color-picker {
        width: 100%;
        height: 50px;
    }

    .preview-content {
        flex-direction: column;
    }

    .qrcode-info {
        width: 100%;
    }

    .info-item {
        flex-direction: column;
        gap: 5px;
    }

    .info-label {
        min-width: auto;
    }

    .preview-actions {
        flex-direction: column;
        width: 100%;
    }

    .preview-actions .btn {
        flex: 1;
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

    .preview-content {
        flex-direction: row;
        align-items: flex-start;
    }

    .qrcode-info {
        width: 50%;
    }
}
</style>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Notification from '../../components/ui/Notification.vue'
import QRCode from 'qrcode'

// 响应式数据
const contentType = ref('text')
const content = ref('')
const wifiConfig = ref({
    ssid: '',
    password: '',
    encryption: 'WPA'
})
const vcardConfig = ref({
    name: '',
    phone: '',
    email: ''
})
const smsConfig = ref({
    phone: '',
    message: ''
})
const size = ref(200)
const colorDark = ref('#000000')
const colorLight = ref('#FFFFFF')
const errorLevel = ref('H')
const logoType = ref('none')
const logoUrl = ref('')
const logoData = ref('')
const generationTime = ref('')
const qrcodeCanvas = ref(null)

// 通知组件引用
const notification = ref(null)

// 计算属性
const contentPlaceholder = computed(() => {
    const placeholders = {
        text: '请输入文本内容...',
        url: '请输入URL地址...',
        email: '请输入电子邮箱...',
        phone: '请输入电话号码...',
        wifi: '请输入WIFI信息...',
        sms: '请输入短信信息...',
        vcard: '请输入联系人信息...'
    }
    return placeholders[contentType.value]
})

const finalContent = computed(() => {
    switch (contentType.value) {
        case 'text':
            return content.value
        case 'url':
            return content.value.startsWith('http') ? content.value : `https://${content.value}`
        case 'email':
            return `mailto:${content.value}`
        case 'phone':
            return `tel:${content.value}`
        case 'wifi':
            return `WIFI:T:${wifiConfig.value.encryption};S:${wifiConfig.value.ssid};P:${wifiConfig.value.password};;`
        case 'sms':
            return `SMSTO:${smsConfig.value.phone}:${smsConfig.value.message}`
        case 'vcard':
            return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardConfig.value.name}\nTEL:${vcardConfig.value.phone}\nEMAIL:${vcardConfig.value.email}\nEND:VCARD`
        default:
            return content.value
    }
})

const logoStyle = computed(() => {
    const logoSize = size.value * 0.2 // LOGO大小为二维码的20%
    return {
        width: `${logoSize}px`,
        height: `${logoSize}px`
    }
})

// 方法
const onContentTypeChange = () => {
    content.value = ''
}

const onLogoTypeChange = () => {
    logoData.value = ''
    logoUrl.value = ''
}

const onLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            logoData.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const getContentTypeLabel = () => {
    const labels = {
        text: '文本',
        url: 'URL',
        email: '电子邮箱',
        phone: '电话号码',
        wifi: 'WIFI网络',
        sms: '短信',
        vcard: '联系人'
    }
    return labels[contentType.value]
}

const getErrorLevelLabel = () => {
    const labels = {
        L: 'L (约7%错误更正)',
        M: 'M (约15%错误更正)',
        Q: 'Q (约25%错误更正)',
        H: 'H (约30%错误更正)'
    }
    return labels[errorLevel.value]
}

const generateQRCode = async () => {
    if (!finalContent.value) {
        showNotification('请输入要生成二维码的内容', 'warning')
        return
    }

    try {
        // 生成二维码
        await QRCode.toCanvas(qrcodeCanvas.value, finalContent.value, {
            width: size.value,
            margin: 1,
            color: {
                dark: colorDark.value,
                light: colorLight.value
            },
            errorCorrectionLevel: errorLevel.value
        })

        // 设置生成时间
        generationTime.value = new Date().toLocaleString()

        showNotification('二维码生成成功', 'success')
    } catch (error) {
        console.error('生成二维码失败:', error)
        showNotification('生成二维码失败，请重试', 'error')
    }
}

const refreshQRCode = () => {
    if (finalContent.value) {
        generateQRCode()
        showNotification('二维码已刷新', 'info')
    } else {
        showNotification('请先生成二维码', 'warning')
    }
}

const copyQRCode = async () => {
    try {
        const canvas = qrcodeCanvas.value
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        await navigator.clipboard.write([
            new ClipboardItem({
                'image/png': blob
            })
        ])
        showNotification('二维码已复制到剪贴板', 'success')
    } catch (err) {
        console.error('复制失败:', err)
        showNotification('复制失败，请手动保存二维码', 'error')
    }
}

const downloadQRCode = () => {
    const canvas = qrcodeCanvas.value
    const link = document.createElement('a')
    link.download = `qrcode-${new Date().getTime()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    showNotification('二维码已下载', 'success')
}

const reset = () => {
    contentType.value = 'text'
    content.value = ''
    wifiConfig.value = {
        ssid: '',
        password: '',
        encryption: 'WPA'
    }
    vcardConfig.value = {
        name: '',
        phone: '',
        email: ''
    }
    smsConfig.value = {
        phone: '',
        message: ''
    }
    size.value = 200
    colorDark.value = '#000000'
    colorLight.value = '#FFFFFF'
    errorLevel.value = 'H'
    logoType.value = 'none'
    logoUrl.value = ''
    logoData.value = ''
    generationTime.value = ''
    
    const canvas = qrcodeCanvas.value
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    showNotification('已重置所有设置', 'info')
}

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

const getNotificationTitle = (type) => {
    const titles = {
        'success': '操作成功',
        'error': '操作失败',
        'warning': '提示',
        'info': '信息'
    }
    return titles[type] || '通知'
}

// 监听LOGO URL变化
watch(logoUrl, (newUrl) => {
    if (newUrl && logoType.value === 'url') {
        logoData.value = newUrl
    }
})

// 初始化
onMounted(() => {
    // 设置默认内容
    content.value = '欢迎使用二维码生成器'
})
</script>

<script>
export default {
    name: 'QrGenerator',
    toolInfo: {
        id: 'qr-generator',
        name: '二维码生成器',
        description: '快速生成自定义二维码，支持多种内容',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M159.744 888.832V135.168h360.448v196.608c0 17.92 14.848 32.768 32.768 32.768h196.608v158.208h65.536V299.008h-1.024c0.512-9.728-2.56-19.456-9.728-26.112l-194.048-193.536c-7.168-7.168-16.896-10.24-27.136-9.216H159.744c-36.352 0-65.536 29.184-65.536 65.536v753.152c0 36.352 29.184 65.536 65.536 65.536h392.192v-65.536H159.744z m425.984-737.792l148.48 147.968h-148.48V151.04z"></path><path d="M227.328 716.8h37.888c8.704 0.512 17.408-0.512 26.112-2.048 4.096-1.536 7.68-4.608 9.216-8.192 2.048-6.144 3.072-12.288 3.072-18.944V675.84c0.512-6.144-1.024-12.8-4.096-18.432-4.096-4.608-9.216-7.68-15.36-8.704 5.12-0.512 9.728-3.072 13.824-6.656 2.56-4.608 4.096-10.24 3.584-15.36 0.512-8.192-1.024-16.384-5.12-23.552-3.072-4.608-7.68-8.192-12.8-9.728-7.68-2.048-15.872-2.56-23.552-2.56h-32.768V716.8z m39.936-103.936c1.536 0.512 2.56 1.536 3.072 3.072 1.024 2.56 1.024 5.632 1.024 8.192 0.512 4.608 0 9.216-1.536 13.824-1.536 2.048-3.584 2.56-6.144 2.56h-3.072v-28.16c2.048-0.512 4.096 0 6.656 0.512z m2.048 49.152c1.536 3.072 2.048 6.656 1.536 9.728v11.776c0.512 3.072 0 6.656-2.048 9.728-2.56 1.536-5.632 2.56-8.704 2.048v-35.328c3.072-0.512 6.656 0.512 9.216 2.048z m78.336-19.456c0-3.584 0-7.168 1.024-10.752 0.512-1.536 2.56-2.56 4.096-2.048 1.536 0 3.072 1.024 4.096 2.56 1.024 3.584 1.536 7.168 1.024 10.752 0 3.072 0 5.632-1.024 8.704-5.12 3.584-10.752 6.656-16.384 8.192-6.656 2.048-12.8 5.12-18.432 9.728-3.072 4.608-4.096 10.24-3.584 15.872v8.704c-1.024 7.68 1.536 14.848 7.168 20.48 4.608 3.072 9.728 4.608 15.36 4.608 7.68 0.512 14.848-4.096 18.432-11.264v9.216h30.72V665.6c0.512-11.264 0-22.528-1.536-33.792-1.024-5.632-4.608-10.752-9.728-13.824-14.336-7.168-31.232-7.68-46.08-0.512-4.608 2.56-8.704 6.656-11.264 11.264-2.048 6.144-3.072 12.288-2.56 18.432v7.168h29.696l-1.024-11.776z m10.24 46.592c0 3.072 0 6.656-1.024 9.728-1.024 1.536-2.56 2.048-4.096 2.048s-3.584-0.512-4.096-2.56c-1.024-3.584-1.536-6.656-1.024-10.24 0-3.584 0.512-7.168 1.024-10.752 2.048-4.096 5.12-7.168 8.704-9.216v20.992h0.512z m109.056-48.64c0-4.096 0-7.68-1.024-11.264-1.024-3.072-2.56-5.632-4.608-8.192-3.072-3.072-6.656-5.632-11.264-7.168-5.632-2.048-11.776-2.56-17.408-2.56-6.144 0-12.288 1.024-18.432 3.072-4.608 1.536-8.704 5.12-11.264 9.216-2.56 5.632-3.584 11.776-3.072 18.432 0 5.12 1.024 10.24 3.072 15.36 4.096 6.144 10.24 11.264 16.896 14.336 6.144 3.072 12.288 7.168 18.432 11.264 1.536 3.072 2.048 6.144 1.536 9.216 0 2.56 0 5.12-1.536 7.168-1.024 1.024-3.072 2.048-4.608 1.536-1.536 0-3.584-1.024-4.096-2.56-1.024-3.584-1.536-7.168-1.024-10.752V680.96h-28.16v5.12c-0.512 6.656 0.512 13.312 3.072 19.456 2.56 4.608 6.656 8.192 11.776 10.24 6.656 2.56 13.312 4.096 20.48 3.584 6.144 0 12.8-1.024 18.432-3.584 4.608-2.048 8.704-5.632 10.752-9.728 2.56-6.144 3.584-12.8 3.072-18.944 0.512-6.144-1.024-12.288-4.096-17.408-5.12-5.632-11.264-9.728-17.92-12.8-4.608-2.048-9.216-4.608-13.824-7.68-1.536-1.024-3.072-3.072-4.096-5.12-0.512-2.048-0.512-4.608-0.512-7.168 0-2.048 0.512-3.584 1.536-5.12 1.024-1.024 2.56-2.048 4.096-1.536 1.536-0.512 3.072 0.512 4.096 2.048 0.512 3.072 1.024 6.144 1.024 9.216v5.632h28.16l0.512-6.656z m90.112 12.8c0.512-8.192-1.024-15.872-3.584-23.552-2.56-5.632-6.656-10.24-12.288-13.312-6.656-3.584-14.336-5.12-22.016-5.12-6.656 0-13.312 1.536-18.944 4.096-5.12 2.56-9.728 6.656-11.776 11.776-2.56 6.656-4.096 14.336-3.584 21.504v30.208c0 6.144 0.512 11.776 1.536 17.408 1.024 4.096 3.072 7.68 6.144 11.264s7.168 6.144 11.776 7.68c5.632 2.048 11.776 3.072 17.408 3.072s11.776-1.024 16.896-3.072c4.608-2.048 8.192-5.12 11.264-8.704 2.56-3.072 4.608-7.168 5.632-10.752 1.024-4.608 1.536-9.728 1.024-14.848v-7.68H527.36v13.824c0 3.584 0 7.168-1.024 10.24-1.024 2.048-2.56 3.072-4.608 2.56-1.536 0-3.072-0.512-4.096-2.048-1.024-3.072-1.024-6.144-1.024-9.216v-22.528h40.96l-0.512-12.8z m-40.448-3.072v-7.68c0-3.584 0-7.168 1.024-10.752 1.024-1.536 2.56-2.048 4.096-2.048s3.072 1.024 3.584 2.56c0.512 3.584 1.024 6.656 1.024 10.24v7.68h-9.728zM521.216 522.752H506.88v25.6h-34.816v-25.6H397.824v-28.672l56.832-111.616h39.424L438.784 492.544h33.792V450.56H506.88v41.984h14.336v30.208z m-175.104 21.504c-18.432 7.68-39.936 7.68-58.368 0-7.68-3.584-14.336-9.728-18.432-16.896-4.608-8.192-6.656-17.92-6.144-27.136 0-6.656 1.024-12.8 2.56-18.944 1.536-7.168 4.096-13.824 7.168-19.968 0.512-1.024 1.024-2.048 1.536-3.584s1.024-2.048 1.536-3.072l37.376-71.68h39.424L315.904 450.56c2.048-0.512 4.608-0.512 6.656-0.512 9.216-0.512 17.92 1.536 26.112 5.632 7.168 3.584 12.8 9.728 16.384 16.896 4.096 8.192 6.144 17.408 5.632 26.624 0.512 9.728-2.048 18.944-6.144 27.648-4.096 7.68-10.752 13.824-18.432 17.408z m-10.24-43.008c0.512-5.632-1.536-11.264-5.12-15.872-3.584-4.096-8.704-5.632-14.336-5.632-5.12-0.512-10.752 1.536-14.336 5.632-3.584 4.608-5.12 10.24-5.12 15.872-0.512 5.12 1.536 10.24 5.12 13.824 8.192 6.656 19.968 6.144 28.672 0 3.584-3.584 5.632-8.704 5.12-13.824zM916.48 669.184h-217.088c-2.56 0.512-4.608-1.024-4.608-3.584 0-34.816 28.672-62.976 64-62.976h14.848c14.336 0 27.648 4.608 37.888 12.288 10.24 8.192 20.48 22.016 34.816 21.504 10.24-0.512 22.016-8.704 20.992-21.504-17.92-33.28-53.248-56.32-93.184-56.32H757.76c-58.88 0-106.496 47.616-106.496 106.496v4.096h-35.84c-15.872 0-29.184 12.8-29.184 29.184v214.016c0 15.872 12.8 29.184 29.184 29.184H916.48c15.872 0 29.184-12.8 29.184-29.184v-214.016c0-15.872-13.312-29.184-29.184-29.184z m-24.064 224.768h-252.928v-176.64h252.928v176.64z"></path><path d="M765.952 878.08c9.728 0 17.408-7.68 17.408-17.408v-110.592c0-9.728-8.192-17.408-17.408-17.408-9.728 0-17.408 7.68-17.408 17.408v110.592c0 9.728 7.68 17.408 17.408 17.408z"></path></svg>',
        category: '工具'
    },
    title: '二维码生成器'
}
</script>