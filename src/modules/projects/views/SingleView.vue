<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrums :name="project?.name ?? 'No name'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project?.task" :key="task.id" class="hover:bg-base-300">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox"
                  @change="projectStore.toggleTask(project!.id, task.id)"
                />
              </th>

              <td>{{ task.name }}</td>
              <td v-if="!task.completedAt"><RemoveIcon /></td>
              <td v-else>{{ task.completedAt }}</td>
            </tr>

            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full transition-all opacity-60 hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="newTask"
                  @keyup.enter="addTask"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import BreadCrums from '@/modules/common/components/BreadCrums.vue'
import { useProjectsStore } from '../stores/projects.store'
import type { Project } from '../interfaces/projects.interface'
import RemoveIcon from '@/modules/common/icons/RemoveIcon.vue'

interface Props {
  id: string
}

const router = useRouter()
const projectStore = useProjectsStore()
const props = defineProps<Props>()
const project = ref<Project | undefined>()
const newTask = ref('')

const addTask = () => {
  if (!project.value) return
  projectStore.addTaskToProject(project.value?.id, newTask.value)
  newTask.value = ''
}

watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id)
    if (!project.value) {
      router.replace('/')
    }
  },
  {
    // Para que al recargar el componente no se pierda el proyecto actual
    immediate: true,
  },
)
</script>
