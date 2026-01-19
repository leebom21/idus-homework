<template>
  <button 
    class="favorite-button"
    @click.stop="handleToggle"
    :aria-label="isFavorite(uuid) ? '찜 해제' : '찜하기'"
  >
    <img 
      :src="isFavorite(uuid) ? favoriteOnIcon : favoriteOffIcon"
      alt="찜하기"
    />
  </button>
</template>

<script setup lang="ts">
import { useFavorite } from '@/composables/useFavorite'
import favoriteOnIcon from '@/assets/icon/favorite-on.png'
import favoriteOffIcon from '@/assets/icon/favorite-off.png'

const props = defineProps<{
  uuid: string
}>()

const { toggleFavorite, isFavorite } = useFavorite()

const handleToggle = () => {
  toggleFavorite(props.uuid)
}
</script>

<style scoped lang="scss">
.favorite-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.9);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>