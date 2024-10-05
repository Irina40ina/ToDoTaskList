<script setup lang="ts">
// ############################## IMPORTS ##############################
import useMainStore from '@/store/index.js';
import TaskCardComp from '@/components/taskCardComp.vue';
import taskContentComp from '@/components/taskContentComp.vue';
import primaryDialogComp from '@/components/UI/primaryDialogComp.vue';
import deleteDialogWindowComp from '@/components/UI/deleteDialogWindowComp.vue';
import taskCreationComp from '@/components/taskCreationComp.vue';
import { fetchTasks, deleteTasks } from '@/api/tasksApi.js';
import { ref, onMounted } from 'vue';

const store = useMainStore();
// ############################## DATA ##############################
const deleteMode = ref(false);
const isShowSelectedTask = ref(false);
const isShowCreationDialog = ref(false);
const selectedTaskData = ref({
    id: 0,
    title: '',
    desription: '',
    isComplete: false,
});
const deletedTaskId = ref(0);
// ############################## METHODS ##############################
function openTask(taskData) {
  isShowSelectedTask.value = true;
  selectedTaskData.value = taskData;
}
function openDialogDeleteTask(id) {
  deleteMode.value = true;
  deletedTaskId.value = id;
}
async function deleteTask() {
  const result = await deleteTasks(deletedTaskId.value);
  if(result === 'success')
  deleteMode.value = false;
  store.tasks = store.tasks.filter((task) => task.id!== deletedTaskId.value);
}
// ############################## HOOKS ##############################
onMounted(async () => {
  const result = await fetchTasks();
  store.tasks = result;
})
</script>

<template>
  <div class="app">
    <!-- Заголовок -->
    <header>
      <div class="w-100 h-100 d-flex justify-space-between align-center elevation-4 px-4 rounded-lg">
        <p class="main-title">Мои задачи</p> 
        <v-btn size="small" prepend-icon="mdi-plus" color="var(--btn-bg)" @click="isShowCreationDialog = true">Новая задача</v-btn>
      </div>
    </header>
    <!-- Компонент отрисовки всех задач -->
    <main class="main-container">
      <taskCardComp v-for="task in store.tasks" :key="task.id" :task-data="task" @select-task="openTask" @open-dialog-window="openDialogDeleteTask"> </taskCardComp>
    </main>
    <!-- Компонент отрисовки открытой задачи -->
    <primaryDialogComp :is-show="isShowSelectedTask" @close="isShowSelectedTask = false">
      <taskContentComp :selected-task="selectedTaskData" @close="isShowSelectedTask = false" @open-dialog-window="openDialogDeleteTask"></taskContentComp>
    </primaryDialogComp>
    <!-- Компонент создания новой задачи -->
    <primaryDialogComp :is-show="isShowCreationDialog" @close="isShowCreationDialog = false">
      <taskCreationComp @close="isShowCreationDialog = false"></taskCreationComp>
    </primaryDialogComp>
    <!-- Диалоговое окно при удалении задачи -->
    <primaryDialogComp :is-show="deleteMode"><deleteDialogWindowComp @delete-task="deleteTask" @close="deleteMode = false"/></primaryDialogComp>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--layout-bg-color-2);
  background: linear-gradient(100deg, var(--layout-bg-color-2), var(--layout-bg-color-1));
}
header {
  width: 75%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--basic-bg);
  border-radius: 10px;
  margin-top: 1rem;
}
.main-title {
  font-family: var(--basic-font);
  font-size: 2rem;
  color: var(--title-fg);
}
.main-container {
  width: 75%;
  height: 80vh;
  height: max-content;
  overflow: auto;
  display: grid;
  align-items: start;
  justify-content: start;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  gap: 1rem;
  padding: .5rem 0;
}
.main-container::-webkit-scrollbar { width: 0 !important }
</style>
