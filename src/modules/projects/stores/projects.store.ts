import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project } from '../interfaces/projects.interface'

const initialLoad = (): Project[] => {
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
  const projects = ref<Project[]>(initialLoad())
  return { projects }
})
