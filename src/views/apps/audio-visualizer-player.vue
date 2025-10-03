<script setup>
// 获取DOM元素
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const playBtn = document.getElementById('playBtn');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const resetBtn = document.getElementById('resetBtn');
const realtimeModeBtn = document.getElementById('realtimeMode');
const precompileModeBtn = document.getElementById('precompileMode');
const applyColorBtn = document.getElementById('applyColorBtn');
const colorHexInput = document.getElementById('colorHexInput');
const exportBtn = document.getElementById('exportBtn');
const exportStatus = document.getElementById('exportStatus');

// 导出控制元素
const videoWidthInput = document.getElementById('videoWidth');
const videoHeightInput = document.getElementById('videoHeight');
const videoFPSInput = document.getElementById('videoFPS');
const videoDurationInput = document.getElementById('videoDuration');

// 样式控制元素
const barCountInput = document.getElementById('barCount');
const barGapInput = document.getElementById('barGap');
const barWidthInput = document.getElementById('barWidth');
const barHeightInput = document.getElementById('barHeight');
const barRadiusInput = document.getElementById('barRadius');
const colorOptions = document.querySelectorAll('.color-option');

// 颜色控制元素
const colorRInput = document.getElementById('colorR');
const colorGInput = document.getElementById('colorG');
const colorBInput = document.getElementById('colorB');
const colorAInput = document.getElementById('colorA');
const rValue = document.getElementById('rValue');
const gValue = document.getElementById('gValue');
const bValue = document.getElementById('bValue');
const aValue = document.getElementById('aValue');

// 背景控制元素
const canvasHeightInput = document.getElementById('canvasHeight');
const bgColorInput = document.getElementById('bgColor');
const bgAlphaInput = document.getElementById('bgAlpha');

// 初始化画布尺寸
function initCanvas() {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = parseInt(canvasHeightInput.value) * window.devicePixelRatio;
}
initCanvas();

// 音频相关变量
let audioContext, analyser, dataArray;
let audioElement = new Audio();
let isPlaying = false;
let animationId;
let updateMode = 'realtime'; // 'realtime' 或 'precompile'

// 可视化样式配置
let visualizerConfig = {
    barCount: 100,
    barGap: 2,
    barWidth: 5,
    barHeight: 0.8,
    barRadius: 5,
    color: '#FFFFFF',
    colorRGBA: 'rgba(255, 255, 255, 1)',
    bgColor: '#0a0a0a',
    bgAlpha: 0.4
};

// 默认配置值（用于重置）
const defaultConfig = {
    barCount: 100,
    barGap: 2,
    barWidth: 5,
    barHeight: 0.8,
    barRadius: 5,
    color: '#FFFFFF',
    colorRGBA: 'rgba(255, 255, 255, 1)',
    bgColor: '#0a0a0a',
    bgAlpha: 0.4,
    canvasHeight: 300
};

// 更新颜色值显示
function updateColorValues() {
    rValue.textContent = colorRInput.value;
    gValue.textContent = colorGInput.value;
    bValue.textContent = colorBInput.value;
    aValue.textContent = `${colorAInput.value}%`;

    // 更新RGBA颜色
    visualizerConfig.colorRGBA = `rgba(${colorRInput.value}, ${colorGInput.value}, ${colorBInput.value}, ${colorAInput.value / 100})`;

    // 更新十六进制输入框
    const r = parseInt(colorRInput.value).toString(16).padStart(2, '0');
    const g = parseInt(colorGInput.value).toString(16).padStart(2, '0');
    const b = parseInt(colorBInput.value).toString(16).padStart(2, '0');
    colorHexInput.value = `#${r}${g}${b}`;
}

// 更新背景设置
function updateBackgroundSettings() {
    visualizerConfig.bgColor = bgColorInput.value;
    visualizerConfig.bgAlpha = parseInt(bgAlphaInput.value) / 100;

    // 更新画布高度
    canvas.style.height = `${canvasHeightInput.value}px`;
    initCanvas();
}

// 颜色控制输入事件
[colorRInput, colorGInput, colorBInput, colorAInput].forEach(input => {
    input.addEventListener('input', updateColorValues);
});

// 背景控制输入事件
[canvasHeightInput, bgColorInput, bgAlphaInput].forEach(input => {
    input.addEventListener('input', updateBackgroundSettings);
});

// 初始化颜色值
updateColorValues();
updateBackgroundSettings();

// 更新样式配置
function updateConfig() {
    visualizerConfig.barCount = parseInt(barCountInput.value);
    visualizerConfig.barGap = parseInt(barGapInput.value);
    visualizerConfig.barWidth = parseInt(barWidthInput.value);
    visualizerConfig.barHeight = parseFloat(barHeightInput.value);
    visualizerConfig.barRadius = parseInt(barRadiusInput.value);
}

// 颜色选择器事件
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        visualizerConfig.color = option.dataset.color;

        // 更新RGB滑块
        const hex = option.dataset.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        colorRInput.value = r;
        colorGInput.value = g;
        colorBInput.value = b;

        updateColorValues();
    });
});

// 样式控制输入事件
[barCountInput, barGapInput, barWidthInput, barHeightInput, barRadiusInput].forEach(input => {
    input.addEventListener('input', updateConfig);
});

// 颜色输入框应用按钮
applyColorBtn.addEventListener('click', () => {
    const hex = colorHexInput.value;
    if (/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        colorRInput.value = r;
        colorGInput.value = g;
        colorBInput.value = b;

        updateColorValues();

        // 更新预设颜色选择
        colorOptions.forEach(opt => opt.classList.remove('active'));
    }
});

// 颜色输入框回车事件
colorHexInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        applyColorBtn.click();
    }
});

// 更新模式切换
realtimeModeBtn.addEventListener('click', () => {
    updateMode = 'realtime';
    realtimeModeBtn.classList.add('active');
    precompileModeBtn.classList.remove('active');

    // 如果当前没有播放但处于实时模式，开始绘制
    if (!isPlaying && updateMode === 'realtime') {
        draw();
    }
});

precompileModeBtn.addEventListener('click', () => {
    updateMode = 'precompile';
    precompileModeBtn.classList.add('active');
    realtimeModeBtn.classList.remove('active');

    // 如果当前没有播放但处于预编译模式，停止绘制
    if (!isPlaying && updateMode === 'precompile') {
        cancelAnimationFrame(animationId);
    }
});

// 重置按钮
resetBtn.addEventListener('click', () => {
    // 重置滑块值
    barCountInput.value = defaultConfig.barCount;
    barGapInput.value = defaultConfig.barGap;
    barWidthInput.value = defaultConfig.barWidth;
    barHeightInput.value = defaultConfig.barHeight;
    barRadiusInput.value = defaultConfig.barRadius;

    // 重置颜色值
    colorRInput.value = 255;
    colorGInput.value = 255;
    colorBInput.value = 255;
    colorAInput.value = 100;

    // 重置背景设置
    canvasHeightInput.value = defaultConfig.canvasHeight;
    bgColorInput.value = defaultConfig.bgColor;
    bgAlphaInput.value = defaultConfig.bgAlpha * 100;

    // 重置预设颜色选择
    colorOptions.forEach(opt => opt.classList.remove('active'));
    colorOptions[0].classList.add('active');

    // 重置更新模式
    updateMode = 'realtime';
    realtimeModeBtn.classList.add('active');
    precompileModeBtn.classList.remove('active');

    // 更新配置
    updateConfig();
    updateColorValues();
    updateBackgroundSettings();

    // 应用重置后的配置
    visualizerConfig = { ...defaultConfig };
});

// 文件选择处理
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    audioElement.src = fileURL;

    // 显示文件信息
    fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;

    // 初始化音频分析器
    initAudioAnalyser();
});

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}

// 初始化音频分析器
function initAudioAnalyser() {
    if (audioContext) {
        audioContext.close();
    }

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);

    // 配置分析器
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    // 连接音频节点
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // 设置播放状态
    isPlaying = false;
    playBtn.textContent = '▶';

    // 添加时间更新事件
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(audioElement.duration);
    });

    // 添加播放结束事件
    audioElement.addEventListener('ended', () => {
        isPlaying = false;
        playBtn.textContent = '▶';

        // 如果是预编译模式，停止绘制
        if (updateMode === 'precompile') {
            cancelAnimationFrame(animationId);
        }
    });
}

// 播放/暂停控制
playBtn.addEventListener('click', () => {
    if (!audioElement.src) return;

    if (isPlaying) {
        audioElement.pause();
        isPlaying = false;
        playBtn.textContent = '▶';

        // 如果是预编译模式，停止绘制
        if (updateMode === 'precompile') {
            cancelAnimationFrame(animationId);
        }
    } else {
        // 解决浏览器自动播放策略
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        audioElement.play();
        isPlaying = true;
        playBtn.textContent = '⏸';
        draw();
    }
});

// 快退按钮
rewindBtn.addEventListener('click', () => {
    if (!audioElement.src) return;
    audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
});

// 快进按钮
forwardBtn.addEventListener('click', () => {
    if (!audioElement.src) return;
    audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10);
});

// 进度条点击跳转
progressContainer.addEventListener('click', (e) => {
    if (!audioElement.src) return;

    const rect = progressContainer.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    audioElement.currentTime = clickPosition * audioElement.duration;
});

// 更新进度条
function updateProgress() {
    if (!audioElement.src) return;

    const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeDisplay.textContent = formatTime(audioElement.currentTime);
}

// 格式化时间 (分:秒)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// 绘制可视化效果
function draw() {
    animationId = requestAnimationFrame(draw);

    // 获取频率数据
    if (analyser) {
        analyser.getByteFrequencyData(dataArray);
    }

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    const bgRGBA = hexToRgba(visualizerConfig.bgColor, visualizerConfig.bgAlpha);
    ctx.fillStyle = bgRGBA;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 应用样式配置
    updateConfig();
    const barCount = Math.min(visualizerConfig.barCount, dataArray ? dataArray.length : 0);
    const barWidth = visualizerConfig.barWidth * window.devicePixelRatio;
    const barGap = visualizerConfig.barGap * window.devicePixelRatio;
    const barHeightFactor = visualizerConfig.barHeight;
    const barRadius = Math.min(
        visualizerConfig.barRadius * window.devicePixelRatio,
        barWidth / 2 // 确保圆角不超过条宽度的一半
    );
    const centerX = canvas.width / 2;
    const centerY = canvas.height;

    // 如果没有音频数据，创建模拟数据
    const audioData = dataArray || new Uint8Array(barCount).fill(Math.random() * 100 + 50);

    // 绘制频谱
    for (let i = 0; i < barCount; i++) {
        // 计算当前条代表的频率范围
        const startIdx = Math.floor(i * audioData.length / barCount);
        const endIdx = Math.min(Math.floor((i + 1) * audioData.length / barCount), audioData.length);

        // 计算该频率范围内的平均值
        let sum = 0;
        let count = 0;
        for (let j = startIdx; j < endIdx; j++) {
            sum += audioData[j];
            count++;
        }
        const value = count > 0 ? sum / count : 0;

        // 计算条形高度（从底部向上绘制）
        const barHeight = (value / 255) * centerY * barHeightFactor;

        // 设置单一颜色
        ctx.fillStyle = visualizerConfig.colorRGBA;

        // 计算右侧条形图位置（从中心向右）
        const x_right = centerX + (i * (barWidth + barGap)) + barGap;

        // 计算左侧镜像位置（从中心向左）
        const x_left = centerX - (i * (barWidth + barGap)) - barWidth - barGap;

        // 绘制右侧条形图（从底部向上）
        drawTopRoundedRect(
            ctx,
            x_right,
            centerY - barHeight,
            barWidth,
            barHeight,
            barRadius
        );

        // 绘制左侧镜像条形图（从底部向上）
        drawTopRoundedRect(
            ctx,
            x_left,
            centerY - barHeight,
            barWidth,
            barHeight,
            barRadius
        );
    }
}

// 将十六进制颜色转换为RGBA
function hexToRgba(hex, alpha) {
    // 移除#字符
    hex = hex.replace('#', '');

    // 解析RGB值
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// 绘制顶部圆角矩形
function drawTopRoundedRect(ctx, x, y, width, height, radius) {
    // 确保圆角半径有效
    radius = Math.min(radius, width / 2, height);

    // 如果高度小于圆角半径，调整圆角半径
    if (height < radius) {
        radius = height;
    }

    // 如果圆角半径太小（小于1像素），则绘制普通矩形
    if (radius < 1) {
        ctx.fillRect(x, y, width, height);
        return;
    }

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.fill();
}

// 导出为MP4
exportBtn.addEventListener('click', async () => {
    exportStatus.textContent = "正在准备视频导出...";
    exportBtn.disabled = true;

    try {
        // 获取导出参数
        const width = parseInt(videoWidthInput.value) || 1280;
        const height = parseInt(videoHeightInput.value) || 720;
        const fps = parseInt(videoFPSInput.value) || 30;
        const duration = parseInt(videoDurationInput.value) || 10;

        // 创建临时画布用于导出
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;

        // 创建视频录制器
        const stream = tempCanvas.captureStream(fps);
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        const chunks = [];

        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);

            // 转换为MP4
            convertToMP4(blob, url, width, height, fps, duration);
        };

        // 开始录制
        recorder.start();

        // 记录原始状态
        const originalWidth = canvas.width;
        const originalHeight = canvas.height;
        const originalMode = updateMode;

        // 切换到实时模式确保绘制
        updateMode = 'realtime';
        realtimeModeBtn.classList.add('active');
        precompileModeBtn.classList.remove('active');

        // 临时调整画布大小
        canvas.width = width;
        canvas.height = height;

        // 录制视频帧
        const frameCount = duration * fps;
        let frame = 0;

        const recordFrame = () => {
            if (frame >= frameCount) {
                // 停止录制
                recorder.stop();

                // 恢复原始状态
                canvas.width = originalWidth;
                canvas.height = originalHeight;
                updateMode = originalMode;

                if (originalMode === 'realtime') {
                    realtimeModeBtn.classList.add('active');
                    precompileModeBtn.classList.remove('active');
                } else {
                    precompileModeBtn.classList.add('active');
                    realtimeModeBtn.classList.remove('active');
                }

                return;
            }

            // 绘制当前帧到临时画布
            draw();

            // 复制到临时画布
            tempCtx.clearRect(0, 0, width, height);
            tempCtx.drawImage(canvas, 0, 0, width, height);

            frame++;
            exportStatus.textContent = `正在导出: ${frame}/${frameCount} 帧`;

            setTimeout(recordFrame, 1000 / fps);
        };

        recordFrame();
    } catch (error) {
        console.error("导出失败:", error);
        exportStatus.textContent = "导出失败: " + error.message;
        exportBtn.disabled = false;
    }
});

// 转换为MP4格式
function convertToMP4(webmBlob, webmUrl, width, height, fps, duration) {
    exportStatus.textContent = "正在转换为MP4格式...";

    // 创建视频元素
    const video = document.createElement('video');
    video.src = webmUrl;
    video.width = width;
    video.height = height;

    video.onloadedmetadata = () => {
        // 创建临时画布
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = width;
        tempCanvas.height = height;

        // 创建MP4录制器
        const mp4Stream = tempCanvas.captureStream(fps);
        const mp4Recorder = new MediaRecorder(mp4Stream, { mimeType: 'video/mp4' });
        const mp4Chunks = [];

        mp4Recorder.ondataavailable = e => mp4Chunks.push(e.data);
        mp4Recorder.onstop = () => {
            const mp4Blob = new Blob(mp4Chunks, { type: 'video/mp4' });
            const mp4Url = URL.createObjectURL(mp4Blob);

            // 提供下载
            const a = document.createElement('a');
            a.href = mp4Url;
            a.download = 'audio_visualization.mp4';
            a.click();

            // 清理
            URL.revokeObjectURL(webmUrl);
            URL.revokeObjectURL(mp4Url);

            exportStatus.textContent = "导出完成!";
            exportBtn.disabled = false;
        };

        // 开始录制MP4
        mp4Recorder.start();

        // 绘制视频帧到画布
        let frame = 0;
        const frameCount = duration * fps;

        const drawFrame = () => {
            if (frame >= frameCount) {
                mp4Recorder.stop();
                return;
            }

            // 设置当前时间
            video.currentTime = frame / fps;

            video.onseeked = () => {
                // 绘制视频帧到画布
                tempCtx.clearRect(0, 0, width, height);
                tempCtx.drawImage(video, 0, 0, width, height);

                frame++;
                exportStatus.textContent = `转换中: ${frame}/${frameCount} 帧`;

                // 继续下一帧
                setTimeout(drawFrame, 0);
            };
        };

        drawFrame();
    };

    video.load();
}

// 窗口大小变化时重置画布
window.addEventListener('resize', initCanvas);

// 初始化时开始绘制（实时模式）
draw();
</script>

<template>
    <div class="container">
        <h1>Audio Visualizer Player</h1>

        <div class="upload-container">
            <div class="file-input-wrapper">
                <button class="file-input-button">浏览文件</button>
                <input type="file" id="fileInput" accept="audio/*">
            </div>
            <div class="file-info" id="fileInfo">未选择文件</div>
        </div>

        <canvas id="visualizer"></canvas>
        <div class="visualizer-overlay"></div>

        <div class="controls">
            <div class="progress-container" id="progressContainer">
                <div id="progressBar"></div>
            </div>

            <div class="time-display">
                <span id="currentTime">0:00</span>
                <span id="totalTime">0:00</span>
            </div>

            <div class="control-buttons">
                <button class="control-btn" id="rewindBtn">⏪</button>
                <button class="control-btn" id="playBtn">▶</button>
                <button class="control-btn" id="forwardBtn">⏩</button>
            </div>

            <div class="mode-controls">
                <button class="mode-btn active" id="realtimeMode">实时更新</button>
                <button class="mode-btn" id="precompileMode">预编译</button>
            </div>
        </div>

        <div class="style-controls">
            <div class="style-control">
                <label for="barCount">音频条数量</label>
                <input type="range" id="barCount" min="20" max="200" value="100">
            </div>

            <div class="style-control">
                <label for="barGap">条间距</label>
                <input type="range" id="barGap" min="0" max="20" value="2">
            </div>

            <div class="style-control">
                <label for="barWidth">条宽度</label>
                <input type="range" id="barWidth" min="1" max="20" value="5">
            </div>

            <div class="style-control">
                <label for="barHeight">条高度</label>
                <input type="range" id="barHeight" min="0.1" max="1.0" step="0.1" value="0.8">
            </div>

            <div class="style-control">
                <label for="barRadius">圆角度</label>
                <input type="range" id="barRadius" min="0" max="20" value="5">
            </div>

            <div class="style-control">
                <label>主题色</label>
                <div class="color-picker">
                    <div class="color-option active" style="background: #FFFFFF;" data-color="#FFFFFF"></div>
                    <div class="color-option" style="background: #4e54c8;" data-color="#4e54c8"></div>
                    <div class="color-option" style="background: #8f94fb;" data-color="#8f94fb"></div>
                    <div class="color-option" style="background: #00c9ff;" data-color="#00c9ff"></div>
                    <div class="color-option" style="background: #ff7eee;" data-color="#ff7eee"></div>
                </div>
            </div>

            <div class="style-control color-control">
                <label>自定义颜色 (RGBA)</label>
                <div class="color-input-group">
                    <input type="text" class="color-input" id="colorHexInput" value="#FFFFFF">
                    <button class="color-input-btn" id="applyColorBtn">应用</button>
                </div>
                <div class="color-sliders">
                    <div class="color-slider">
                        <span>R</span>
                        <input type="range" id="colorR" min="0" max="255" value="255">
                        <span id="rValue">255</span>
                    </div>
                    <div class="color-slider">
                        <span>G</span>
                        <input type="range" id="colorG" min="0" max="255" value="255">
                        <span id="gValue">255</span>
                    </div>
                    <div class="color-slider">
                        <span>B</span>
                        <input type="range" id="colorB" min="0" max="255" value="255">
                        <span id="bValue">255</span>
                    </div>
                    <div class="color-slider">
                        <span>A</span>
                        <input type="range" id="colorA" min="0" max="100" value="100">
                        <span id="aValue">100%</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="background-controls">
            <div class="style-control">
                <label for="canvasHeight">背景高度</label>
                <input type="range" id="canvasHeight" min="100" max="500" value="300">
            </div>

            <div class="style-control">
                <label for="bgColor">背景颜色</label>
                <input type="color" id="bgColor" value="#0a0a0a">
            </div>

            <div class="style-control">
                <label for="bgAlpha">背景透明度</label>
                <input type="range" id="bgAlpha" min="0" max="100" value="40">
            </div>
        </div>

        <div class="export-controls">
            <div class="export-option">
                <label for="videoWidth">视频宽度</label>
                <input type="number" id="videoWidth" min="100" max="4096" value="1280">
            </div>

            <div class="export-option">
                <label for="videoHeight">视频高度</label>
                <input type="number" id="videoHeight" min="100" max="4096" value="720">
            </div>

            <div class="export-option">
                <label for="videoFPS">帧率 (FPS)</label>
                <input type="number" id="videoFPS" min="1" max="120" value="30">
            </div>

            <div class="export-option">
                <label for="videoDuration">时长 (秒)</label>
                <input type="number" id="videoDuration" min="1" max="600" value="10">
            </div>

            <button class="export-btn" id="exportBtn">导出为MP4</button>
            <div class="export-status" id="exportStatus"></div>
        </div>

        <button class="reset-btn" id="resetBtn">重置所有设置</button>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #121212;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 900px;
    background: rgba(30, 30, 30, 0.8);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 300;
    letter-spacing: 1px;
    color: #fff;
}

.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
    padding: 20px;
    background: rgba(40, 40, 40, 0.6);
    border-radius: 15px;
}

.file-input-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
    margin-bottom: 15px;
}

.file-input-wrapper input[type=file] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.file-input-button {
    display: inline-block;
    padding: 12px 25px;
    background: #4e54c8;
    color: white;
    border-radius: 50px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(78, 84, 200, 0.3);
}

.file-input-button:hover {
    background: #6a71e6;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(78, 84, 200, 0.4);
}

.file-info {
    margin-top: 10px;
    font-size: 14px;
    color: #aaa;
    text-align: center;
}

#visualizer {
    width: 100%;
    height: 300px;
    background: rgba(10, 10, 10, 0.4);
    border-radius: 15px;
    margin: 20px 0;
    overflow: hidden;
    position: relative;
}

.visualizer-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0) 70%);
    pointer-events: none;
}

.controls {
    width: 100%;
    background: rgba(40, 40, 40, 0.6);
    border-radius: 15px;
    padding: 20px;
}

.progress-container {
    width: 100%;
    height: 8px;
    background: rgba(100, 100, 100, 0.3);
    border-radius: 4px;
    margin-bottom: 20px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

#progressBar {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #4e54c8, #8f94fb);
    border-radius: 4px;
    transition: width 0.1s linear;
}

.time-display {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 14px;
    color: #aaa;
}

.control-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.control-btn {
    background: rgba(60, 60, 60, 0.7);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;
}

.control-btn:hover {
    background: rgba(78, 84, 200, 0.8);
    transform: scale(1.1);
}

.control-btn:active {
    transform: scale(0.95);
}

#playBtn {
    width: 60px;
    height: 60px;
    background: #4e54c8;
    font-size: 24px;
}

.mode-controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;
}

.mode-btn {
    padding: 8px 15px;
    background: rgba(60, 60, 60, 0.7);
    border: none;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.mode-btn.active {
    background: #4e54c8;
    box-shadow: 0 0 10px rgba(78, 84, 200, 0.5);
}

.style-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 25px;
    justify-content: center;
}

.style-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
}

.style-control label {
    margin-bottom: 8px;
    font-size: 14px;
    color: #aaa;
}

.style-control input[type="range"] {
    width: 100%;
}

.color-picker {
    display: flex;
    gap: 10px;
    align-items: center;
}

.color-option {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
}

.color-option.active {
    border-color: white;
    transform: scale(1.2);
}

.color-control {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.color-sliders {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
}

.color-slider {
    display: flex;
    align-items: center;
    gap: 5px;
}

.color-slider input {
    flex: 1;
}

.color-slider span {
    width: 30px;
    text-align: center;
    font-size: 12px;
}

.background-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;
    justify-content: center;
    background: rgba(40, 40, 40, 0.6);
    padding: 15px;
    border-radius: 15px;
    width: 100%;
}

.reset-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background: #ff4d4d;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.reset-btn:hover {
    background: #ff6666;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
}

.color-input-group {
    display: flex;
    gap: 10px;
    width: 100%;
    margin-top: 5px;
}

.color-input {
    flex: 1;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #444;
    background: rgba(30, 30, 30, 0.8);
    color: white;
}

.color-input-btn {
    padding: 5px 10px;
    background: #4e54c8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.export-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 15px;
    justify-content: center;
    background: rgba(40, 40, 40, 0.6);
    padding: 15px;
    border-radius: 15px;
    width: 100%;
}

.export-btn {
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
}

.export-btn:hover {
    background: #66BB6A;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
}

.export-btn:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.export-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
}

.export-option input {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #444;
    background: rgba(30, 30, 30, 0.8);
    color: white;
}

.export-status {
    margin-top: 10px;
    text-align: center;
    color: #aaa;
    font-size: 14px;
}
</style>