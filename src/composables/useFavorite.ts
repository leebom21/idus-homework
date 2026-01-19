import { ref, computed } from 'vue'

const STORAGE_KEY = 'idus-favorites'
const favoriteSet = ref<Set<string>>(new Set())

export const useFavorite = () => {
  // localStorage 불러오기
  const loadFavorites = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      favoriteSet.value = new Set(JSON.parse(saved))
    }
  }

  // 찜 토글
  const toggleFavorite = (uuid: string) => {
    if (favoriteSet.value.has(uuid)) {
      favoriteSet.value.delete(uuid)
    } else {
      favoriteSet.value.add(uuid)
    }
    // 바로 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteSet.value]))
  }

  // 찜 여부 확인
  const isFavorite = (uuid: string) => favoriteSet.value.has(uuid)

  // 찜 개수
  const favoriteCount = computed(() => favoriteSet.value.size)

  return {
    loadFavorites,
    toggleFavorite,
    isFavorite,
    favoriteCount
  }
}