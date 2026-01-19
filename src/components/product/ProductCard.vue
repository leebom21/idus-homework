<template>
  <div class="product-card" @click="handleClick">
    <!-- 상품 이미지 영역 -->
    <div class="product-image-wrapper">
      <img :src="product.imageUrl" :alt="product.productName" class="product-image" />
      
      <!-- 프로모션 뱃지 (설 특가) -->
      <div v-if="product.promotion" class="promotion-badge">
        <span v-for="(label, index) in product.promotion.labels" :key="index" class="promotion-label">
          {{ label }}
        </span>
      </div>
      
      <!-- 광고 뱃지 -->
      <div v-if="product.isAd" class="ad-badge">
        <img :src="adIconPath" alt="광고" />
      </div>
      
      <!-- 찜하기 버튼 (나중에 추가) -->
      <!-- <FavoriteButton :product-id="product.id" /> -->
    </div>

    <!-- 상품 정보 영역 -->
    <div class="product-info">
      <!-- 작가명 -->
      <p class="artist-name">{{ product.artistName }}</p>
      
      <!-- 작품명 -->
      <h3 class="product-name">{{ product.productName }}</h3>
      
      <!-- 뱃지들 (쿠폰, 살수록 할인 등) -->
      <div v-if="product.badges && product.badges.length > 0" class="badges">
        <span
          v-for="(badge, index) in product.badges"
          :key="index"
          class="badge"
          :class="{ 'badge-with-image': badge.image }"
        >
          <img v-if="badge.image" :src="badge.image" :alt="badge.label" class="badge-image" />
          <span class="badge-label">{{ badge.label }}</span>
        </span>
      </div>
      
      <!-- 가격 정보 -->
      <div class="price-info">
        <span class="discount-rate">{{ product.discountRate }}%</span>
        <span class="price">{{ formatPrice(product.discountedPrice) }}</span>
      </div>
      
      <!-- 별점 및 후기 수 -->
      <div class="rating-info">
        <span class="rating">⭐ {{ product.rating }}</span>
        <span class="review-count">({{ product.reviewCount }})</span>
      </div>
      
      <!-- 후기 (있는 경우만) -->
      <p v-if="product.topReview" class="top-review">
        {{ product.topReview }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click', props.product.productName);
    };

    // 절대경로로 아이콘 경로 설정
    const adIconPath = '/server/assets/icon/ad.png';

    return {
      handleClick,
      formatPrice,
      adIconPath
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';

.product-card {
  cursor: pointer;
  
  &:active {
    opacity: 0.8;
  }
}

/* 이미지 영역 */
.product-image-wrapper {
  position: relative;
  @include aspect-ratio(1, 1);
  border-radius: var(--radius-md);
  overflow: hidden;
  background-color: var(--color-background-gray);
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 프로모션 뱃지 (설 특가) */
.promotion-badge {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #3a7dff;
  color: white;
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: 0 0 var(--radius-sm) 0;
}

/* 광고 뱃지 */
.ad-badge {
  position: absolute;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
  
  img {
    width: 28px;
    height: 28px;
  }
}

/* 상품 정보 */
.product-info {
  padding-top: var(--spacing-sm);
}

.artist-name {
  @include line-clamp(1);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: 2px;
}

.product-name {
  @include line-clamp(2);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  line-height: 1.4;
  margin-bottom: var(--spacing-xs);
  min-height: 38px; /* 2줄 높이 확보 */
}

/* 뱃지 */
.badges {
  display: flex;
  gap: 4px;
  margin-bottom: var(--spacing-xs);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 6px;
  font-size: var(--font-size-xs);
  border-radius: var(--radius-sm);
  background-color: var(--color-background-gray);
  color: var(--color-text-secondary);
}

.badge-image {
  width: 14px;
  height: 14px;
}

/* 가격 */
.price-info {
  @include flex-center-vertical;
  gap: 4px;
  margin-bottom: 4px;
}

.discount-rate {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: #ff4757;
}

.price {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

/* 별점 */
.rating-info {
  @include flex-center-vertical;
  gap: 2px;
  margin-bottom: 4px;
}

.rating {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.review-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* 후기 */
.top-review {
  @include line-clamp(1);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
}
</style>
