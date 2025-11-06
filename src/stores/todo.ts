import {ref} from 'vue'
import { defineStore } from 'pinia'
import { SortOptions } from '@/shared/types/enums/sort-options'

import {differenceInHours} from 'date-fns'

export const useToDoStore = defineStore('todo', () => {
  const todos = ref<ToDoStore>({
    tasks: [
    {
      id: '1',
      title: 'First',
      created_at: '11.11.2925',
      updated_at: '11.11.2925',
      done: false,
      notes: [
        'smth'
      ]
    }, {
      id: '2',
      title: 'Second',
      created_at: '11.11.2925',
      updated_at: '11.11.2925',
      done: false,
      notes: [
        'smth'
      ]
    }, {
      id: '3',
      title: 'Third',
      created_at: '11.11.2925',
      updated_at: '11.11.2925',
      done: true,
      notes: [
        'smth'
      ]
    }
  ],
  deadlineFilter: 5
})

  function addItem(item: ToDoItem) {
    todos.value.tasks.push(item)
  }

  function changeStatus(id: string, status: boolean) {
    todos.value.tasks.filter(item => item.id === id).forEach(item => item.done === status)
  }

  function sortItems(sort: SortOptions): ToDoItem[] {
    switch (sort) {
      case SortOptions.name_asc:
        return [...todos.value.tasks].sort((a,b) => (
          a.title.localeCompare(b.title)
        ))
      case SortOptions.name_desc:
        return [...todos.value.tasks].sort((a,b) => (
          b.title.localeCompare(a.title)
        ))
      case SortOptions.deadline_asc:
        return todos.value.tasks
      case SortOptions.deadline_desc:
        return todos.value.tasks
      case SortOptions.created_asc:
        return todos.value.tasks
      case SortOptions.created_desc:
        return todos.value.tasks
      default:
        return todos.value.tasks
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

  function getCloseToDeadlineItems(sort: SortOptions): ToDoItem[] {
    const sorted = sortItems(sort)
    const filtered = sorted.filter(item => {
      try {
        if (item.deadline) {
          const diff = differenceInHours(new Date(), item.deadline)
          return diff < todos.value.deadlineFilter
        } else {
          return false
        }
      } catch {
        return false
      }
    })
    return filtered
  }

  return {todos, addItem, changeStatus, getItems, getCloseToDeadlineItems}
}, {
  persist: {
    storage: localStorage,
  }
})
