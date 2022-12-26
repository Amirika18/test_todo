<template>
  <div class="container">
    <div class="center">
      <h1 class="header">{{this.header}}</h1>
    </div>
    <div class="center">
      <NewToDo @add-new-item="addNewItem"></NewToDo>
    </div>
    <hr>
    <div class="center">
      <div class="list">
        <ToDoItem v-for="item in this.list" key="item.task"
                  @change-state="changeState(item.id)"
                  @delete-task="deleteTask(item.id)"
                  :is_finished="item.is_finished">
          <template #task>{{ item.name }}</template>
        </ToDoItem>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ToDoItem from "./ToDoItem.vue";
import NewToDo from "./NewToDo.vue";
import axios from "axios";
import {toDoStore} from "../stores/index.ts";

export default defineComponent({
  components: {
    NewToDo,
    ToDoItem
  },
  setup() {
    const todos = toDoStore();
    return {todos};
  },
  data() {
    return {
      header: "To Do App",
      list: []
    }
  },
  name: "ToDoApp",
  methods: {
    deleteTask(id: string) {
      axios
          .delete('http://localhost:5173/tasks/' + id)
          .then(res => {
            if (res.status === 200) {
              this.todos.deleteTask(id);
              this.list = this.todos.getList;
            }
          })
    },
    changeState(id: string) {
      axios
          .patch('http://localhost:5173/tasks/' + id)
    },
    addNewItem(task: string) {
      const newTask = {
        id: Date.now().toString(),
        name: task,
        is_finished: false
      }
      axios
          .post('http://localhost:5173/tasks', newTask)
          .then(res => {
            if (res.status === 200) this.todos.addNewTask(newTask);
          })
    },
    getTasks() {
      axios
          .get('http://localhost:5173/tasks')
          .then(res => {
            res.data.forEach(item => {
              this.todos.addNewTask(item);
            })
          })
    }
  },
  mounted() {
    this.getTasks();
    this.list = this.todos.getList;
  }
})
</script>

<style lang="scss" scoped>
@import "../assets/scss/toDoApp.scss";
</style>