<script setup lang="ts">
// ############################## IMPORTS ##############################
import { gsap } from "gsap";
import { defineProps, defineEmits, ref, watch } from 'vue';
// ############################## PROPS ##############################
const props = defineProps({
    isShow: {
        type: Boolean,
        default: false,
    }
}) 
// ############################## EMITS ##############################
const emits = defineEmits(['close']);
// ############################## DATA ##############################
const isShowDialog =ref(false);
// ############################## WATCHER ##############################
watch(() => props.isShow, (newValue) =>  {
    if(newValue === true) {
        isShowDialog.value = true;
        gsap.to('.primary-dialog__overlay', { duration: 0.3, opacity: 1 });
        gsap.to('.primary-dialog__content', { duration: 0.4, scale: 1 });
    } else {
        gsap.to('.primary-dialog__overlay', { duration: 0.3, opacity: 0 })
        gsap.to('.primary-dialog__content', { duration: 0.4, scale: 0 })
        .then(() => {
            isShowDialog.value = false;
        })
    }
})
</script>

<template>
    <div class="primary-dialog__overlay"
    @click="$emit('close')"
    v-show="isShowDialog"
    >
        <div class="primary-dialog__content" 
        @click.stop
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.primary-dialog__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right:0 ;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.1);
    backdrop-filter: blur(2px);
    opacity: 0;
    z-index: 1000;

}
.primary-dialog__content {
    position: relative;
    min-width: 200px;
    min-height: 80px;
    width: max-content;
    height: max-content;
    max-width: 80%;
    max-height: 80%;
    background-color: var(--color-bg-main);
    box-shadow: var(--shadow);
    overflow: auto;
    scale: 0;
    border-radius: 5px;
}
</style>