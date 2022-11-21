import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/view/index.vue'
import Introduce from '@/view/Introduce.vue'
import Environment from '@/view/Environment.vue'
import ModelChoice from '@/view/ModelChoice.vue'
import ModelStructure from '@/view/ModelStructure.vue'
import UnComplete from '@/view/UnComplete.vue'

import Motivation from '@/view/Motivation.vue';
import Purpose from '@/view/Purpose.vue'
import Content from '@/view/Content.vue'

let routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/motivation',
    name: 'motivation',
    component: Motivation
  },
  {
    path: '/purpose',
    name: 'purpose',
    component: Purpose
  },
  {
    path: '/content',
    name: 'content',
    component: Content
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: Introduce
  },
  {
    path: '/environment',
    name: 'environment',
    component: Environment
  },
  {
    path: '/modelChoice',
    name: 'modelChoice',
    component: ModelChoice
  },
  {
    path: '/modelStructure',
    name: 'modelStructure',
    component: ModelStructure
  },
  {
    path: '/unComplete',
    name: 'unComplete',
    component: UnComplete
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
}) 