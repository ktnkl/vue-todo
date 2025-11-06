<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import AddBar from '@/components/AddBar.vue';
import TaskList from '@/components/TaskList.vue';


</script>
<template>
  <SearchBar />
  <AddBar />
  <TaskList type="deadline"/>
  <TaskList type="done"/>
  <TaskList type="undone"/>
</template>
