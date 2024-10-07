<script setup lang="ts">
// ############################## IMPORTS ##############################
import { gsap } from "gsap";
import { defineProps, defineEmits, ref, watch } from 'vue';
// ############################## PROPS ##############################
const props = withDefaults(defineProps<{
    isShow: boolean;
}>(), {
    isShow: false,
});
// ############################## EMITS ##############################
const emits = defineEmits<{
    (e: 'close'): void,
}>();
// ############################## DATA ##############################
const overlayRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
// ############################## WATCHER ##############################
watch(() => props.isShow, (newValue) =>  {
    if(newValue) {
        if (overlayRef.value && contentRef.value) {
            gsap.to(overlayRef.value, { duration: 0.2, opacity: 1 });
            gsap.to(contentRef.value, { duration: 0.3, scale: 1 });
        }
    } else {
        if (overlayRef.value && contentRef.value) {
            gsap.to(overlayRef.value, { duration: 0.2, opacity: 0 });
            gsap.to(contentRef.value, { duration: 0.3, scale: 0 });
        }
    }
})
</script>

<template>
    <div ref="overlayRef" class="primary-dialog__overlay"
    @click="emits('close')"
    v-show="props.isShow"
    >
        <div ref="contentRef" class="primary-dialog__content" 
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