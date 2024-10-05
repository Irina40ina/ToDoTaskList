<script setup lang="ts">
// ############################## IMPORTS ##############################
import { defineProps, defineEmits } from 'vue';
import { completeTasks } from '@/api/tasksApi.js';
import useMainStore from '@/store/index.js';

const store = useMainStore();
// ############################## PROPS ##############################
const props = defineProps({
    taskData: {
        type: Object,
        required: false,
        default: () => {},
    }
})
// ############################## EMITS ##############################
const emits = defineEmits(['selectTask', 'openDialogWindow'])

// ############################## DATA ##############################
async function completeTask() {
    props.taskData.isComplete = true;
    const result = await completeTasks(props.taskData);
    if(result === 'success')
    store.tasks = store.tasks.map(t => t.id === props.taskData.id ? {...t, isComplete: true} : t);
}
</script>

<template>
    <!-- Карточка с задачей -->
    <v-card @click="emits('selectTask', taskData)"
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
    <v-card-actions class="justify-end ga-0" @click.stop>
        <!-- Кнопка выполнения -->
        <v-btn 
        size="small" 
        icon="mdi-check-all" 
        color="var(--basic-icon-color1)"
        @click="completeTask"
        :style="{ display: props.taskData.isComplete ? 'none' : 'block'}"
        ></v-btn>
        <!-- Кнопка удаления -->
        <v-btn size="small" icon="mdi-trash-can-outline" color="var(--basic-icon-color2)" @click="emits('openDialogWindow', props.taskData.id)"></v-btn>
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