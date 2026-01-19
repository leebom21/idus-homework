<template>
  <section class="review-section">
    <h2 class="section-title">
      <span
        v-for="(part, index) in data.title"
        :key="index"
        :style="{
          color: part.colorWeb,
          fontSize: `${part.size}px`,
          fontWeight: part.types.includes('BOLD') ? '700' : '400'
        }"
      >
        {{ part.text }}
      </span>
    </h2>

    <!-- 슬라이드 -->
    <div class="review-slider-container">
      <div 
        class="review-slider"
        ref="sliderRef"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <article
          v-for="product in data.products"
          :key="product.uuid"
          class="review-item"
          ref="itemRefs"
          @click="handleItemClick(product.productName)"
        >
        
        <div class="review-content">

            <div class="detail">
                <div class="review-image">
                    <img :src="product.image" :alt="product.productName" />
                </div>
                <div class="review-detail">
                    <p class="artist-name">{{ product.artistName }}</p>
                    <h3 class="product-name">{{ product.productName }}</h3>

                    <div class="price-wrapper">
                    <span v-if="product.saleRate > 0" class="discount-rate">
                        {{ product.saleRate }}%
                    </span>
                    <span class="price">{{ product.price.toLocaleString() }}원</span>
                    </div>
                </div>
            
            </div>

            <div class="review-box">
                <div class="review-text">
                <span
                    v-for="(info, infoIdx) in product.reviewInfo"
                    :key="infoIdx"
                    :style="{
                    color: info.colorWeb,
                    fontSize: `${info.size}px`,
                    fontWeight: info.types.includes('BOLD') ? '700' : '400'
                    }"
                >
                    {{ info.text }}
                </span>
                </div>

                <div class="rating-wrapper">
                <span class="rating"> {{ product.reviewRate }}</span>
                <span class="review-count">({{ product.reviewCount }})</span>
                </div>
            </div>

          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { fetchReviewList } from '@/api/product'
import { useAlert } from '@/composables/useAlert'
import type { ReviewData } from '@/types/product'

const data = ref<ReviewData>({
  title: [],
  products: []
})

const sliderRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])
const currentIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)
const itemWidth = ref(0)
const isClick = ref(true)

const { openAlert } = useAlert()

const updateSliderPosition = () => {
  if (!sliderRef.value || !itemWidth.value) return
  
  const gap = 16
  const moveDistance = (itemWidth.value + gap) * currentIndex.value
  sliderRef.value.style.transform = `translateX(-${moveDistance}px)`
}

const loadData = async () => {
  const result = await fetchReviewList()
  data.value = result
  
  await nextTick()
  
  if (itemRefs.value[0]) {
    itemWidth.value = itemRefs.value[0].offsetWidth
  }
}

const handleItemClick = (name: string) => {
  if (!isClick.value) {
    return
  }
  openAlert(`작품 상세 페이지 이동 - ${name}`)
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0].clientX
  isClick.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0].clientX
  
  // 5px 이상 움직이면 스와이프로 판단
  const diff = Math.abs(touchStartX.value - touchEndX.value)
  if (diff > 5) {
    isClick.value = false
  }
}

const handleTouchEnd = () => {
  const diff = touchStartX.value - touchEndX.value
  const threshold = 50

  if (!isClick.value && Math.abs(diff) > threshold) {
    if (diff > 0 && currentIndex.value < data.value.products.length - 1) {

        currentIndex.value++
      updateSliderPosition()
    } else if (diff < 0 && currentIndex.value > 0) {

        currentIndex.value--
      updateSliderPosition()
    }
  }

  touchStartX.value = 0
  touchEndX.value = 0
}

onMounted(loadData)

</script>


<style scoped lang="scss">
.review-section {
  padding: 24px 0;
  background-color: #f5f9ff;

  .section-title {
    font-size: 18px;
    font-weight: var(--font-weight-bold);
    margin-bottom: 20px;
    text-align: left;
    line-height: 1.4;
    padding: 0 23px;
  }

  .review-slider-container {
    position: relative;
    padding-left: var(--spacing-lg);
    overflow: hidden;
  }

  .review-slider {
    display: flex;
    gap: var(--spacing-lg);
    transition: transform 0.3s ease-out;
    touch-action: pan-y;
  }

  .review-item {
    flex: 0 0 calc(100% - 76px);
    cursor: pointer;
    background-color: #fff;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s;

    .review-content {
      padding: var(--spacing-lg);
      pointer-events: none;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 14px;

      & > div {
        flex: 1;
      }

      .detail {
        display: flex;
        gap: var(--spacing-md);
        align-items: center;

        & > div {
          flex: 1;
        }
      }

      .review-image {
        position: relative;
        aspect-ratio: 1;
        background-color: var(--color-background-gray);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
      }

      .review-detail {
        .artist-name {
          font-size: var(--font-size-sm);
          color: var(--color-text-tertiary);
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-regular);
          color: var(--color-primary-dark);
          line-height: 1.4;
          margin-bottom: var(--spacing-sm);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 40px;
        }

        .price-wrapper {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          margin-bottom: 6px;

          .discount-rate {
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-bold);
            color: var(--color-text-red);
          }

          .price {
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-bold);
            color: var(--color-primary-dark);
          }
        }
      }

      .review-box {
        background: #f0f0f0;
        border-radius: var(--radius-sm);
        padding: 14px;
        max-height: 114px;

        .review-text {
          font-size: var(--font-size-base);
          color: var(--color-text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-all;
        }

        .rating-wrapper {
          display: flex;
          align-items: center;
          gap: 2px;
          margin-bottom: 10px;

          .rating {
            font-size: var(--font-size-sm);
            color: var(--color-primary-dark);
            font-weight: var(--font-weight-semibold);
            position: relative;
            padding-left: 18px;

            &::before {
              content: "";
              clear: both;
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 15px;
              height: 15px;
              background: url("@/assets/icon/review-star.svg") center no-repeat;
              background-size: 15px;
            }
          }

          .review-count {
            font-size: 13px;
            color: var(--color-text-tertiary);
          }
        }
      }
    }
  }
}
</style>