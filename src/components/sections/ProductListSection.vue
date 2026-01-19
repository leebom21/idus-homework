<template>
  <section class="product-list-section">
    <ProductLayout :columns="2" :gap="12">
      <ProductCard
        v-for="product in products"
        :key="product.uuid"
        :product="product"
        @click="handleClick(product.name)"
      />
    </ProductLayout>
  </section>
</template>

<script setup lang="ts">
import { useAlert } from "@/composables/useAlert"
import ProductLayout from "@/components/product/ProductLayout.vue"
import ProductCard from "@/components/product/ProductCard.vue"
import type { Product } from "@/types/product"

defineProps<{
  products: Product[]
}>()

const { openAlert } = useAlert()

const handleClick = (name: string) => {
  openAlert(`작품 상세 페이지 이동 - ${name}`)
}
</script>

<style scoped lang="scss">
.product-list-section {
  background: var(--color-background);
  padding: 24px 16px 24px;
}
</style>
