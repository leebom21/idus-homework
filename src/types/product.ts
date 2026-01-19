export interface Product {
  uuid: string;
  name: string;
  image: string;
  artistUuid: string;
  artistName: string;
  salePrice: number;
  discountRate: number;
  review: Review;
  badges: Badge[];
  promotion: Promotion;
  isAdBadgeVisible: boolean;
  artistId: number;
}

export interface Review {
  count: number;
  rate: number;
  rateLabel: string;
  contents?: string;
  starFull: boolean;
}

export interface Promotion {
  colorBackground: string;
  labels: PromotionLabel[];
}

export interface PromotionLabel {
  types: string[];
  text: string;
  colorFont: string;
  size: number;
}

export interface Badge {
  displayType: string;
  label: string;
  colorFont: string;
  colorBackground: string;
  image: string | null;
}

export interface ShortcutItem {
  id: number;
  imageUrl: string;
  label: string;
  webUrl: string;
}

export interface ShortcutData {
  title: string;
  items: ShortcutItem[];
}

export interface GiftTitlePart {
  text: string;
  types: string[];
  size: number;
  color: string;
  colorWeb: string;
  bgColor: string | null;
  bgColorWeb: string | null;
}

export interface GiftProduct {
  uuid: string;
  name: string;
  artistId: number;
  artistUuid: string;
  saleRate: number;
  priceSale: number;
  thumbImageUrl: string;
}

export interface GiftData {
  id: string;
  icon: string;
  targetId: string;
  title: GiftTitlePart[];
  themeTitle: string;
  items: GiftProduct[];
}

export interface ReviewProduct extends Product {
  review: Review;
}