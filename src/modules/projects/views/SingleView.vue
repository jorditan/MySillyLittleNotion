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
            <tr class="hover:bg-base-300">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
            </tr>

            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full transition-all opacity-60 hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
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

interface Props {
  id: string
}

const router = useRouter()
const projectStore = useProjectsStore()
const props = defineProps<Props>()
const project = ref<Project | undefined>()

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
