<template>
    <div class="app-box">
        <!-- 添加通知组件 -->
        <Notification ref="notification" />
        
        <div class="app-header">
            <span class="title">BaseX 编码/解码</span>
            <span class="subtitle">对文本进行 BaseX 编码和解码</span>
        </div>
        <div class="app-content">
            <div class="funct">
                <div class="glass-card">
                    <ul list-number>
                        <li>将需要<span class="text-blod">编码/解码</span>的文本输入到<span class="text-blod">输入区</span>中</li>
                        <li>选择<span class="text-blod">编码/解码</span>所需的参数</li>
                        <li>点击<span class="text-blod">编码或解码</span>按钮进行<span class="text-blod">编码/解码</span></li>
                        <li><span class="text-blod">编码/解码</span>后的文本会输出到<span class="text-blod">输出区</span>，可点击<span
                                class="text-blod">复制</span>按钮以复制文本</li>
                    </ul>
                </div>
                <div class="glass-card">
                    <div class="form">
                        <div class="form-item">
                            <span class="form-title text-blod">编码方式</span>
                            <select v-model="characterCode" name="character-code" id="character-code"
                                class="useWebFonts">
                                <option value="AUTO-DETECT">AUTO-DETECT</option>
                                <optgroup label="Populars">
                                    <option value="UTF-8" selected>UTF-8</option>
                                    <option value="ASCII">ASCII</option>
                                    <option value="ISO-8859-1">ISO-8859-1</option>
                                    <option value="ISO-8859-2">ISO-8859-2</option>
                                    <option value="ISO-8859-6">ISO-8859-6</option>
                                    <option value="ISO-8859-15">ISO-8859-15</option>
                                    <option value="Windows-1252">Windows-1252</option>
                                </optgroup>
                                <optgroup label="Others">
                                    <option value="ArmSCII-8">ArmSCII-8</option>
                                    <option value="BIG-5">BIG-5</option>
                                    <option value="CP850">CP850</option>
                                    <option value="CP866">CP866</option>
                                    <option value="CP932">CP932</option>
                                    <option value="CP936">CP936</option>
                                    <option value="CP950">CP950</option>
                                    <option value="CP50220">CP50220</option>
                                    <option value="CP50221">CP50221</option>
                                    <option value="CP50222">CP50222</option>
                                    <option value="CP51932">CP51932</option>
                                    <option value="EUC-CN">EUC-CN</option>
                                    <option value="EUC-JP">EUC-JP</option>
                                    <option value="EUC-KR">EUC-KR</option>
                                    <option value="EUC-TW">EUC-TW</option>
                                    <option value="GB18030">GB18030</option>
                                    <option value="HZ">HZ</option>
                                    <option value="ISO-2022-JP">ISO-2022-JP</option>
                                    <option value="ISO-2022-KR">ISO-2022-KR</option>
                                    <option value="ISO-8859-3">ISO-8859-3</option>
                                    <option value="ISO-8859-4">ISO-8859-4</option>
                                    <option value="ISO-8859-5">ISO-8859-5</option>
                                    <option value="ISO-8859-7">ISO-8859-7</option>
                                    <option value="ISO-8859-8">ISO-8859-8</option>
                                    <option value="ISO-8859-9">ISO-8859-9</option>
                                    <option value="ISO-8859-10">ISO-8859-10</option>
                                    <option value="ISO-8859-13">ISO-8859-13</option>
                                    <option value="ISO-8859-14">ISO-8859-14</option>
                                    <option value="ISO-8859-16">ISO-8859-16</option>
                                    <option value="JIS">JIS</option>
                                    <option value="KOI8-R">KOI8-R</option>
                                    <option value="KOI8-U">KOI8-U</option>
                                    <option value="SJIS">SJIS</option>
                                    <option value="UCS-2">UCS-2</option>
                                    <option value="UCS-2BE">UCS-2BE</option>
                                    <option value="UCS-2LE">UCS-2LE</option>
                                    <option value="UCS-4">UCS-4</option>
                                    <option value="UCS-4BE">UCS-4BE</option>
                                    <option value="UCS-4LE">UCS-4LE</option>
                                    <option value="UHC">UHC</option>
                                    <option value="UTF-7">UTF-7</option>
                                    <option value="UTF-16">UTF-16</option>
                                    <option value="UTF-16BE">UTF-16BE</option>
                                    <option value="UTF-16LE">UTF-16LE</option>
                                    <option value="UTF-32">UTF-32</option>
                                    <option value="UTF-32BE">UTF-32BE</option>
                                    <option value="UTF-32LE">UTF-32LE</option>
                                    <option value="UTF7-IMAP">UTF7-IMAP</option>
                                    <option value="Windows-1251">Windows-1251</option>
                                    <option value="Windows-1254">Windows-1254</option>
                                </optgroup>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">编码类型</span>
                            <select v-model="codeType" name="code-type" id="code-type" class="useWebFonts">
                                <option value="Base16">Base16</option>
                                <option value="Base32">Base32</option>
                                <option value="Base58">Base58</option>
                                <option value="Base62">Base62</option>
                                <option value="Base64" selected>Base64</option>
                                <option value="Base85">Base85</option>
                                <option value="Base91">Base91</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">过滤非 BaseX 字符</span>
                            <Switch v-model="filterNonBaseX"></Switch>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">逐行编译</span>
                            <Switch v-model="lineByLine"></Switch>
                        </div>
                        <div class="form-item">
                            <span class="form-title text-blod">编码表</span>
                            <input class="code-list useWebFonts" type="text" v-model="codeTable" name="code-list"
                                id="code-list" readonly placeholder="选择编码以显示编码表">
                        </div>
                        <div class="button-funct">
                            <button class="btn btn-ghost" @click="reset">重置</button>
                            <button class="btn btn-ghost" @click="swap">交换</button>
                            <button class="btn btn-outline" @click="encode">编码</button>
                            <button class="btn btn-primary" @click="decode">解码</button>
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
                    <textarea class="editor glass-card code-list" v-model="inputText" name="code-input" id="code-input"
                        placeholder="请输入文本..."></textarea>
                </div>
                <div class="glass-card output">
                    <div class="header">
                        <h1 class="title">输出区</h1>
                        <button class="btn btn-outline" @click="clearOutput">清空</button>
                        <button class="btn btn-primary" @click="copyOutput">复制</button>
                    </div>
                    <textarea class="editor glass-card code-list" v-model="outputText" name="code-output"
                        id="code-output" placeholder="等待编译文本..." readonly></textarea>
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
import { ref, watch } from 'vue'
import Switch from '../../components/ui/switch.vue'
import Notification from '../../components/ui/Notification.vue'

// 响应式数据
const inputText = ref('')
const outputText = ref('')
const characterCode = ref('UTF-8')
const codeType = ref('Base64')
const filterNonBaseX = ref(false)
const lineByLine = ref(false)
const codeTable = ref('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/')

// 通知组件引用
const notification = ref(null)

// 监听编码类型变化，更新编码表
watch(codeType, (newType) => {
    updateCodeTable(newType)
})

// 更新编码表
const updateCodeTable = (type) => {
    const tables = {
        'Base16': '0123456789ABCDEF',
        'Base32': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
        'Base58': '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
        'Base62': '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        'Base64': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        'Base85': '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~',
        'Base91': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"'
    }
    codeTable.value = tables[type] || tables['Base64']
}

// 编码函数
const encode = () => {
    if (!inputText.value.trim()) {
        showNotification('请输入要编码的文本', 'warning')
        return
    }

    try {
        let text = inputText.value
        
        if (lineByLine.value) {
            // 逐行处理
            const lines = text.split('\n')
            const encodedLines = lines.map(line => {
                if (!line.trim()) return line
                return encodeText(line)
            })
            outputText.value = encodedLines.join('\n')
        } else {
            // 整体处理
            outputText.value = encodeText(text)
        }
        showNotification('编码成功', 'success')
    } catch (error) {
        outputText.value = `编码错误: ${error.message}`
        showNotification(`编码错误: ${error.message}`, 'error')
    }
}

// 解码函数
const decode = () => {
    if (!inputText.value.trim()) {
        showNotification('请输入要解码的文本', 'warning')
        return
    }

    try {
        let text = inputText.value
        
        if (filterNonBaseX.value) {
            // 过滤非BaseX字符
            const validChars = codeTable.value
            text = text.split('').filter(char => validChars.includes(char)).join('')
        }

        if (lineByLine.value) {
            // 逐行处理
            const lines = text.split('\n')
            const decodedLines = lines.map(line => {
                if (!line.trim()) return line
                return decodeText(line)
            })
            outputText.value = decodedLines.join('\n')
        } else {
            // 整体处理
            outputText.value = decodeText(text)
        }
        showNotification('解码成功', 'success')
    } catch (error) {
        outputText.value = `解码错误: ${error.message}`
        showNotification(`解码失败: ${error.message}`, 'error')
    }
}

// 编码文本
const encodeText = (text) => {
    try {
        switch (codeType.value) {
            case 'Base16':
                return textToBase16(text)
            case 'Base32':
                return textToBase32(text)
            case 'Base58':
                return textToBase58(text)
            case 'Base62':
                return textToBase62(text)
            case 'Base64':
                return textToBase64(text)
            case 'Base85':
                return textToBase85(text)
            case 'Base91':
                return textToBase91(text)
            default:
                return `暂不支持 ${codeType.value} 编码`
        }
    } catch (error) {
        throw new Error(`编码失败: ${error.message}`)
    }
}

// 解码文本
const decodeText = (text) => {
    try {
        switch (codeType.value) {
            case 'Base16':
                return base16ToText(text)
            case 'Base32':
                return base32ToText(text)
            case 'Base58':
                return base58ToText(text)
            case 'Base62':
                return base62ToText(text)
            case 'Base64':
                return base64ToText(text)
            case 'Base85':
                return base85ToText(text)
            case 'Base91':
                return base91ToText(text)
            default:
                return `暂不支持 ${codeType.value} 解码`
        }
    } catch (error) {
        throw new Error('解码失败，请检查输入格式是否正确')
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

// Base16 编码
const textToBase16 = (text) => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    let result = ''
    for (let i = 0; i < bytes.length; i++) {
        result += bytes[i].toString(16).padStart(2, '0').toUpperCase()
    }
    return result
}

// Base16 解码
const base16ToText = (base16) => {
    // 移除可能的空格和分隔符
    const cleanBase16 = base16.replace(/[^0-9A-Fa-f]/g, '')
    if (cleanBase16.length % 2 !== 0) {
        throw new Error('Base16 字符串长度必须为偶数')
    }
    
    const bytes = new Uint8Array(cleanBase16.length / 2)
    for (let i = 0; i < cleanBase16.length; i += 2) {
        bytes[i / 2] = parseInt(cleanBase16.substr(i, 2), 16)
    }
    const decoder = new TextDecoder()
    return decoder.decode(bytes)
}

// Base32 编码
const textToBase32 = (text) => {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    let result = ''
    let i = 0
    let buffer = 0
    let bitsLeft = 0
    
    for (let j = 0; j < bytes.length; j++) {
        buffer = (buffer << 8) | bytes[j]
        bitsLeft += 8
        
        while (bitsLeft >= 5) {
            result += base32Chars[(buffer >>> (bitsLeft - 5)) & 0x1F]
            bitsLeft -= 5
        }
    }
    
    if (bitsLeft > 0) {
        result += base32Chars[(buffer << (5 - bitsLeft)) & 0x1F]
    }
    
    // 添加填充
    while (result.length % 8 !== 0) {
        result += '='
    }
    
    return result
}

// Base32 解码
const base32ToText = (base32) => {
    const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    // 移除填充和无效字符
    const cleanBase32 = base32.replace(/=+$/, '').replace(/[^A-Z2-7]/gi, '')
    
    let buffer = 0
    let bitsLeft = 0
    let result = []
    
    for (let i = 0; i < cleanBase32.length; i++) {
        const char = cleanBase32[i].toUpperCase()
        const value = base32Chars.indexOf(char)
        if (value === -1) continue
        
        buffer = (buffer << 5) | value
        bitsLeft += 5
        
        if (bitsLeft >= 8) {
            result.push((buffer >>> (bitsLeft - 8)) & 0xFF)
            bitsLeft -= 8
        }
    }
    
    const decoder = new TextDecoder()
    return decoder.decode(new Uint8Array(result))
}

// Base58 编码
const textToBase58 = (text) => {
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    let result = ''
    let num = BigInt(0)
    
    // 将字节转换为大整数
    for (let i = 0; i < bytes.length; i++) {
        num = num * 256n + BigInt(bytes[i])
    }
    
    // 转换为Base58
    while (num > 0) {
        const remainder = Number(num % 58n)
        num = num / 58n
        result = alphabet[remainder] + result
    }
    
    // 处理前导零
    for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] === 0) {
            result = alphabet[0] + result
        } else {
            break
        }
    }
    
    return result || alphabet[0]
}

// Base58 解码
const base58ToText = (base58) => {
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    let num = BigInt(0)
    
    // 将Base58转换为大整数
    for (let i = 0; i < base58.length; i++) {
        const char = base58[i]
        const value = alphabet.indexOf(char)
        if (value === -1) throw new Error('无效的Base58字符')
        num = num * 58n + BigInt(value)
    }
    
    // 转换为字节数组
    const bytes = []
    while (num > 0) {
        bytes.unshift(Number(num % 256n))
        num = num / 256n
    }
    
    const decoder = new TextDecoder()
    return decoder.decode(new Uint8Array(bytes))
}

// Base62 编码
const textToBase62 = (text) => {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    let result = ''
    let num = BigInt(0)
    
    // 将字节转换为大整数
    for (let i = 0; i < bytes.length; i++) {
        num = num * 256n + BigInt(bytes[i])
    }
    
    // 转换为Base62
    while (num > 0) {
        const remainder = Number(num % 62n)
        num = num / 62n
        result = alphabet[remainder] + result
    }
    
    return result || alphabet[0]
}

// Base62 解码
const base62ToText = (base62) => {
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let num = BigInt(0)
    
    // 将Base62转换为大整数
    for (let i = 0; i < base62.length; i++) {
        const char = base62[i]
        const value = alphabet.indexOf(char)
        if (value === -1) throw new Error('无效的Base62字符')
        num = num * 62n + BigInt(value)
    }
    
    // 转换为字节数组
    const bytes = []
    while (num > 0) {
        bytes.unshift(Number(num % 256n))
        num = num / 256n
    }
    
    const decoder = new TextDecoder()
    return decoder.decode(new Uint8Array(bytes))
}

// Base64 编码
const textToBase64 = (text) => {
    if (typeof btoa === 'function') {
        return btoa(unescape(encodeURIComponent(text)))
    } else {
        // Node.js 环境或其他环境的兼容处理
        const encoder = new TextEncoder()
        const bytes = encoder.encode(text)
        let binary = ''
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        return btoa(binary)
    }
}

// Base64 解码
const base64ToText = (base64) => {
    if (typeof atob === 'function') {
        return decodeURIComponent(escape(atob(base64)))
    } else {
        // Node.js 环境或其他环境的兼容处理
        const binary = atob(base64)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i)
        }
        const decoder = new TextDecoder()
        return decoder.decode(bytes)
    }
}

// Base85 编码
const textToBase85 = (text) => {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    const base85Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~'
    
    let result = ''
    
    for (let i = 0; i < bytes.length; i += 4) {
        let num = 0
        const pad = Math.min(4, bytes.length - i)
        
        for (let j = 0; j < pad; j++) {
            num = num * 256 + bytes[i + j]
        }
        
        // 填充剩余字节
        for (let j = pad; j < 4; j++) {
            num *= 256
        }
        
        // 转换为Base85
        const block = []
        for (let j = 0; j < 5; j++) {
            block.unshift(base85Chars.charAt(num % 85))
            num = Math.floor(num / 85)
        }
        
        // 移除填充字符
        if (pad < 4) {
            block.splice(0, 4 - pad)
        }
        
        result += block.join('')
    }
    
    return result
}

// Base85 解码
const base85ToText = (base85) => {
    const base85Chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~'
    
    // 移除可能的分隔符
    const cleanBase85 = base85.replace(/\s/g, '')
    const bytes = []
    
    for (let i = 0; i < cleanBase85.length; i += 5) {
        let num = 0
        const chunk = cleanBase85.substr(i, 5)
        const pad = 5 - chunk.length
        
        for (let j = 0; j < chunk.length; j++) {
            const char = chunk[j]
            const value = base85Chars.indexOf(char)
            if (value === -1) throw new Error('无效的Base85字符')
            num = num * 85 + value
        }
        
        // 处理填充
        for (let j = 0; j < pad; j++) {
            num = num * 85 + 84 // 使用 'u' 字符进行填充
        }
        
        // 提取字节
        const blockBytes = []
        for (let j = 0; j < 4; j++) {
            blockBytes.unshift(num & 0xFF)
            num = Math.floor(num / 256)
        }
        
        // 移除填充字节
        bytes.push(...blockBytes.slice(0, 4 - pad))
    }
    
    const decoder = new TextDecoder()
    return decoder.decode(new Uint8Array(bytes))
}

// Base91 编码
const textToBase91 = (text) => {
    const base91Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"'
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)
    
    let result = ''
    let b = 0
    let n = 0
    
    for (let i = 0; i < bytes.length; i++) {
        b |= bytes[i] << n
        n += 8
        
        if (n > 13) {
            let v = b & 8191
            if (v > 88) {
                b >>= 13
                n -= 13
            } else {
                v = b & 16383
                b >>= 14
                n -= 14
            }
            result += base91Chars.charAt(v % 91) + base91Chars.charAt(Math.floor(v / 91))
        }
    }
    
    if (n > 0) {
        result += base91Chars.charAt(b % 91)
        if (n > 7 || b > 90) {
            result += base91Chars.charAt(Math.floor(b / 91))
        }
    }
    
    return result
}

// Base91 解码
const base91ToText = (base91) => {
    const base91Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"'
    
    let b = 0
    let n = 0
    let v = -1
    const bytes = []
    
    for (let i = 0; i < base91.length; i++) {
        const char = base91[i]
        const c = base91Chars.indexOf(char)
        if (c === -1) continue
        
        if (v < 0) {
            v = c
        } else {
            v += c * 91
            b |= v << n
            n += (v & 8191) > 88 ? 13 : 14
        
            do {
                bytes.push(b & 0xFF)
                b >>= 8
                n -= 8
            } while (n > 7)
            
            v = -1
        }
    }
    
    if (v + 1) {
        bytes.push((b | v << n) & 0xFF)
    }
    
    const decoder = new TextDecoder()
    return decoder.decode(new Uint8Array(bytes))
}

// 重置函数
const reset = () => {
    inputText.value = ''
    outputText.value = ''
    characterCode.value = 'UTF-8'
    codeType.value = 'Base64'
    filterNonBaseX.value = false
    lineByLine.value = false
    updateCodeTable('Base64')
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
    name: 'baseX',
    toolInfo: {
        id: 'basex-code',
        name: 'BaseX 编码解码',
        description: '该应用可以对文本进行 BaseX 编码和解码',
        icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M159.744 888.832V135.168h360.448v196.608c0 17.92 14.848 32.768 32.768 32.768h196.608v158.208h65.536V299.008h-1.024c0.512-9.728-2.56-19.456-9.728-26.112l-194.048-193.536c-7.168-7.168-16.896-10.24-27.136-9.216H159.744c-36.352 0-65.536 29.184-65.536 65.536v753.152c0 36.352 29.184 65.536 65.536 65.536h392.192v-65.536H159.744z m425.984-737.792l148.48 147.968h-148.48V151.04z"></path><path d="M227.328 716.8h37.888c8.704 0.512 17.408-0.512 26.112-2.048 4.096-1.536 7.68-4.608 9.216-8.192 2.048-6.144 3.072-12.288 3.072-18.944V675.84c0.512-6.144-1.024-12.8-4.096-18.432-4.096-4.608-9.216-7.68-15.36-8.704 5.12-0.512 9.728-3.072 13.824-6.656 2.56-4.608 4.096-10.24 3.584-15.36 0.512-8.192-1.024-16.384-5.12-23.552-3.072-4.608-7.68-8.192-12.8-9.728-7.68-2.048-15.872-2.56-23.552-2.56h-32.768V716.8z m39.936-103.936c1.536 0.512 2.56 1.536 3.072 3.072 1.024 2.56 1.024 5.632 1.024 8.192 0.512 4.608 0 9.216-1.536 13.824-1.536 2.048-3.584 2.56-6.144 2.56h-3.072v-28.16c2.048-0.512 4.096 0 6.656 0.512z m2.048 49.152c1.536 3.072 2.048 6.656 1.536 9.728v11.776c0.512 3.072 0 6.656-2.048 9.728-2.56 1.536-5.632 2.56-8.704 2.048v-35.328c3.072-0.512 6.656 0.512 9.216 2.048z m78.336-19.456c0-3.584 0-7.168 1.024-10.752 0.512-1.536 2.56-2.56 4.096-2.048 1.536 0 3.072 1.024 4.096 2.56 1.024 3.584 1.536 7.168 1.024 10.752 0 3.072 0 5.632-1.024 8.704-5.12 3.584-10.752 6.656-16.384 8.192-6.656 2.048-12.8 5.12-18.432 9.728-3.072 4.608-4.096 10.24-3.584 15.872v8.704c-1.024 7.68 1.536 14.848 7.168 20.48 4.608 3.072 9.728 4.608 15.36 4.608 7.68 0.512 14.848-4.096 18.432-11.264v9.216h30.72V665.6c0.512-11.264 0-22.528-1.536-33.792-1.024-5.632-4.608-10.752-9.728-13.824-14.336-7.168-31.232-7.68-46.08-0.512-4.608 2.56-8.704 6.656-11.264 11.264-2.048 6.144-3.072 12.288-2.56 18.432v7.168h29.696l-1.024-11.776z m10.24 46.592c0 3.072 0 6.656-1.024 9.728-1.024 1.536-2.56 2.048-4.096 2.048s-3.584-0.512-4.096-2.56c-1.024-3.584-1.536-6.656-1.024-10.24 0-3.584 0.512-7.168 1.024-10.752 2.048-4.096 5.12-7.168 8.704-9.216v20.992h0.512z m109.056-48.64c0-4.096 0-7.68-1.024-11.264-1.024-3.072-2.56-5.632-4.608-8.192-3.072-3.072-6.656-5.632-11.264-7.168-5.632-2.048-11.776-2.56-17.408-2.56-6.144 0-12.288 1.024-18.432 3.072-4.608 1.536-8.704 5.12-11.264 9.216-2.56 5.632-3.584 11.776-3.072 18.432 0 5.12 1.024 10.24 3.072 15.36 4.096 6.144 10.24 11.264 16.896 14.336 6.144 3.072 12.288 7.168 18.432 11.264 1.536 3.072 2.048 6.144 1.536 9.216 0 2.56 0 5.12-1.536 7.168-1.024 1.024-3.072 2.048-4.608 1.536-1.536 0-3.584-1.024-4.096-2.56-1.024-3.584-1.536-7.168-1.024-10.752V680.96h-28.16v5.12c-0.512 6.656 0.512 13.312 3.072 19.456 2.56 4.608 6.656 8.192 11.776 10.24 6.656 2.56 13.312 4.096 20.48 3.584 6.144 0 12.8-1.024 18.432-3.584 4.608-2.048 8.704-5.632 10.752-9.728 2.56-6.144 3.584-12.8 3.072-18.944 0.512-6.144-1.024-12.288-4.096-17.408-5.12-5.632-11.264-9.728-17.92-12.8-4.608-2.048-9.216-4.608-13.824-7.68-1.536-1.024-3.072-3.072-4.096-5.12-0.512-2.048-0.512-4.608-0.512-7.168 0-2.048 0.512-3.584 1.536-5.12 1.024-1.024 2.56-2.048 4.096-1.536 1.536-0.512 3.072 0.512 4.096 2.048 0.512 3.072 1.024 6.144 1.024 9.216v5.632h28.16l0.512-6.656z m90.112 12.8c0.512-8.192-1.024-15.872-3.584-23.552-2.56-5.632-6.656-10.24-12.288-13.312-6.656-3.584-14.336-5.12-22.016-5.12-6.656 0-13.312 1.536-18.944 4.096-5.12 2.56-9.728 6.656-11.776 11.776-2.56 6.656-4.096 14.336-3.584 21.504v30.208c0 6.144 0.512 11.776 1.536 17.408 1.024 4.096 3.072 7.68 6.144 11.264s7.168 6.144 11.776 7.68c5.632 2.048 11.776 3.072 17.408 3.072s11.776-1.024 16.896-3.072c4.608-2.048 8.192-5.12 11.264-8.704 2.56-3.072 4.608-7.168 5.632-10.752 1.024-4.608 1.536-9.728 1.024-14.848v-7.68H527.36v13.824c0 3.584 0 7.168-1.024 10.24-1.024 2.048-2.56 3.072-4.608 2.56-1.536 0-3.072-0.512-4.096-2.048-1.024-3.072-1.024-6.144-1.024-9.216v-22.528h40.96l-0.512-12.8z m-40.448-3.072v-7.68c0-3.584 0-7.168 1.024-10.752 1.024-1.536 2.56-2.048 4.096-2.048s3.072 1.024 3.584 2.56c0.512 3.584 1.024 6.656 1.024 10.24v7.68h-9.728zM521.216 522.752H506.88v25.6h-34.816v-25.6H397.824v-28.672l56.832-111.616h39.424L438.784 492.544h33.792V450.56H506.88v41.984h14.336v30.208z m-175.104 21.504c-18.432 7.68-39.936 7.68-58.368 0-7.68-3.584-14.336-9.728-18.432-16.896-4.608-8.192-6.656-17.92-6.144-27.136 0-6.656 1.024-12.8 2.56-18.944 1.536-7.168 4.096-13.824 7.168-19.968 0.512-1.024 1.024-2.048 1.536-3.584s1.024-2.048 1.536-3.072l37.376-71.68h39.424L315.904 450.56c2.048-0.512 4.608-0.512 6.656-0.512 9.216-0.512 17.92 1.536 26.112 5.632 7.168 3.584 12.8 9.728 16.384 16.896 4.096 8.192 6.144 17.408 5.632 26.624 0.512 9.728-2.048 18.944-6.144 27.648-4.096 7.68-10.752 13.824-18.432 17.408z m-10.24-43.008c0.512-5.632-1.536-11.264-5.12-15.872-3.584-4.096-8.704-5.632-14.336-5.632-5.12-0.512-10.752 1.536-14.336 5.632-3.584 4.608-5.12 10.24-5.12 15.872-0.512 5.12 1.536 10.24 5.12 13.824 8.192 6.656 19.968 6.144 28.672 0 3.584-3.584 5.632-8.704 5.12-13.824zM916.48 669.184h-217.088c-2.56 0.512-4.608-1.024-4.608-3.584 0-34.816 28.672-62.976 64-62.976h14.848c14.336 0 27.648 4.608 37.888 12.288 10.24 8.192 20.48 22.016 34.816 21.504 10.24-0.512 22.016-8.704 20.992-21.504-17.92-33.28-53.248-56.32-93.184-56.32H757.76c-58.88 0-106.496 47.616-106.496 106.496v4.096h-35.84c-15.872 0-29.184 12.8-29.184 29.184v214.016c0 15.872 12.8 29.184 29.184 29.184H916.48c15.872 0 29.184-12.8 29.184-29.184v-214.016c0-15.872-13.312-29.184-29.184-29.184z m-24.064 224.768h-252.928v-176.64h252.928v176.64z"></path><path d="M765.952 878.08c9.728 0 17.408-7.68 17.408-17.408v-110.592c0-9.728-8.192-17.408-17.408-17.408-9.728 0-17.408 7.68-17.408 17.408v110.592c0 9.728 7.68 17.408 17.408 17.408z"></path></svg>',
        category: '文本'
    }
}
</script>