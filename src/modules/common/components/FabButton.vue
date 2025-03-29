<template>
  <div
    :class="{ tooltip: openTooltip, fixed: true, [props.position]: true }"
    :data-tip="openTooltip ? props.tooltipText : null"
  >
    <button @click="$emit('click')" :class="['btn btn-circle bg-slate-700 p-1']">
      <slot />
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  openTooltip?: boolean
  tooltipText?: string
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
