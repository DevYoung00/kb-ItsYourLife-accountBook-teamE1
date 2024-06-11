import { createRouter, createWebHistory } from 'vue-router';
import TransactionsCreate from '../pages/TransactionsCreate.vue'

const routes = [
  // 여기에 라우트 정의

  //가계부 등록 라우터
  {
    path: '/trans_create',
    name: 'TransactionsCreate',
    component : TransactionsCreate
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;