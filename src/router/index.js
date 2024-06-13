import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Profile from '../pages/Profile.vue';
import Setting from '../pages/Setting.vue';
import TransactionsCreate from '../pages/TransactionsCreate.vue'
import Login from '../pages/login.vue'
import TransactionList from '../pages/TransactionList.vue';
import Signup from '../pages/signup.vue';
import Chart from '../pages/Chart.vue'
import { useUsersStore } from '../stores/UsersStore';

const routes = [
  //가계부 등록 라우터
  {
    path: '/transactions/create',
    name: 'TransactionsCreate',
    component: TransactionsCreate
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/settings',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/transactions/list',
    name: 'TransactionList',
    component: TransactionList
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const usersStore = useUsersStore();
  const isLogin = !!usersStore.userId; 

  if (!isLogin && to.name !== 'Login' && to.name !== 'Signup') {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;