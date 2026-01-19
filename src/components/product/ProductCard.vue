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
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  .name {
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price {
    margin-top: 4px;
    font-size: 16px;
    font-weight: 700;
  }
}
</style>