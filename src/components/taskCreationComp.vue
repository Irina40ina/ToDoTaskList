<script setup lang="ts">
// ############################## IMPORTS ##############################
import type { TaskDataType } from './types/index.ts';
import type { Ref, Reactive } from 'vue';
import { defineEmits, reactive, ref } from 'vue';
import { createTasks } from '@/api/tasksApi.ts';
import useMainStore from '@/store/index.ts';

const store = useMainStore();
// ############################## EMITS ##############################
const emits = defineEmits<{
    (e: 'close'): void,
}>();
// ############################## DATA ##############################
const taskData: Reactive<TaskDataType> = reactive({
    id: null,
    title: '',
    description: '',
    isComplete: false,
})
const isLoading: Ref<boolean> = ref(false);
// ############################## METHODS ##############################
function resetTaskData() {
    taskData.id = null;
    taskData.title = '';
    taskData.description = '';
    taskData.isComplete = false;
}
async function saveTask() {
    try {
        isLoading.value = true;
        taskData.id = Date.now();
        if(taskData.title !== '' && taskData.description!== '') {
            const newTaskData = await createTasks(taskData)
            store.tasks.push(newTaskData)
            resetTaskData();
        } else {
            alert('Заполните все поля!')
        }
    } catch (err) {
        console.error(`taskCreationComp.vue => saveTask => ${err}`);
    } finally {
        isLoading.value = false;
        emits('close');
    }

}

</script>

<template>
    <div class="task-container">
        <!-- Кнопка закрытия окна -->
        <v-btn 
        variant="outlined" 
        size="small" 
        icon="mdi-close" 
        color="var(--basic-icon-color2)" 
        @click="emits('close')"
        >
        </v-btn>
        <!-- Поле ввода заголовка -->
        <v-text-field 
        :autofocus="true"
        color="#7E57C2"
        class="w-100" 
        min-width="500" 
        variant="underlined"
        placeholder="Введите название задачи"
        v-model="taskData.title"
        >
        </v-text-field>
        <!-- Поле ввода текста -->
        <v-textarea 
        color="#7E57C2"
        class="w-100" 
        v-model="taskData.description"
        placeholder="Введите описание задачи"
        >
        </v-textarea>
        <!-- Блок с кнопкой -->
        <div class="w-100 d-flex justify-end align-center ga-2">
            <v-btn 
            :loading="isLoading" 
            size="x-small" 
            icon="mdi-content-save-alert-outline" 
            color="#5C6BC0" 
            @click="saveTask"
            >
            </v-btn>
        </div>
    </div>

</template>

<style scoped>
  .task-container {
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    background-color: white;
    padding: 1rem;
  }  
</style>