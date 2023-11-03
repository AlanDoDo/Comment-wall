<template>
    <transition name="modal">
        <div class="yk-modal" v-if="isModal">
            <div class="yk-modal-head">
                <p class="modal-name">{{ title }}</p>
                <span class="iconfont icon-guanbi" @click="clooseModal"></span>
            </div>
            <div class="yk-modal-main">
                <slot></slot>
                <!-- <div class="slot"></div> -->
            </div>

        </div>
    </transition>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        default: '标题',
    },
    isModal: {
        default: false,
    }
});

const emit = defineEmits(['cloose']);

function clooseModal() {
    emit('cloose', '我是关闭');
}

// onMounted(clooseModal);

props;

</script>

<style lang="less" scoped>
@import url(../styles/commons.less);

.modal {

    // 入场
    &-enter {
        &-from {
            transform: translateX(360px);
        }

        &-active {
            transition: all 0.2s ease-out;
        }

        &-to {
            transform: translateX(0px);
        }
    }

    // 出场
    &-leave {
        &-from {
            transform: translateX(0px);
        }

        &-active {
            transition: all 0.2s ease-in;
        }

        &-to {
            transform: translateX(360px);
        }
    }
}

.yk-modal {
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 52px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(20px);

    .yk-modal-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: @padding-20;
        box-sizing: border-box;

        .modal-name {
            font-size: 16px;
            color: @gray-1;
            font-weight: 600;
        }

        .icon-guanbi {
            color: @gray-2;
            cursor: pointer;
            padding-left: 8px;
        }
    }

    .yk-modal-main {
        // border: 1px solid #eee;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 116px;
        box-sizing: border-box;
        overflow-x: auto;
        margin: 2px;
    }

    .slot {
        height: 1200px;
        background: #eee;
    }

    .yk-modal-main::-webkit-scrollbar {
        // 滚动条整体样式
        width: 4px;
        // 高宽分别对应横竖滚动条的尺寸
        height: 4px;
    }

    .yk-modal-main::-webkit-scrollbar-thumb {
        // 滚动条里面的小方块
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.2);
    }

    .yk-modal-main::-webkit-scrollbar-track {
        // 滚动条里面轨道
        border-radius: 4px;
        background: rgba(0, 0, 0, 0);
    }

}</style>
  