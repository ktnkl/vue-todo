import {ref} from 'vue'
import { defineStore } from 'pinia'
import { SortOptions } from '@/shared/types/enums/sort-options'

export const useToDoStore = defineStore('todo', () => {
  const todos = ref<ToDoItem[]>([
    {
      id: 1,
      title: 'First',
      created_at: '11.11.2925',
      updated_at: '11.11.2925',
      done: false,
      notes: [
        'smth'
      ]
    },
    {
      id: 2,
      title: 'Second',
      created_at: '11.11.2925',
      updated_at: '11.11.2925',
      done: false,
      notes: [
        'smth'
      ]
    },
    {
      id: 3,
      title: 'Third',
      created_at: '11.11.2925',
      updated_at: '11.11.2925',
      done: true,
      notes: [
        'smth'
      ]
    }
  ])

  function addItem(item: ToDoItem) {
    todos.value.push(item)
  }

  function changeStatus(id: number, status: boolean) {
    todos.value.filter(item => item.id === id).forEach(item => item.done === status)
  }

  function sortItems(sort: SortOptions): ToDoItem[] {
    switch (sort) {
      case SortOptions.name_asc:
        return [...todos.value].sort((a,b) => (
          a.title.localeCompare(b.title)
        ))
      case SortOptions.name_desc:
        return [...todos.value].sort((a,b) => (
          b.title.localeCompare(a.title)
        ))
      case SortOptions.deadline_asc:
        return todos.value
      case SortOptions.deadline_desc:
        return todos.value
      case SortOptions.created_asc:
        return todos.value
      case SortOptions.created_desc:
        return todos.value
      default:
        return todos.value
    }
  }

  function filterItems(items: ToDoItem[], filters: FilterOption[]): ToDoItem[] {
    let result = items
    for (const filter of filters) {
      result = result.filter(item => item[filter.field] === filter.value)
    }
    return result
  }

  function getItems(sort: SortOptions, filter: FilterOption[]) {
    const sorted = sortItems(sort)
    const filtered = filterItems(sorted, filter)
    return filtered
  }

  return {todos, addItem, changeStatus, getItems}
}, {
  persist: {
    storage: localStorage,
  }
})
