<template>
  <button @click="$emit('click')" :class="['btn btn-circle bg-gray-400 p-1 fixed', props.position]">
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
})

defineEmits(['click'])
</script>

<style scoped>
.top-left {
  @apply top-[40px] left-[40px];
}

.top-right {
  @apply top-[40px] right-[40px];
}

.bottom-left {
  @apply bottom-[40px] left-[40px];
}

.bottom-right {
  @apply bottom-[40px] right-[40px];
}
</style>
