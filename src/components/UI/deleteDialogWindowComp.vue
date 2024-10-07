<script setup lang="ts">
    import { defineEmits, defineProps } from 'vue';
    // ############################## EMITS ##############################
    const emits = defineEmits<{
        (e: 'close'): void;
        (e: 'deleteTask'): void;
    }>();
    // ############################## PROPS ##############################
    const props = withDefaults(defineProps<{
        isShow?: boolean;
        isLoading?: boolean;
    }>(), {
        isShow: false,
        isLoading: false,
    });
</script>

<template>
    <div class="delete-dialog-window">
        <div class="delete-dialog-window__text">
            <p>Вы уверены, что хотите удалить задачу?</p>
        </div>
        <div class="delete-dialog-window__actions">
            <!-- loader -->
            <v-icon v-if="props.isLoading" class="icon-loader" color="#7E57C2">mdi-loading</v-icon>
            <v-btn 
            variant="outlined" 
            size="small" 
            color="var(--basic-icon-color1)" 
            @click="emits('deleteTask')"
            v-show="!props.isLoading"
            >
            Да
            </v-btn>
            <v-btn 
            variant="outlined" 
            size="small" 
            color="var(--basic-icon-color2)" 
            @click="emits('close')"
            v-show="!props.isLoading"
            >
            Нет
            </v-btn>
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
    .icon-loader {
        display: inline-block;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
</style>