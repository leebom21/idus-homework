import { ref, computed } from 'vue'

const STORAGE_KEY = 'idus-favorites'

// 전역 상태로 관리
const favoriteSet = ref<Set<string>>(new Set())

export const useFavorite = () => {
  // localStorage에서 불러오기
  const loadFavorites = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as string[]
        favoriteSet.value = new Set(parsed)
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    }
  }

  // localStorage에 저장
  const saveFavorites = () => {
    try {
      const array = Array.from(favoriteSet.value)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(array))
    } catch (error) {
      console.error('Failed to save favorites:', error)
    }
  }

  // 찜 토글
  const toggleFavorite = (uuid: string) => {
    if (favoriteSet.value.has(uuid)) {
      favoriteSet.value.delete(uuid)
    } else {
      favoriteSet.value.add(uuid)
    }
    saveFavorites()
  }

  // 찜 여부 확인
  const isFavorite = (uuid: string) => {
    return favoriteSet.value.has(uuid)
  }

  // 찜 개수
  const favoriteCount = computed(() => favoriteSet.value.size)

  return {
    loadFavorites,
    toggleFavorite,
    isFavorite,
    favoriteCount
  }
}