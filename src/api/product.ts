import type { Product } from '@/types/product';
import type { ShortcutData } from '@/types/product';
import type { GiftData } from '@/types/product';
import type { ReviewData } from '@/types/product';


/* 상품 목록 가져오기*/
export const fetchProductList = async (page: number): Promise<Product[]> => {
  try {
    const response = await fetch(`/server/data/page${page}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch page ${page}`);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('fetchProductList error:', error);
    return [];
  }
};

/* 숏컷 목록 가져오기*/
export const fetchShortcutList = async (): Promise<ShortcutData> => {
  try {
    const response = await fetch('/server/data/unit-shortcut.json');
    if (!response.ok) {
      throw new Error('Failed to fetch shortcut');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchShortcutList error:', error);
    return { title: '', items: [] };
  }
};

/* 선물 상품 목록 가져오기*/
export const fetchGiftList = async (): Promise<GiftData> => {
  try {
    const response = await fetch('/server/data/unit-gift.json');
    if (!response.ok) {
      throw new Error('Failed to fetch gift');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchGiftList error:', error);
    return { 
      id: '', 
      icon: '', 
      targetId: '', 
      title: [], 
      themeTitle: '', 
      items: [] 
    };
  }
};

/* 리뷰 상품 목록 가져오기*/
export const fetchReviewList = async (): Promise<ReviewData> => {
  try {
    const response = await fetch('/server/data/unit-review.json');
    if (!response.ok) {
      throw new Error('Failed to fetch review');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('fetchReviewList error:', error);
    return { 
      title: [], 
      products: [] 
    };
  }
};