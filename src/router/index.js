import { createWebHashHistory, createRouter } from 'vue-router';
import ListView from '../views/ListView.vue';
import BlockView from '../views/BlockView.vue';
import TxesView from '../views/TxesView.vue';

const routes = [
  {
    path: '/',
    redirect: '/blocks?p=1',
  },
  {
    path: '/blocks',
    name: 'BlockList',
    component: ListView,
  },
  {
    path: '/block/:id',
    name: 'Block',
    component: BlockView,
  },
  {
    path: '/txes',
    name: 'Transactions',
    component: TxesView,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
