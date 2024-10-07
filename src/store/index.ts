import { defineStore } from "pinia";
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { TaskDataType } from './types/index.ts';

export default defineStore('mainStore', () => {
    
    const tasks: Ref<TaskDataType[]> = ref([]);
    
    return {
        tasks,
    }
});