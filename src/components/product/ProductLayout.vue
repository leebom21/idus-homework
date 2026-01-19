<template>
  <div class="product-layout">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @click="handleProductClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Product } from '@/types/product';
import ProductCard from './ProductCard.vue';

export default defineComponent({
  name: 'ProductLayout',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array as PropType<Product[]>,
      required: true
    }
  },
  emits: ['product-click'],
  setup(props, { emit }) {
    const handleProductClick = (productName: string) => {
      emit('product-click', productName);
    };

    return {
      handleProductClick
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';

.product-layout {
  @include grid-layout(2, var(--grid-gap));
  padding: var(--spacing-lg);
}
</style>