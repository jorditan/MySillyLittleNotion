<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-b-blue-500 py-2">
        <!-- Header -->
        <slot name="header" />
      </div>

      <div class="py-4">
        <!-- Body -->
        <slot name="body"></slot>
      </div>

      <div class="border-t border-5-blue-500 pt-2">
        <slot name="footer" />
      </div>
    </div>
  </dialog>

  <!-- Modal backdrop -->
  <div v-if="open" class="z-10 fixed top-0 left-0 bg-black opacity-40 w-screen h-screen"></div>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean
}

withDefaults(defineProps<Props>(), {
  open: false,
})
</script>
