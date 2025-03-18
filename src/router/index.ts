import ProjectsLayouts from '@/modules/projects/layout/ProjectsLayouts.vue'
import ProjectsView from '@/modules/projects/views/ProjectsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: ProjectsLayouts,
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: ProjectsView,
        },
      ],
    },
  ],
})

export default router
