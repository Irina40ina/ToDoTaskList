<script setup lang="ts">
// ############################## IMPORTS ##############################
import type { TaskDataType } from '@/types/index.ts';
import type { Ref, Reactive } from 'vue';
import { defineProps, defineEmits, ref, reactive, watch } from 'vue';
import { editTasks, completeTasks, returnTasks } from '@/api/tasksApi.ts';
import useMainStore from '@/store/index.ts';

const store = useMainStore();
// ############################## DATA ##############################
const editMode: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const taskData: Reactive<TaskDataType> = reactive({
    id: null,
    title: '',
    description: '',
    isComplete: false,
})
// ############################## EMITS ##############################
const emits = defineEmits<{
    (e: 'close'): void,
    (e: 'openDialogWindow', id: number): void,
}>();

(['close', 'openDialogWindow']);
// ############################## PROPS ##############################
const props = withDefaults(defineProps<{
    selectedTask: TaskDataType;
    isLoading: boolean;
    isShow: boolean;
}>(), {
    isLoading: false,
    isShow: false,
});
// ############################## METHODS ##############################
async function saveChanges() {
    try {
        isLoading.value = true;
        taskData.id = props.selectedTask.id;
        taskData.title = props.selectedTask.title;
        taskData.description = props.selectedTask.description;
        taskData.isComplete = false; 
        if(taskData.title !== '' && taskData.description!== '') {
            const result = await editTasks(taskData);
            if(result) store.tasks = store.tasks.map((t: TaskDataType) => t.id === result.id ? result : t);
        } else {
            alert('Заполните все поля!');
        }
    } catch (err) {
        console.error(`taskContentComp.vue => saveChanges => ${err}`);
    } finally {
        editMode.value = false;
        isLoading.value = false;
        emits('close');
    }
}
async function comleteTask() {
    try {
        props.selectedTask.isComplete = true;
        const result = await completeTasks(props.selectedTask);
        if(result === 'success') {
            store.tasks = store.tasks.map((t: TaskDataType) => t.id === props.selectedTask.id ? {...t, isComplete: true} : t);
        }
    } catch (err) {
        console.error(`taskContentComp.vue => comleteTask => ${err}`);
    } finally {
        emits('close');
    }
}
async function returnTask() {
    try {
        props.selectedTask.isComplete = false;
        const result = await returnTasks(props.selectedTask);
        if(result === 'success')
        store.tasks = store.tasks.map((t: TaskDataType) => t.id === props.selectedTask.id ? {...t, isComplete: false} : t);
    } catch (err) {
        console.error(`taskContentComp.vue => returnTask => ${err}`);
    } finally {
        emits('close');
    }
}
</script>

<template>
    <div 
    class="task-container"
    v-show="props.isShow"
    >
        <!-- Кнопка закрытия окна -->
        <v-btn 
        variant="outlined" 
        size="small" 
        icon="mdi-close" 
        color="var(--basic-icon-color2)" 
        @click="emits('close')"
        >
        </v-btn>
        <!-- Заголовок -->
        <v-text-field 
        class="w-100"
        :readonly="!editMode" 
        min-width="500" 
        variant="underlined"
        v-model="props.selectedTask.title"
        >
        </v-text-field>
        <!-- Текст -->
        <v-textarea 
        class="w-100" 
        :readonly="!editMode" 
        v-model="props.selectedTask.description"
        >
        </v-textarea>
        <!-- Блок с кнопками -->
        <div class="w-100 d-flex justify-end align-center ga-2">
            <!-- Сохранение -->
            <v-btn 
            v-show="editMode"
            :loading="isLoading" 
            size="x-small" 
            icon="mdi-content-save-alert-outline" 
            color="#5C6BC0" 
            @click="saveChanges"
            ></v-btn>
            <!-- Редактирование -->
            <v-btn 
            size="x-small" 
            icon="mdi-file-edit-outline" 
            color="#FF7043" 
            @click="editMode = true"
            v-show="!props.selectedTask.isComplete"
            ></v-btn>
            <!-- Выполнение -->
            <v-btn 
            size="x-small" 
            icon="mdi-check-all" 
            color="#4DB6AC" 
            @click="comleteTask"
            v-show="!props.selectedTask.isComplete"
            ></v-btn>
            <!-- Кнопка возврата задачи -->
            <v-btn
            icon="mdi-undo-variant"
            size="x-small"
            color="#7E57C2"
            v-show="props.selectedTask.isComplete"
            @click.stop="returnTask"
            ></v-btn>
            <!-- Удаление -->
            <v-btn 
            size="x-small" 
            icon="mdi-trash-can-outline" 
            color="#7E57C2" 
            @click="emits('openDialogWindow', props.selectedTask.id)"
            :loading="props.isLoading"
            ></v-btn>
        </div>
    </div>

</template>

<style>
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