import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ItemDetails from '../views/ItemDetails.vue'
import ItemList from '../components/ItemList.vue'
import Contribute from '../views/Contribute.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        name: 'items',
        path: 'items',
        component: ItemList
      },
      {
        name: 'details',
        path: 'details/:id',
        component: ItemDetails
      },
      {
        path: 'contribute',
        name: 'Contribute',
        component: Contribute
      }
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
