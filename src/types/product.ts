export interface Product {
  id: number;
  artistName: string;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  topReview?: string;
  isAd: boolean;
  promotion?: Promotion;
  badges?: Badge[];
}

export interface Promotion {
  labels: string[];
}

export interface Badge {
  label: string;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ShortcutItem {
  id: number;
  imageUrl: string;
  title: string;
}

export interface GiftProduct {
  id: number;
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  imageUrl: string;
}

export interface ReviewProduct extends Product {
  topReview: string;
}