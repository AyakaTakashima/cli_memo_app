import { createRouter, createWebHistory } from 'vue-router'

import MemoList from './components/MemoList.vue'
import MemoEdit from './components/MemoEdit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/memos'
    },
    {
      name: 'memo-list',
      path: '/memos',
      component: MemoList,
    },
    {
      name: 'edit-url',
      path: '/memos/:memoId/edit',
      component: MemoEdit,
      props: true
    }
  ],
})

export default router

