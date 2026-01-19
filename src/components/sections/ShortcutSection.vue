<template>
  <section class="shortcut-section">
    <h2 class="section-title">{{ data.title }}</h2>
    
    <div class="shortcut-scroll-wrapper">
      <div class="shortcut-list">
        <article
          v-for="(item, index) in data.items"
          :key="`shortcut-${item.id}-${index}`"
          class="shortcut-item"
          @click="handleClick(item.label)"
        >
          <div class="shortcut-image">
            <img :src="item.imageUrl" :alt="item.label" />
          </div>
          <p class="shortcut-label">{{ item.label }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchShortcutList } from '@/api/product'
import { useAlert } from '@/composables/useAlert'
import type { ShortcutData } from '@/types/product'

const data = ref<ShortcutData>({
  title: '',
  items: []
})

const { openAlert } = useAlert()

const loadData = async () => {
  const result = await fetchShortcutList()
  data.value = result
}

const handleClick = (label: string) => {
  openAlert('숏컷 상세 페이지 이동')
}

onMounted(loadData)
</script>

<style scoped lang="scss">
.shortcut-section {
  padding: 24px 0;
  background-color: var(--color-background);
  margin: 6px 0;

  .section-title {
    font-size: 18px;
    font-weight: var(--font-weight-bold);
    text-align: center;
    margin-bottom: var(--spacing-xl);
    color: var(--color-primary-dark);
  }

  .shortcut-scroll-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    .shortcut-list {
      display: flex;
      gap: var(--spacing-lg);
      padding: 0 16px;
      min-width: min-content;

      .shortcut-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-sm);
        flex-shrink: 0;
        cursor: pointer;
        transition: transform 0.2s;

        &:active {
          transform: scale(0.95);
        }

        .shortcut-image {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--color-background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .shortcut-label {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          text-align: center;
          white-space: nowrap;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>