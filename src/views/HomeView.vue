<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue';
import AddBar from '@/components/AddBar.vue';
import {useToDoStore} from '@/stores/todo'
import { SortOptions } from '@/shared/types/enums/sort-options';
import { computed } from 'vue';

const store = useToDoStore()

const todos = computed(() =>
  store.getItems(SortOptions.name_asc, [{ field: 'done', value: false }])
);

</script>
<template>
  <SearchBar />
  <AddBar />
  <ul>
    <li v-for="item in todos" v-bind:key="item.id">
      {{ item.title }}
    </li>
  </ul>
</template>