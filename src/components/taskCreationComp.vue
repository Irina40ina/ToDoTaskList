<script setup lang="ts">
// ############################## IMPORTS ##############################
import { defineEmits, reactive } from 'vue';
import { createTasks } from '@/api/tasksApi.js';
import useMainStore from '@/store/index.js';

const store = useMainStore();
// ############################## EMITS ##############################
const emits = defineEmits(['close']);
// ############################## DATA ##############################
const taskData = reactive({
    id: null,
    title: '',
    description: '',
    isComplete: false,
})
// ############################## METHODS ##############################
function resetTaskData() {
    taskData.id = null;
    taskData.title = '';
    taskData.description = '';
    taskData.isComplete = false;
}
async function saveTask() {
    taskData.id = Date.now();
    const newTaskData = await createTasks(taskData)
    store.tasks.push(newTaskData)
    emits('close');
    resetTaskData();
}

</script>

<template>
    <div class="task-container">
        <v-text-field 
        class="w-100" 
        min-width="500" 
        variant="underlined"
        placeholder="Введите название задачи"
        v-model="taskData.title"
        >
        </v-text-field>

        <v-textarea 
        class="w-100" 
        v-model="taskData.description"
        placeholder="Напишите что нужно сделать"
        >
        </v-textarea>

        <div class="w-100 d-flex justify-end align-center ga-2">
            <v-btn size="x-small" icon="mdi-content-save-alert-outline" color="#5C6BC0" @click="saveTask"></v-btn>
        </div>
    </div>

</template>

<style scoped>
  .task-container {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 1rem;
  }  
</style>