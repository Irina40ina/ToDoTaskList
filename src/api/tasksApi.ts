import type { TaskDataType } from '@/types/index.ts';

// Получение всех задач с Local Storage
export async function fetchTasks(): Promise<TaskDataType> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                if(!fetchedTasks) {
                    fetchedTasks = [];
                }
                resolve(fetchedTasks);  
            } catch (err) {
                console.error(import.meta.url + ':fetchTasks  => ', err);
                reject(err);
            }
        }, 1000)
    })
}
// Добавление задачи

export function createTasks(taskData: TaskDataType): Promise<TaskDataType> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                if (Array.isArray(fetchedTasks)) {
                    fetchedTasks.push(taskData);
                    localStorage.setItem('tasks', JSON.stringify(fetchedTasks));
                } else {
                    localStorage.setItem('tasks', JSON.stringify([taskData]));
                }
                resolve({...taskData});
            }
            catch (err) {
                console.error(import.meta.url + ':createTasks  => ', err);
                reject(err);
            }
            }, 1000)
    })
}

// Удаление задачи
export function deleteTasks(id: number): Promise<TaskDataType> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                if(fetchedTasks) {
                    fetchedTasks = fetchedTasks.filter((t: TaskDataType) => t.id !== id);
                    localStorage.setItem('tasks', JSON.stringify(fetchedTasks));
                    resolve('success');
                }
            }
            catch (err) {
                console.error(import.meta.url + ':deleteTasks  => ', err);
                reject(err);
            }
        }, 1000)
    })
}

// Редактирование задачи
export function editTasks(taskData: TaskDataType): Promise<TaskDataType> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                fetchedTasks = fetchedTasks.map((t: TaskDataType) => {
                if(t.id === taskData.id) {
                    t.title = taskData.title;
                    t.description = taskData.description;
                    t.isComplete = taskData.isComplete;
                    return t;
                } else {
                    return t;
                }
                });
                localStorage.setItem('tasks', JSON.stringify(fetchedTasks));  
                resolve([...fetchedTasks]);
            }
            catch (err) {
                console.error(import.meta.url + ':editTasks  => ', err);
                reject(err);
            }
        }, 1000)
    })
}
// Выполнение задачи
export function completeTasks(taskData: TaskDataType) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                fetchedTasks = fetchedTasks.map((t: TaskDataType) => {
                if(t.id === taskData.id) {
                    t.isComplete = true;
                    return t;
                } else {
                    return t;
                }
                });
                localStorage.setItem('tasks', JSON.stringify(fetchedTasks));  
                resolve('success');
            }
            catch (err) {
                console.error(import.meta.url + ':completeTasks  => ', err);
                reject(err);
            }
        }, 1000)
    })
}
export function returnTasks(taskData: TaskDataType) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                fetchedTasks = fetchedTasks.map((t: TaskDataType) => {
                if(t.id === taskData.id) {
                    t.isComplete = false;
                    return t;
                } else {
                    return t;
                }
                });
                localStorage.setItem('tasks', JSON.stringify(fetchedTasks));  
                resolve('success');
            }
            catch (err) {
                console.error(import.meta.url + ':returnTasks  => ', err);
                reject(err);
            }
        }, 1000)
    })
}
