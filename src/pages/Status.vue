<script setup lang="ts">
import { onMounted } from 'vue';
import { usePageTitle } from '../composables/usePageTitle'

const { setTitle } = usePageTitle()

onMounted(() => {
  setTitle('Status')
})

</script>

<template>
  <h1>Status</h1>
</template>
