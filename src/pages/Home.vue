<template>
  <main class="home">
    <div class="title"><img src="https://image.idus.com/image/files/18a059f4ff11434db9a6aec6092818cd.png" alt="" ></div>

    <template v-for="(section, index) in displaySections" :key="`section-${index}`">
      <!-- 상품 그리드 (2줄씩) -->
      <ProductListSection
        v-if="section.type === 'product'"
        :products="section.products"
      />

      <!-- 기타 섹션 -->
      <component
        v-else
        :is="sectionMap[section.type]"
      />
    </template>

    <!-- 무한 스크롤 감지 -->
    <div ref="sentinel" class="sentinel"></div>

    <!-- 로딩 표시 -->
    <div v-if="isLoadingMore" class="loading-more">
      <div class="spinner"></div>
      <p>상품을 더 불러오는 중...</p>
    </div>

    <AlertModal />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, markRaw } from 'vue'
import { fetchProductList } from '@/api/product'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import ProductListSection from '@/components/sections/ProductListSection.vue'
import ShortcutSection from '@/components/sections/ShortcutSection.vue'
import GiftSection from '@/components/sections/GiftSection.vue'
import ReviewSection from '@/components/sections/ReviewSection.vue'
import AlertModal from '@/components/ui/AlertModal.vue'
import type { Product } from '@/types/product'

type SectionType = 'product' | 'shortcut' | 'gift' | 'review'

interface LayoutSection {
  type: SectionType
  rowLimit?: number
}

// 레이아웃 정의
const layoutSections: LayoutSection[] = [
  { type: 'product', rowLimit: 2 },
  { type: 'shortcut' },
  { type: 'product', rowLimit: 2 },
  { type: 'gift' },
  { type: 'product', rowLimit: 2 },
  { type: 'review' },
  { type: 'product' }  // 나머지 전부 (무한 스크롤)
]

const allProducts = ref<Product[]>([])
const currentPage = ref(1)
const maxPage = 3
const isLoadingMore = ref(false)
const hasMore = ref(true)
const sentinel = ref<HTMLElement | null>(null)

const sectionMap: Record<SectionType, any> = {
  product: markRaw(ProductListSection),
  shortcut: markRaw(ShortcutSection),
  gift: markRaw(GiftSection),
  review: markRaw(ReviewSection)
}

// 레이아웃에 맞춰 섹션과 상품을 배치
const displaySections = computed(() => {
  const sections: any[] = []
  let productIndex = 0
  const itemsPerRow = 2

  for (const layout of layoutSections) {
    if (layout.type === 'product') {
      if (layout.rowLimit) {
        const itemCount = layout.rowLimit * itemsPerRow
        const products = allProducts.value.slice(productIndex, productIndex + itemCount)
        
        if (products.length > 0) {
          sections.push({
            type: 'product',
            products
          })
          productIndex += products.length
        }
      } else {
        // 나머지 전부
        const products = allProducts.value.slice(productIndex)
        if (products.length > 0) {
          sections.push({
            type: 'product',
            products
          })
          productIndex = allProducts.value.length
        }
      }
    } else {
      sections.push({
        type: layout.type
      })
    }
  }

  return sections
})

// 초기 로딩 (첫 페이지만)
const loadInitialProducts = async () => {
  const data = await fetchProductList(1)
  allProducts.value = data
  currentPage.value = 1
}

// 무한 스크롤로 추가 로딩
const loadMoreProducts = async () => {
  if (!hasMore.value || isLoadingMore.value) return

  // 다음 페이지
  currentPage.value += 1

  if (currentPage.value > maxPage) {
    hasMore.value = false
    return
  }

  isLoadingMore.value = true

  try {
    console.log(`📄 페이지 ${currentPage.value} 로딩...`)
    const data = await fetchProductList(currentPage.value)
    
    if (data.length === 0) {
      hasMore.value = false
      return
    }

    // 기존 데이터에 추가
    allProducts.value = [...allProducts.value, ...data]
  } finally {
    isLoadingMore.value = false
  }
}

onMounted(() => {
  loadInitialProducts()
})

// 무한 스크롤 설정
useInfiniteScroll(sentinel, loadMoreProducts)
</script>

<style scoped lang="scss">
.home {
  max-width: 768px;
  margin: 0 auto;
  background-color: #f0f0f0;
  min-height: 100vh;
}

.title {
    text-align: center;
    padding: 19px 0;
    margin: 0 auto;
    background: #ffffff;
    width: 100%;
    border-bottom: 6px solid #e3e3e3ba;
    img {
        width: 100px;
        max-width: 158px;
        display: inline-flex;
    }
}

.sentinel {
  height: 1px;
  margin: 20px 0;
}

.loading-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 12px;
  
  p {
    color: #666;
    font-size: 14px;
  }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #f5f5f5;
  border-top-color: #ff6b35;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
