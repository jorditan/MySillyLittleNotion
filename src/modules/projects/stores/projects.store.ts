import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Project } from '../interfaces/projects.interface'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '@vueuse/core'

const initialLoad = (): Project[] => {
  const projects = localStorage.getItem('projects') ?? []

  return [
    {
      id: '1',
      name: 'Project 1',
      task: [],
    },
    {
      id: '2',
      name: 'Project 2',
      task: [],
    },
  ]
}

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []))

  const addProyect = (name: string) => {
    if (name.length == 0) return

    projects.value.push({
      id: uuidv4(),
      name: name,
      task: [],
    })
  }

  return {
    // Properties
    projects,

    // Getters - Así los vamos a usar, computados
    projectList: computed(() => [...projects.value]),
    emptyProjects: computed(() => projects.value.length === 0),

    // Actions
    addProyect,
  }
})
