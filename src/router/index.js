import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/view/index.vue'
import Introduce from '@/view/Introduce.vue'
import Environment from '@/view/Environment.vue'
import ModelChoice from '@/view/ModelChoice.vue'
import ModelStructure from '@/view/ModelStructure.vue'

let history = createWebHistory()
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
  }
]

export default createRouter({ history, routes }) 