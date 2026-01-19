<template>
  <section class="gift-section">

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
    
    <p class="theme-title">{{ data.themeTitle }}</p>
    <div class="gift-grid">
      <article
        v-for="product in displayItems"
        :key="product.uuid"
        class="gift-item"
        @click="handleClick(product.name)"
      >
        <div class="gift-image">
          <img :src="product.thumbImageUrl" :alt="product.name" />
          <FavoriteButton :uuid="product.uuid" />
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
import FavoriteButton from '@/components/ui/FavoriteButton.vue'


const data = ref<GiftData>({
  id: '',
  icon: '',
  targetId: '',
  title: [],
  themeTitle: '',
  items: []
})

const { openAlert } = useAlert()

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
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content:flex-start;
    
    .section-icon {
      width: 24px;
      height: 24px;
    }
    
    .section-title {
      font-size: var(--font-size-base);
      line-height: 1.4;
      text-align: center;
    }
  }
  
  .theme-title {
    font-size: 18px;
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-dark);
    text-align: left;
    margin-bottom: var(--spacing-lg);
  }
  .gift-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md);
    
    .gift-item {
      cursor: pointer;
      
      &:active {
        opacity: 0.8;
      }

      .gift-image {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        border-radius: var(--radius-md);
        overflow: hidden;
        background-color: var(--color-background-gray);
        margin-bottom: var(--spacing-sm);
      
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

      }
      .gift-name {
        font-size: var(--font-size-sm);
        color: var(--color-primary-dark);
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
        gap: var(--spacing-xs);
      
        .discount-rate {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-red);
        }
        
        .price {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary-dark);
        }
      }
    }
  }
}
</style>