<script setup lang="ts">
import { ref } from 'vue'
import MenuItem from './components/sidebar/MenuItem.vue'

import { usePageTitle } from './composables/UsePageTitle'

const { title } = usePageTitle()

const menu = ref([{
  label: 'Grafy',
  icon: 'chart-bar',
  path: '/graphs'
}, {
  label: 'Odečíst',
  icon: 'pen-to-square',
  path: '/group-readout'
}, {
  label: 'Export',
  icon: 'file-export',
  path: '/exports'
}, {
  label: 'Měřidla',
  icon: 'gauge',
  path: '/meas-points'
},{
  label: 'MBus',
  icon: 'wave-pulse',
  path: '/mbus'
}])

</script>

<template>
  <div class="min-h-screen flex relative lg:static bg-surface-50 dark:bg-surface-950 content-stretch">
    <div id="app-sidebar-6" class="hidden lg:block shrink-0 absolute lg:static left-0 top-0 z-10 select-none w-[5rem] bg-primary animate-duration-300 animate-ease-in-out">
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-center shrink-0 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.59219 2.87829C6.44766 3.67858 5.4127 4.62478 4.51426 5.68992C8.1857 5.34906 12.8501 5.90564 18.2655 8.61335C24.0484 11.5047 28.705 11.6025 31.9458 10.9773C31.6517 10.087 31.2815 9.23135 30.843 8.41791C27.1332 8.80919 22.3772 8.29127 16.8345 5.51998C13.3148 3.76014 10.2122 3.03521 7.59219 2.87829ZM28.6759 5.33332C25.7462 2.06 21.4887 0 16.75 0C15.3584 0 14.0081 0.177686 12.7209 0.511584C14.4643 0.987269 16.3163 1.68319 18.2655 2.65781C22.3236 4.68682 25.8271 5.34013 28.6759 5.33332ZM32.6387 14.1025C28.7235 14.8756 23.317 14.7168 16.8345 11.4755C10.774 8.44527 5.95035 8.48343 2.69712 9.20639C2.5292 9.24367 2.36523 9.28287 2.20522 9.32367C1.7793 10.25 1.43931 11.2241 1.19536 12.2356C1.45591 12.166 1.72514 12.0998 2.00293 12.0381C5.94966 11.161 11.5261 11.1991 18.2655 14.5689C24.3261 17.5991 29.1497 17.561 32.4029 16.838C32.5144 16.8133 32.6242 16.7877 32.7322 16.7613C32.7441 16.509 32.75 16.2552 32.75 16C32.75 15.358 32.7122 14.7248 32.6387 14.1025ZM32.2098 20.1378C28.3326 20.8157 23.0836 20.5555 16.8345 17.431C10.774 14.4008 5.95035 14.439 2.69712 15.1619C1.975 15.3223 1.32539 15.5178 0.752344 15.7241C0.750782 15.8158 0.75 15.9078 0.75 16C0.75 24.8366 7.91344 32 16.75 32C24.1557 32 30.3862 26.9687 32.2098 20.1378Z"
              class="fill-primary-contrast"
            />
          </svg>
        </div>

        <div class="overflow-y-auto flex-1 p-4">
          <div class="grid grid-cols-1 gap-3">
            <MenuItem 
              v-for="item in menu" 
              :icon="item.icon" 
              :label="item.label" 
              :path="item.path"
            ></MenuItem>
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-screen flex flex-col relative flex-auto">
      <div class="flex justify-start items-center py-3 px-8 bg-surface-0 dark:bg-surface-900 relative lg:static border-b border-surface-200 dark:border-surface-700">
        <div class="flex items-center justify-between gap-8 w-full lg:w-auto">
          <a
            v-styleclass="{
              selector: '#app-sidebar-6',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-fadeinleft',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeoutleft',
              hideOnOutsideClick: true
            }"
            class="cursor-pointer flex items-center justify-center lg:hidden text-surface-700 dark:text-surface-100"
          >
            <i class="pi pi-bars text-xl! leading-none!" />
          </a>

          <h1 class="mr-auto text-xl text-surface-700 dark:text-surface-100">{{ title }}</h1>
        </div>
      </div>

      <div class="p-5 flex flex-col flex-auto">
        <Toast></Toast>
        <ConfirmDialog></ConfirmDialog>
        <Card>
          <template #content>
            <router-view></router-view>
          </template>
        </Card>
          
        
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
