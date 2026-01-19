<template>
  <section class="product-list-section">
    <div class="product-grid">
      <article
        v-for="product in products"
        :key="product.uuid"
        class="product-card"
        @click="handleClick(product.name)"
      >
        <div class="image-wrapper">
          <img :src="product.image" :alt="product.name" />

          <div
            v-if="product.promotion.labels.length > 0"
            class="promotion-badge"
            :style="{ backgroundColor: product.promotion.colorBackground }"
          >
            <span
              v-for="(label, idx) in product.promotion.labels"
              :key="idx"
              :style="{ color: label.colorFont }"
            >
              {{ label.text }}
            </span>
          </div>
        </div>

        <div class="title-wrapper">
          <p class="artist-name">{{ product.artistName }}</p>
          <div v-if="product.isAdBadgeVisible" class="ad-badge">
            <span></span>
          </div>
        </div>

        <p class="name">{{ product.name }}</p>
        <div class="price-wrapper">
          <span v-if="product.discountRate > 0" class="discount-rate">
            {{ product.discountRate }}%
          </span>
          <span class="price">{{ product.salePrice.toLocaleString() }}원</span>
        </div>

        <div v-if="product.badges.length > 0" class="badges">
          <span
            v-for="(badge, idx) in product.badges"
            :key="idx"
            class="badge"
            :style="{
              color: badge.colorFont,
              backgroundColor: badge.colorBackground,
            }"
          >
            <img v-if="badge.image" :src="badge.image" :alt="badge.label" />
            {{ badge.label }}
          </span>
        </div>

        <div class="review-wrapper">
          <span class="rating"> {{ product.review.rate }}</span>
          <span class="review-count">({{ product.review.count }})</span>
        </div>

        <p v-if="product.review.contents" class="review-contents">
          <span class="tag">후기</span> {{ product.review.contents }}
        </p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAlert } from "@/composables/useAlert";
import type { Product } from "@/types/product";

defineProps<{
  products: Product[];
}>();

const { openAlert } = useAlert();

const handleClick = (name: string) => {
  openAlert(`작품 상세 페이지 이동 - ${name}`);
};
</script>

<style scoped lang="scss">
.product-list-section {
  background: var(--color-background);
  padding: 24px 16px 24px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
}

.product-card {
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  .image-wrapper {
    position: relative;

    img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: var(--radius-md);
      background-color: var(--color-background-gray);
    }
  }

  .promotion-badge {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2px 6px 4px;
    font-size: 11px;
    font-weight: var(--font-weight-medium);
    border-radius: 2px;
  }

  .title-wrapper {
    position: relative;
  }

  .ad-badge {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0px 2px;
    background: url("@/assets/icon/ad.png") center no-repeat;
    width: 18px;
    height: 16px;
    background-size: 18px;
  }

  .artist-name {
    margin-top: 8px;
    font-size: 11px;
    color: var(--color-text-tertiary);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .name {
    margin-top: 2px;
    font-size: var(--font-size-base);
    line-height: 1.4;
    color: var(--color-primary-dark);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .badges {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
    margin-top: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px 6px;
    font-size: 11px;
    border-radius: 2px;
    font-weight: var(--font-weight-medium);

    img {
      width: 12px;
      height: 12px;
    }
  }

  .price-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-xs);
  }

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

  .review-wrapper {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-top: var(--spacing-xs);
  }

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
    font-size: 12px;
    color: var(--color-text-tertiary);
  }

  .review-contents {
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;

    .tag {
      background-color: #f2f2f2;
      padding: 3px 6px;
      border-radius: 100px;
      display: inline-block;
      font-size: 11px;
    }
  }
}
</style>