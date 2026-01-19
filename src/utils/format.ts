/**
 * 가격 포맷팅
 * @param price 가격
 * @returns 21,500원
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()}원`;
};

/**
 * 텍스트 줄바꿈 처리
 * @param text 텍스트
 * @param maxLength 최대 길이
 * @returns 잘린 텍스트
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * 별점 표시
 * @param rating 별점
 * @returns ⭐ 4.8
 */
export const formatRating = (rating: number): string => {
  return `⭐ ${rating.toFixed(1)}`;
};