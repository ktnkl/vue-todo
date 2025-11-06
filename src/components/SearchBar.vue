<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
<template>
  <div class="searchBar">
    <InputText />
    <PrimeButton type="submit">
      {{ t("search") }}
    </PrimeButton>
  </div>
</template>
<style scoped>
.searchBar {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
</style>