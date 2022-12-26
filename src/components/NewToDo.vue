<template>
  <div class="new-todo">
    <div class="input">
      <input id="input" class="text" placeholder="some text"/>
    </div>
    <div class="add" @click="addNewItem">
      <div id="plus">+</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "NewToDo",
  methods: {
    addNewItem() {
      const task = document.getElementById("input");
      this.$emit('add-new-item', task.value)
      task.value = "";
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../assets/scss/newToDO.scss";
</style>