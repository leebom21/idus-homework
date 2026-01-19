<template>
  <main class="home">
    <div class="title"><img src="https://image.idus.com/image/files/18a059f4ff11434db9a6aec6092818cd.png" alt="" ></div>

    <template v-for="(section, index) in displaySections" :key="`section-${index}`">
      <ProductListSection
        v-if="section.type === 'product'"
        :products="section.products || []"
      />

      <component
        v-else
        :is="sectionMap[section.type]"
      />
    </template>

    <!-- 무한 스크롤 감지 -->
    <div ref="sentinel" class="sentinel"></div>

    <AlertModal />
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, markRaw } from 'vue'
import { fetchProductList } from '@/api/product'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { useFavorite } from '@/composables/useFavorite'
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

interface DisplaySection {
  type: SectionType
  products?: Product[]
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
const hasMore = ref(true)
const sentinel = ref<HTMLElement | null>(null)

const sectionMap: Record<SectionType, any> = {
  product: markRaw(ProductListSection),
  shortcut: markRaw(ShortcutSection),
  gift: markRaw(GiftSection),
  review: markRaw(ReviewSection)
}

const { loadFavorites } = useFavorite()

// 레이아웃에 맞춰 섹션과 상품을 배치
const displaySections = computed<DisplaySection[]>(() => {
  const sections: DisplaySection[] = []
  let productIndex = 0
  const itemsPerRow = 2

  for (const layout of layoutSections) {
    if (layout.type === 'product') {
      const itemCount = layout.rowLimit ? layout.rowLimit * itemsPerRow : Infinity
      const products = allProducts.value.slice(productIndex, 
        layout.rowLimit ? productIndex + itemCount : undefined
      )
      
      if (products.length > 0) {
        sections.push({ type: 'product', products })
        productIndex += products.length
      }
    } else {
      sections.push({ type: layout.type })
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
  if (!hasMore.value) return

  currentPage.value += 1

  const data = await fetchProductList(currentPage.value)
  
  if (data.length === 0) {
    hasMore.value = false
    return
  }

  allProducts.value = [...allProducts.value, ...data]
}

onMounted(() => {
  loadInitialProducts()
  loadFavorites()
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
  border-top: 4px solid var(--color-primary);
  border-bottom: 4px solid var(--color-primary);

  .title {
    text-align: center;
    padding: 19px 0 0;
    margin: 0 auto;
    background: var(--color-background);
    width: 100%;

    img {
      width: 100px;
      max-width: 158px;
      display: inline-flex;
    }
  }

  .sentinel {
    height: 1px;
  }
}
</style>