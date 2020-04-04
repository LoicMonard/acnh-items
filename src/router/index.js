import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ItemDetails from '../views/ItemDetails.vue'
import ItemList from '../components/ItemList.vue'
import Contribute from '../views/Contribute.vue'
import ListView from '../views/ListView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: ItemList,
  },
  {
    path: '*',
    component: ItemList
  },
  {
    path: '/items',
    name: 'items',
    component: ItemList
  },
  {
    path: '/details/:id',
    name: 'details',
    component: ItemDetails
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: Contribute
  },
  {
    path: '/lists/:id',
    name: 'lists',
    component: ListView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
