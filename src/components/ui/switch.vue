<template>
    <div class="switch">
        <input 
            type="checkbox" 
            :id="uniqueId" 
            :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)"
        />
        <label :for="uniqueId" class="toggle"><span></span></label>
    </div>
</template>

<script>
export default {
    name: 'Switch',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            uniqueId: `switch-${Math.random().toString(36).substr(2, 9)}`
        }
    },
    emits: ['update:modelValue']
}
</script>

<style scoped>
.switch input[type="checkbox"] {
    visibility: hidden;
    display: none;
}

.switch .toggle {
    position: relative;
    display: block;
    width: 40px;
    height: 20px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);
}

.switch .toggle:before {
    content: "";
    position: relative;
    top: 3px;
    left: 3px;
    width: 34px;
    height: 14px;
    display: block;
    background: #9A9999;
    border-radius: 8px;
    transition: background 0.2s ease;
}

.switch .toggle span {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    display: block;
    background: white;
    border-radius: 10px;
    box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
    transition: all 0.2s ease;
}

.switch .toggle span:before {
    content: "";
    position: absolute;
    display: block;
    margin: -18px;
    width: 56px;
    height: 56px;
    background: var(--ui-switch-toggle);
    border-radius: 50%;
    transform: scale(0);
    opacity: 1;
    pointer-events: none;
}

.switch input[type="checkbox"]:checked + .toggle:before {
    background: var(--ui-switch-label-before);
}

.switch input[type="checkbox"]:checked + .toggle span {
    background: var(--ui-switch-label-span);
    transform: translateX(20px);
    transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25), background 0.15s ease;
    box-shadow: 0 3px 8px var(--ui-switch-label-shadow);
}

.switch input[type="checkbox"]:checked + .toggle span:before {
    transform: scale(1);
    opacity: 0;
    transition: all 0.4s ease;
}
</style>