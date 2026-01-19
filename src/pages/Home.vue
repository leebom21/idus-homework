<template>
  <div class="home">
    <h1 class="title">아이디어스 홈</h1>
    
    <ProductLayout 
      v-if="products.length > 0" 
      :products="products"
      @product-click="handleProductClick"
    />
    
    <div v-else class="loading">
      로딩 중...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import type { Product } from '@/types/product';
import { fetchProductList } from '@/api/product';
import ProductLayout from '@/components/product/ProductLayout.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductLayout
  },
  setup() {
    const products = ref<Product[]>([]);

    const loadProducts = async () => {
      const data = await fetchProductList(1); // page1.json 먼저 테스트
      products.value = data;
    };

    const handleProductClick = (productName: string) => {
      alert(`작품 상세 페이지 이동 - ${productName}`);
    };

    onMounted(() => {
      loadProducts();
    });

    return {
      products,
      handleProductClick
    };
  }
});
</script>

<style lang="scss" scoped>
.home {
  max-width: 768px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: var(--color-background);
}

.title {
  padding: var(--spacing-xl);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  text-align: center;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: var(--color-text-secondary);
}
</style>
