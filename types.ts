
export type DiscountType = 'HOLIDAY' | 'SALE' | 'NORMAL_DISCOUNT' | 'NONE';

export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  description: string;
  category: 'PUFFER' | 'BOOTS' | 'APPAREL';
  discountType: DiscountType;
}

export interface NavLink {
  label: string;
  href: string;
  view: 'HOME' | 'CATALOG' | 'PUFFERS' | 'BOOTS' | 'ABOUT';
}

export interface CartItem extends Product {
  quantity: number;
}
