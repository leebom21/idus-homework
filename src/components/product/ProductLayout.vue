<template>
  <div class="product-layout" :style="gridStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    columns?: number
    gap?: number
  }>(),
  {
    columns: 2,
    gap: 12
  }
)

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
  gap: `${props.gap}px`
}))
</script>

<style scoped lang="scss">
.product-layout {
  width: 100%;
}
</style>