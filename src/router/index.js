import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Profile from '../pages/Profile.vue';
import Setting from '../pages/Setting.vue';
import TransactionsCreate from '../pages/TransactionsCreate.vue'


const routes = [
    //가계부 등록 라우터
    {
    path: '/trans_create',
    name: 'TransactionsCreate',
    component : TransactionsCreate
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path:'/profile',
        name:'Profile',
        component:Profile
    },
    {
        path:'/settings',
        name:'Setting',
        component:Setting
    },
]
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;