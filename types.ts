
export type DiscountType = 'HOLIDAY' | 'SALE' | 'NORMAL_DISCOUNT' | 'NONE';

export interface Product {
  id: string;
  name: string;
  type: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  thumbnails: string[];
  colors: string[];
  sizes: string[];
  description: string;
  detailedDescription: string;
  shippingInfo: string;
  rating: number;
  reviewsCount: number;
  category: 'PUFFER' | 'BOOTS' | 'APPAREL';
  discountType: DiscountType;
}

export interface NavLink {
  label: string;
  href: string;
  view: 'HOME' | 'CATALOG' | 'PUFFERS' | 'BOOTS' | 'ABOUT' | 'PRODUCT_DETAIL';
}

export interface CartItem extends Product {
  quantity: number;
}
