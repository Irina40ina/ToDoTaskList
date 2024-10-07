<script setup lang="ts">
// ############################## IMPORTS ##############################
import type { Ref } from 'vue';
import type { TaskDataType } from '@/types/index.ts';
import useMainStore from '@/store/index.ts';
import TaskCardComp from '@/components/taskCardComp.vue';
import taskContentComp from '@/components/taskContentComp.vue';
import primaryDialogComp from '@/components/UI/primaryDialogComp.vue';
import deleteDialogWindowComp from '@/components/UI/deleteDialogWindowComp.vue';
import taskCreationComp from '@/components/taskCreationComp.vue';
import { fetchTasks, deleteTasks } from '@/api/tasksApi.ts';
import { ref, onMounted } from 'vue';

const store = useMainStore();
// ############################## DATA ##############################
const deleteMode: Ref<boolean> = ref(false);
const isShowSelectedTask: Ref<boolean> = ref(false);
const isShowCreationDialog: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const selectedTaskData: Ref<TaskDataType> = ref({
    id: null,
    title: '',
    description: '',
    isComplete: false,
});
const deletedTaskId: Ref<number | null> = ref(null);
// ############################## METHODS ##############################
function openTask(taskData: TaskDataType) {
  try {
    isShowSelectedTask.value = true;
    selectedTaskData.value = taskData;
  } catch (err) {
    console.error(`App.vue => openTask => ${err}`);
  }
}
function openDialogDeleteTask(id: number) {
  try {
    deleteMode.value = true;
    deletedTaskId.value = id;
  } catch (err) {
    console.error(`App.vue => openDialogDeleteTask => ${err}`);
  }
}
async function deleteTask() {
  try {
    isLoading.value = true;
    const result = await deleteTasks(deletedTaskId.value);
    if(result === 'success') {
      store.tasks = store.tasks.filter((task: TaskDataType) => task.id!== deletedTaskId.value);
    }
  } catch (err) {
    console.error(`App.vue => deleteTask => ${err}`);
  } finally {
    isLoading.value = false;
    deleteMode.value = false;
    isShowSelectedTask.value = false;
  }
}
function handleCloseDeleteWindow() {
  deleteMode.value = false;
}
// ############################## HOOKS ##############################
onMounted(async () => {
  try {
    const result = await fetchTasks();
    store.tasks = result;
  } catch (err) {
    console.error(`App.vue => onMounted => ${err}`);
  }
})
</script>

<template>
  <div class="app">
    <!-- Заголовок -->
    <header>
      <div class="w-100 h-100 d-flex justify-space-between align-center elevation-4 px-4 rounded-lg">
        <p class="main-title">Мои задачи</p> 
        <v-btn 
        size="small" 
        prepend-icon="mdi-plus" 
        color="var(--btn-bg)" 
        @click="isShowCreationDialog = true"
        >
        Новая задача
        </v-btn>
      </div>
    </header>
    <!-- Компонент отрисовки всех задач -->
    <main class="main-container">
        <taskCardComp 
        v-for="task in store.tasks" 
        :key="task.id" 
        :task-data="task" 
        @select-task="openTask" 
        @open-dialog-window="openDialogDeleteTask"
        > 
        </taskCardComp>
    </main>
    
    <!-- Компонент отрисовки открытой задачи -->
    <primaryDialogComp 
    :is-show="isShowSelectedTask"
    @close="isShowSelectedTask = false"
    >
      <taskContentComp 
      :is-show="isShowSelectedTask"
      :selected-task="selectedTaskData" 
      @close="isShowSelectedTask = false" 
      @open-dialog-window="openDialogDeleteTask"
      :is-loading="isLoading"
      >
      </taskContentComp>
    </primaryDialogComp>

    <!-- Компонент создания новой задачи -->
    <primaryDialogComp 
    :is-show="isShowCreationDialog" 
    @close="isShowCreationDialog = false"
    >
      <taskCreationComp 
      :is-show="isShowCreationDialog" 
      @close="isShowCreationDialog = false"
      >
      </taskCreationComp>
    </primaryDialogComp>
    
    <!-- Диалоговое окно при удалении задачи -->
    <primaryDialogComp 
    :is-show="deleteMode"
    >
      <deleteDialogWindowComp 
      @delete-task="deleteTask" 
      @close="handleCloseDeleteWindow"
      :is-loading="isLoading"
      />
    </primaryDialogComp>
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
  border-radius: 8px;
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
