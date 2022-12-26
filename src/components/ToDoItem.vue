<template>
  <div class="item">
    <input type="checkbox" class="checkbox" id="checkbox" @click="changeState"
    v-if="is_finished" checked/>
    <input type="checkbox" class="checkbox" id="checkbox" @click="changeState"
    v-if="!is_finished" />
    <div class="text">
      <slot name="task"></slot>
    </div>
    <div class="delete" @click="deleteTask">
      <label style="padding: 5px;">x</label>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  name: "ToDoItem",
  props: ["is_finished"],
  methods: {
    changeState() {
      this.$emit('change-state');
    },
    deleteTask() {
      this.$emit('delete-task');
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../assets/scss/toDoItem.scss";
</style>