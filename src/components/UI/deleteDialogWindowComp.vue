<script setup lang="ts">
    import { defineEmits } from 'vue';
    
    const emits = defineEmits(['close', 'deleteTask']);

</script>

<template>
    <div class="delete-dialog-window">
        <div class="delete-dialog-window__text">
            <p>Вы уверены, что хотите удалить задачу?</p>
        </div>
        <div class="delete-dialog-window__actions">
            <v-btn variant="outlined" size="small" color="var(--basic-icon-color1)" @click="emits('deleteTask')">Да</v-btn>
            <v-btn variant="outlined" size="small" color="var(--basic-icon-color2)" @click="$emit('close')">Нет</v-btn>
        </div>
    </div>
</template>


<style scoped>
    .delete-dialog-window {
        width: 100%;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 1rem;
        border-radius: 8px;
    }
    .delete-dialog-window__text {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--basic-font);
        color: var(--basic-fg);
    }
    .delete-dialog-window__actions {
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }
    
</style>