import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Project, Task } from '../interfaces/projects.interface'
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

  const editProject = (projectId: string, newName: string) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return
    if (!newName) return

    project.name = newName
  }

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return

    const project = projects.value.find((p) => p.id == projectId)
    if (!project) return

    project.task.push({
      id: uuidv4(),
      name: taskName,
    })
  }

  const toggleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return

    const task = project.task.find((t) => t.id === taskId)
    if (!task) return

    task.completedAt = task.completedAt ? undefined : new Date()
  }

  return {
    // Properties
    projects,

    // Getters - Así los vamos a usar, computados
    projectList: computed(() => [...projects.value]),
    emptyProjects: computed(() => projects.value.length === 0),
    projectsWithCompletion: computed(() => {
      return projects.value.map((project) => {
        const totalTask = project.task.length
        const completed = project.task.filter((task) => task.completedAt).length
        const completion = totalTask === 0 ? 0 : (completed / totalTask) * 100

        return {
          id: project.id,
          name: project.name,
          taskCount: totalTask,
          completion: Math.round(completion),
        }
      })
    }),

    // Actions
    addProyect,
    addTaskToProject,
    toggleTask,
    editProject,
  }
})
