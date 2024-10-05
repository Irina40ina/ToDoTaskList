import { defineStore } from "pinia";
import { ref } from 'vue';

export default defineStore('mainStore', () => {
    
    const tasks = ref([]);
    function addTaskToStore(taskData) {
        if(taskData) {
            tasks.value.push(taskData);
        } else {
            return
        }
    }
    
    return {
        tasks,
        addTaskToStore,
    }
});