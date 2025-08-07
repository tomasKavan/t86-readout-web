<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  icon: String,
  label: String,
  path: String
})

const iconWithPi = computed(() => {
  return 'pi-' + props.icon
})

</script>

<template>
  <div class="flex flex-col items-center">
    <routerLink 
      :to="path || '/'"
      class="p-3 px-4 rounded-lg border border-primary-400 dark:border-primary-300 inline-flex items-center justify-center hover:bg-primary-emphasis text-primary-contrast transition-colors duration-150 shrink-0 cursor-pointer"
    >
      <i :class="iconWithPi" class="pi text-md! leading-tight! text-primary-contrast dark:text-primary-contrast" />
    </routerLink>
    <div class="mt-2 text-primary-100 dark:text-primary-contrast text-sm font-normal text-center">{{label}}</div>
  </div>
</template>