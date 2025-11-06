<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { v4 as uuidv4 } from 'uuid';

import { useToDoStore } from '@/stores/todo';

const { t } = useI18n();

const store = useToDoStore()

const visible = ref(false)
const title = ref('')
const deadline = ref()

const submit = () => {
  const date = new Date().toISOString()

  const payload: ToDoItem = {
    id: uuidv4(),
    title: title.value,
    created_at: date,
    updated_at: date,
    done: false,
    deadline: deadline.value ? deadline.value.toISOString() : ''
  }

  store.addItem(payload)
  visible.value = false
}
</script>
<template>
  <PrimeDialog v-model:visible="visible" modal header="Добавить задачу" :style="{ width: '25rem' }">

    <form @submit.prevent="submit">
      <FloatLabel variant="on">
        <label for="add-task-title">{{ t('enterTaskTitle') }}</label>
        <InputText v-model="title" id="add-task-title" fluid required/>
      </FloatLabel>
      <FloatLabel variant="on">
        <label for="add-task-deadline">{{ t('enterDeadline') }}</label>
        <DatePicker id="add-task-deadline" v-model="deadline" show-icon hour-format="24" fluid show-time/>
      </FloatLabel>

      <PrimeButton type="submit" icon="pi pi-check" iconPos="right" :label="t('add')"/>
    </form>
  </PrimeDialog>

  <div class="addBar">

    <PrimeButton @click="visible = true">
      {{ t('add') }}
    </PrimeButton>
  </div>
</template>
<style scoped>
.addBar {
  width: 100%;
  display: flex;
  justify-content: start;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
