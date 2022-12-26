import { defineStore } from 'pinia'

export type ToDoItem = {
    id: string,
    name: string,
    is_finished: boolean
}

export type List = {
    list: ToDoItem[]
}
export const toDoStore = defineStore('todos', {
    state: () => ({
        list: []
    } as List),
    getters: {
        getList() {
            return this.list
        }
    },
    actions: {
        addNewTask(task: ToDoItem) {
            this.list.push(task);
        },
        deleteTask(id: string) {
            let tempList = [];
            this.list.forEach(item => {
                if (item.id !== id) {
                    tempList.push(item)
                }
            })
            this.list = tempList;
        }
    },
})