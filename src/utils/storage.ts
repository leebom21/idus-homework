const FAVORITES_KEY = 'idus_favorites';

/**
 * 찜한 상품 목록 가져오기
 */
export const getFavorites = (): number[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * 찜한 상품 저장
 */
export const saveFavorites = (favorites: number[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites:', error);
  }
};

/**
 * 찜하기 토글
 */
export const toggleFavorite = (productId: number): boolean => {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(productId);
  }
  
  saveFavorites(favorites);
  return index === -1; // 추가되었으면 true
};