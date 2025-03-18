<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover:bg-base-300"
          v-for="(project, index) in projectStore.projects"
          :key="project.id"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.task.length }}</td>
          <td>
            <progress class="progress progress-primary w-full" value="10" max="100"></progress>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <my-input-modal
    tittle="Nuevo proyecto"
    text="Está a punto de crear un nuevo proyecto. Para continuar, ingrese su nombre"
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    place-holder="Ingrese el nombre del proyecto"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h1 class="text-2xl">Título del modal</h1>
    </template>
    <template #body>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta ipsa, molestiae, neque vel,
        cumque odit tenetur corporis asperiores modi rerum exercitationem quasi expedita sint
        dignissimos magni eveniet beatae eum minima.
      </p>
    </template>
    <template #footer>
      <div class="flex justify-end gap-4 pt-2">
        <button @click="customModalOpen = false" class="btn">Cerrar</button>
        <button class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </custom-modal>

  <fab-button @click="modalOpen = true">
    <AddIcon />
  </fab-button>

  <fab-button @click="customModalOpen = true" position="bottom-left">
    <AddIcon />
  </fab-button>
</template>

<script lang="ts" setup>
import FabButton from '@/modules/common/components/FabButton.vue'
import MyInputModal from '@/modules/common/components/MyInputModal.vue'
import AddIcon from '@/modules/common/icons/AddIcon.vue'
import CustomModal from '@/modules/common/components/CustomModal.vue'
import { ref } from 'vue'
import { useProjectsStore } from '../stores/projects.store'

const modalOpen = ref(false)
const customModalOpen = ref(false)

// Si usásemos la desestructuración perderíamos lo ractivo
const projectStore = useProjectsStore()

c

const onNewValue = (projectName: String) => {
  console.log({ projectName })
}
</script>
