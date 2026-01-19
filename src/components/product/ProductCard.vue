<template>
  <article class="product-card" @click="$emit('click')">
    <img :src="product.image" :alt="product.name" />
    <p class="name">{{ product.name }}</p>
    <p class="price">
      {{ product.discountedPrice.toLocaleString() }}원
    </p>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.product-card {
  cursor: pointer;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: var(--radius-md);
    background-color: var(--color-background-gray);
  }

  .name {
    margin-top: var(--spacing-sm);
    font-size: var(--font-size-base);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price {
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-lg);
     font-weight: var(--font-weight-bold);;
  }
}
</style>