<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePageTitle } from '../composables/UsePageTitle'

const { setTitle } = usePageTitle()

onMounted(() => {
  setTitle(`Export hodnot spotřeby`)
})
</script>

<template>
  <h1>Zatím nedokončeno...</h1>
</template>
