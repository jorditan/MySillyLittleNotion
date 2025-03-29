<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <RouterLink class="text-lg font-bold mx-4" :to="`/projects`">Proyectos</RouterLink>
    <p v-if="projectStore.emptyProjects" class="text-sm mx-4 text-gray-500">No hay proyectos</p>

    <!-- Menu -->

    <ul v-else class="menu bg-base-200 rounded-box w-56">
      <li v-for="project in projectStore.projectList" :key="project.id">
        <template v-if="project.task.length > 0">
          <details open>
            <summary>
              <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
            </summary>
            <ul>
              <li v-for="task in project.task" :key="task.id">
                <RouterLink :to="`/project/${project.id}`">{{ task.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>

        <template v-else>
          <RouterLink :to="`/project/${project.id}`">{{ project.name }}</RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '../stores/projects.store'

const projectStore = useProjectsStore()
</script>
