<script setup lang="ts">
import { computed} from 'vue'
import { DataView } from 'primevue';
import { useI18n } from 'vue-i18n';
import { useToDoStore } from '@/stores/todo';
import { SortOptions } from '@/shared/types/enums/sort-options';
import { intlFormat } from 'date-fns';

const props = defineProps<{
  type: 'deadline' | 'done' | 'undone'
}>()

const {t, locale} = useI18n()


const store = useToDoStore()

// const deadlineTodos = computed(() =>
//   store.getCloseToDeadlineItems(SortOptions.name_asc)
// )

const localeComputed = computed(() => {
  switch (locale.value) {
    case 'ru': return 'ru-RU'
    case 'en': return 'en-US'
    default: return 'ru-RU'
  }
})

const todos = computed(() => {
  switch (props.type) {
    case 'deadline':
      return store.getCloseToDeadlineItems(SortOptions.name_asc)
    case 'done':
      return store.getItems(SortOptions.name_asc, [{ field: 'done', value: false }])
    case 'undone':
      return store.getItems(SortOptions.name_asc, [{ field: 'done', value: true }])
    default:
      return store.getItems(SortOptions.name_asc, [{ field: 'done', value: false }])
  }
})

const title = computed(() => {
  switch (props.type) {
    case 'deadline':
      return t("closeDeadline")
    case 'done':
      return t("doneTasks")
    case 'undone':
      return t("undoneTasks")
    default:
      return ''
  }
})

const wrapperStyles = computed(() => ({
  wrapper: true,
  deadline: props.type === 'deadline',
  done: props.type === 'done',
  undone: props.type === 'undone'
}))
</script>
<template>
  <div :class="wrapperStyles">
    <h3>{{ title }}</h3>
    <DataView :value="todos">
      <template #list="slotProps">
        <div class="listWrapper">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <article>
              <h4>{{ item.title }}</h4>
              <p>{{
                intlFormat(item.created_at, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                }, {
                  locale: localeComputed,
                })
              }}</p>
            </article>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>
<style scoped>
.wrapper {
  border-width: 1px;
  border-style: solid;
}

.deadline {
  color: red
}

.done {
  color: green;
}

.undone {
  color: grey
}

.listWrapper {
  display: flex;
  flex-direction: column;
}
</style>
