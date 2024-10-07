<script setup lang="ts">
// ############################## IMPORTS ##############################
import type { TaskDataType } from './types/index.ts';
import type { Ref } from 'vue';

import { defineProps, defineEmits, ref } from 'vue';
import { completeTasks, returnTasks } from '@/api/tasksApi.ts';
import useMainStore from '@/store/index.ts';

const store = useMainStore();
// ############################## PROPS ##############################
const props = withDefaults(defineProps<{
    taskData: TaskDataType;
}>(), {});
// ############################## EMITS ##############################
const emits = defineEmits<{
    (e: 'selectTask', data: TaskDataType): void;
    (e: 'openDialogWindow', id: number): void;
}>();
// ############################## DATA ##############################
const isLoading: Ref<boolean> = ref(false);
// ############################## METHODS ##############################
async function completeTask() {
    try {
        isLoading.value = true;
        props.taskData.isComplete = true;
        const result = await completeTasks(props.taskData);
        if(result === 'success')
        store.tasks = store.tasks.map((t: TaskDataType) => t.id === props.taskData.id ? {...t, isComplete: true} : t);
    } catch (err) {
        console.error(`taskCardComp.vue => completeTask => ${err}`);
    } finally {
        isLoading.value = false;
    }
}
async function returnTask() {
    try {
        props.taskData.isComplete = false;
        const result = await returnTasks(props.taskData);
        if(result === 'success')
        store.tasks = store.tasks.map((t: TaskDataType) => t.id === props.taskData.id ? {...t, isComplete: false} : t);
    } catch (err) {
        console.error(`taskCardComp.vue => returnTask => ${err}`);
    }
}
</script>

<template>
        <!-- Карточка с задачей -->
        <v-card 
        @click="emits('selectTask', taskData)"
        class="w-100 d-flex flex-column rounded-lg"
        height="200"
        :style="{ backgroundColor: props.taskData.isComplete ? 'var(--completed-bg)' : 'var(--basic-bg)'}"
        >
            <v-card-title>
                {{ props.taskData.title }}
            </v-card-title>
            <!-- Текст карточки -->
            <v-card-text class="text-container">{{ props.taskData.description }}</v-card-text>
            <!-- Кнопки действий -->
            <v-card-actions class="justify-end ga-0">
                <!-- Кнопка выполнения -->
                <v-btn 
                size="small" 
                icon="mdi-check-all" 
                color="var(--basic-icon-color1)"
                @click.stop="completeTask"
                :loading="isLoading"
                v-show="!props.taskData.isComplete"
                ></v-btn>
                <!-- Кнопка возврата задачи -->
                <v-btn
                icon="mdi-undo-variant"
                size="small"
                color="var(--basic-icon-color2)"
                v-show="props.taskData.isComplete"
                @click.stop="returnTask"
                ></v-btn>
                <!-- Кнопка удаления -->
                <v-btn 
                size="small" 
                icon="mdi-trash-can-outline" 
                color="var(--basic-icon-color2)" 
                @click.stop="emits('openDialogWindow', props.taskData.id)"
                >
                </v-btn>
            </v-card-actions>
        </v-card>
</template>

<style scoped>
    .text-container {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        line-clamp: 5;
        color: var(--basic-fg);
        font-family: var(--basic-font);
    }
    
</style>