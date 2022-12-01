import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '@/view/index.vue'
import Introduce from '@/view/Introduce.vue'
import Motivation from '@/view/Motivation.vue';
import Purpose from '@/view/Purpose.vue'
import Content from '@/view/Content.vue'
import Result from '@/view/Result.vue'
import Summarize from '@/view/Summarize.vue'
import Reference from '@/view/Reference.vue'
let routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: Introduce
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
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/summarize',
    name: 'summarize',
    component: Summarize
  },
  {
    path: '/reference',
    name: 'Reference',
    component: Reference
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