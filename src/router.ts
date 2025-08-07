import { createRouter, createWebHistory } from 'vue-router'
import MeasPoints from './pages/MeasPoints.vue'
import MeasPoint from './pages/MeasPoint.vue'
import Status from './pages/Status.vue'
import MBus from './pages/MBus.vue'
import Graphs from './pages/Graphs.vue'
import Exports from './pages/Exports.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Status', component: Status },
    { path: '/meas-points', name: 'Measurement Points', component: MeasPoints },
    { path: '/meas-points/:id', name: 'Measurement Point Detail', component: MeasPoint },
    { path: '/graphs', name: 'Graphs', component: Graphs },
    { path: '/exports', name: 'Exports', component: Exports },
    { path: '/mbus', name: 'MBus Query', component: MBus },
  ],
})