<script setup lang="ts">
import { defineProps, defineEmits, ref, reactive, watch } from 'vue';
import { editTasks, completeTasks } from '@/api/tasksApi.js';
import useMainStore from '@/store/index.js';

const store = useMainStore();
// ############################## DATA ##############################
const editMode = ref(true);
const title = ref('');
const text = ref('');
const taskData = reactive({
    id: null,
    title: '',
    description: '',
    isComplete: false,
})
// ############################## EMITS ##############################
const emits = defineEmits('close', 'openDialogWindow');
// ############################## PROPS ##############################
const props = defineProps({
    selectedTask: {
        type: Object,
        required: true,
        default: () => {},
    }
});
// ############################## METHODS ##############################
async function saveChanges() {
    taskData.id = props.selectedTask.id;
    taskData.title = props.selectedTask.title;
    taskData.description = props.selectedTask.description;
    taskData.isComplete = false; 
    const result = await editTasks(taskData);
    if(result) store.tasks = store.tasks.map(t => t.id === result.id ? result : t);
    editMode.value = true;
    emits('close');
}
async function comleteTask() {
    props.selectedTask.isComplete = true;
    const result = await completeTasks(props.selectedTask);
    if(result === 'success')
    store.tasks = store.tasks.map(t => t.id === props.selectedTask.id ? {...t, isComplete: true} : t);
    emits('close');
}
</script>

<template>
    <div class="task-container">
        <v-text-field 
        class="w-100" 
        :readonly="editMode" 
        min-width="500" 
        variant="underlined"
        v-model="props.selectedTask.title"
        >
        </v-text-field>

        <v-textarea 
        class="w-100" 
        :readonly="editMode" 
        v-model="props.selectedTask.description"
        >
        </v-textarea>

        <div class="w-100 d-flex justify-end align-center ga-2">
            <!-- Сохранение -->
            <v-btn v-if="!editMode" size="x-small" icon="mdi-content-save-alert-outline" color="#5C6BC0" @click="saveChanges"></v-btn>
            <!-- Редактирование -->
            <v-btn 
            size="x-small" 
            icon="mdi-file-edit-outline" 
            color="#FF7043" 
            @click="editMode = false"
            :style="{ display: props.selectedTask.isComplete ? 'none' : 'block'}"
            ></v-btn>
            <!-- Выполнение -->
            <v-btn 
            size="x-small" 
            icon="mdi-check-all" 
            color="#4DB6AC" 
            @click="comleteTask"
            :style="{ display: props.selectedTask.isComplete ? 'none' : 'block'}"
            ></v-btn>
            <!-- Удаление -->
            <v-btn size="x-small" icon="mdi-trash-can-outline" color="#7E57C2" @click="emits('openDialogWindow', props.selectedTask.id)"></v-btn>
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