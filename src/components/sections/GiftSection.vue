<template>
  <section class="gift-section">
    <!-- 타이틀 -->
    <div class="section-header">
      <img v-if="data.icon" :src="data.icon" alt="icon" class="section-icon" />
      <h2 class="section-title">
        <span
          v-for="(part, index) in data.title"
          :key="index"
          :style="{
            color: part.color,
            fontSize: `${part.size}px`,
            fontWeight: part.types.includes('BOLD') ? '700' : '400'
          }"
        >
          {{ part.text }}
        </span>
      </h2>
    </div>

    <!-- 테마 타이틀 -->
    <p class="theme-title">{{ data.themeTitle }}</p>

    <!-- 상품 그리드 (3열 x 2행) -->
    <div class="gift-grid">
      <article
        v-for="product in displayItems"
        :key="product.uuid"
        class="gift-item"
        @click="handleClick(product.name)"
      >
        <div class="gift-image">
          <img :src="product.thumbImageUrl" :alt="product.name" />
        </div>
        <p class="gift-name">{{ product.name }}</p>
        <div class="gift-price">
          <span class="discount-rate">{{ product.saleRate }}%</span>
          <span class="price">{{ product.priceSale.toLocaleString() }}원</span>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { fetchGiftList } from '@/api/product'
import { useAlert } from '@/composables/useAlert'
import type { GiftData } from '@/types/product'

const data = ref<GiftData>({
  id: '',
  icon: '',
  targetId: '',
  title: [],
  themeTitle: '',
  items: []
})

const { openAlert } = useAlert()

// 3열 x 2행 = 6개만 표시
const displayItems = computed(() => {
  return data.value.items.slice(0, 6)
})

const loadData = async () => {
  const result = await fetchGiftList()
  data.value = result
}

const handleClick = (name: string) => {
  openAlert(`작품 상세 페이지 이동 - ${name}`)
}

onMounted(loadData)
</script>

<style scoped lang="scss">
.gift-section {
  padding: 24px 16px;
  background-color: #f0fcf4;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.section-icon {
  width: 24px;
  height: 24px;
}

.section-title {
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
}

.theme-title {
  font-size: 18px;
  font-weight: 700;
  color: #212121;
  text-align: center;
  margin-bottom: 16px;
}

.gift-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.gift-item {
  cursor: pointer;
  
  &:active {
    opacity: 0.8;
  }
}

.gift-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.gift-name {
  font-size: 12px;
  color: #212121;
  line-height: 1.4;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 32px;
}

.gift-price {
  display: flex;
  align-items: center;
  gap: 4px;
}

.discount-rate {
  font-size: 14px;
  font-weight: 700;
  color: #ff4757;
}

.price {
  font-size: 14px;
  font-weight: 700;
  color: #212121;
}
</style>
