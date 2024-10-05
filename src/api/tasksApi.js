// Получение всех задач с Local Storage
export async function fetchTasks() {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                if(fetchedTasks === null) {
                    fetchedTasks = [];
                }
                resolve(fetchedTasks);  
            }, 500)
        }
        catch (err) {
            console.error(import.meta.url + ':fetchTasks  => ', err);
            reject(err);
        }
    })
}
// Добавление задачи

export function createTasks(taskData) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                if (Array.isArray(fetchedTasks)) {
                    fetchedTasks.push(taskData);
                    localStorage.setItem('tasks', JSON.stringify(fetchedTasks));
                } else {
                    const array = [];
                    array.push(taskData);
                    localStorage.setItem('tasks', JSON.stringify(array));
                }
                
                resolve({...taskData});
            }, 500)
        }
        catch (err) {
            console.error(import.meta.url + ':createTasks  => ', err);
            reject(err);
        }
    })
}

// Удаление задачи
export function deleteTasks(id) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
                fetchedTasks = fetchedTasks.filter(t => t.id !== id);
                localStorage.setItem('tasks', JSON.stringify(fetchedTasks));
            resolve('success');
            }, 500)
        }
        catch (err) {
            console.error(import.meta.url + ':deleteTasks  => ', err);
            reject(err);
        }
    })
}

// Редактирование задачи
export function editTasks(taskData) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
            fetchedTasks = fetchedTasks.map((t) => {
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
            resolve(...fetchedTasks);
            }, 500)
        }
        catch (err) {
            console.error(import.meta.url + ':editTasks  => ', err);
            reject(err);
        }
    })
}
// Выполнение задачи
export function completeTasks(taskData) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                let fetchedTasks = JSON.parse(localStorage.getItem('tasks'));
            fetchedTasks = fetchedTasks.map((t) => {
                if(t.id === taskData.id) {
                    t.isComplete = true;
                    return t;
                } else {
                    return t;
                }
            });
            localStorage.setItem('tasks', JSON.stringify(fetchedTasks));  
            resolve('success');
            }, 500)
        }
        catch (err) {
            console.error(import.meta.url + ':completeTasks  => ', err);
            reject(err);
        }
    })
}