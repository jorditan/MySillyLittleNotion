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
          v-for="(project, index) in projectStore.projectsWithCompletion"
          :key="project.id"
        >
          <th>{{ index + 1 }}</th>
          <td
            class="w-2/4"
            @mouseover="hoverStates[project.id] = true"
            @mouseleave="hoverStates[project.id] = false"
          >
            <template v-if="currentEditingId !== project.id">
              <div class="flex justify-between">
                {{ project.name }}
                <EditIcon
                  openTooltip
                  tooltipText="Editar proyecto"
                  v-if="hoverStates[project.id]"
                  @click="starEditing(project.id, project.name)"
                />
              </div>
            </template>
            <input
              v-else
              type="text"
              class="input input-primary w-full transition-all opacity-60 hover:opacity-100 focus:opacity-100"
              :placeholder="project.name"
              v-model="newName"
              @keyup.enter="saveEdit(project.id)"
              @blur="cancelEdit()"
            />
          </td>
          <td>{{ project.taskCount }}</td>
          <td class="flex gap-2 items-center">
            <progress
              class="progress progress-primary w-full"
              :value="project.completion"
              max="100"
            ></progress>
            <p class="text-left w-2/4 font-semibold">{{ project.completion }}%</p>
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
    @value="projectStore.addProyect"
    place-holder="Ingrese el nombre del proyecto"
  />

  <!-- <custom-modal :open="customModalOpen">
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
  </custom-modal> -->

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
// import CustomModal from '@/modules/common/components/CustomModal.vue'
import { reactive, ref } from 'vue'
import { useProjectsStore } from '../stores/projects.store'
import EditIcon from '@/modules/common/icons/EditIcon.vue'

const modalOpen = ref<boolean>(false)
const customModalOpen = ref<boolean>(false)

// Edición de proyectos por fila
const currentEditingId = ref<string | null>(null)
const newName = ref<string>('')

const hoverStates = reactive<Record<string, boolean>>({})

const starEditing = (projectId: string, name: string) => {
  currentEditingId.value = projectId // Activar edición solo en esta fila
  newName.value = name // Inicializar con el nombre actual
}

const cancelEdit = () => {
  currentEditingId.value = null
}

const saveEdit = (projectId: string) => {
  if (newName.value.trim() !== '') {
    projectStore.editProject(projectId, newName.value)
  }
  currentEditingId.value = null
}

// Si usásemos la desestructuración perderíamos lo ractivo
const projectStore = useProjectsStore()
</script>
