<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog id="my_modal_1" class="modal" :open="open">
    <div class="modal-box flex flex-col gap-2">
      <h3 class="text-lg font-bold">{{ props.tittle }}</h3>
      <p :v-if="props.text">{{ props.text }}</p>
      <div class="modal-action flex flex-col gap-2">
        <form method="dialog" @submit.prevent="submitValue" class="flex flex-col gap-4 h-[7rem]">
          <input
            ref="inputRef"
            type="text"
            :placeholder="'ELIMINAR'"
            class="input input-error input-border h-[4rem] w-full flex-1"
            v-model="inputValue"
          />

          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end gap-4">
            <button @click="$emit('close')" class="btn">Cerrar</button>
            <button class="btn btn-error" :disabled="!canDelete()">Eliminar</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <!-- Modal backdrop -->
  <div v-if="open" class="z-10 fixed top-0 left-0 bg-black opacity-40 w-screen h-screen"></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  open: boolean
  tittle: string
  text?: string
}

const props = defineProps<Props>()

const emits = defineEmits<{
  close: [void]
  delete: [void]
}>()

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus()
    return
  }

  emits('close')
  emits('delete')

  inputValue.value = ''
}

watch(props, ({ open }) => {
  if (open) {
    inputRef.value?.focus()
  }
})

const canDelete = () => {
  return inputValue.value === 'ELIMINAR'
}
</script>
