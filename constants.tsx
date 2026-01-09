
import { Product, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'CATALOG', href: '#', view: 'CATALOG' },
  { label: 'PUFFERS', href: '#', view: 'PUFFERS' },
  { label: 'BOOTS', href: '#', view: 'BOOTS' },
  { label: 'ABOUT US', href: '#', view: 'ABOUT' },
];

const generateProducts = (count: number, category: Product['category'], prefix: string): Product[] => {
  const imagePools = {
    PUFFER: [
      '1591047139829-d91aecb6caea',
      '1544923246-77307dd654ca',
      '1551488831-00ddcb6c6bd3',
      '1611312449412-6cefac56398e',
      '1539533018447-63fcce2678e3',
      '1548883354-7622d03aca27',
      '1605518216938-7c31b7b14ad0',
      '1483985988355-763728e1935b',
      '1516762689617-e1cffcef479d',
      '1520006403993-4fc239b6e40a'
    ],
    BOOTS: [
      '1605106702734-205df224ecce',
      '1520639889313-7272a747d606',
      '1542272230-7f362b22c88d',
      '1549298916-b41d501d3772',
      '1595950653106-6c9ebd614d3a',
      '1533681018184-68bd1d883997',
      '1560769629-975ec94e6a86',
      '1511556820780-d912e42b4980',
      '1541099649105-f69ad21f3246',
      '1514332304773-e58a67593b0a'
    ],
    APPAREL: [
      '1552374196-1ab2a1c593e8',
      '1479064566235-aa6742f5a832',
      '1521572163474-6864f9cf17ab',
      '1503342217505-b0a15ec3261c',
      '1617137968427-85907072a8c0',
      '1506152983158-b4a74a01c721',
      '1523381235212-17c24f4d93f7',
      '1550639525-c97d455acf70',
      '1515886657613-9f3515b0c78f',
      '1503341452395-eee230f0322e'
    ]
  };

  const brands = ['NIKE', 'ADIDAS', 'ZARA', 'DICKIES', 'UNIQLO', 'TEMPLAR'];

  return Array.from({ length: count }).map((_, i) => {
    const id = `${category.toLowerCase()}-${i}`;
    const discountChance = Math.random();
    let discountType: Product['discountType'] = 'NONE';
    let price = 400 + Math.floor(Math.random() * 1600);
    let originalPrice: number | undefined = undefined;

    if (discountChance < 0.1) {
      discountType = 'HOLIDAY';
      originalPrice = price;
      price = Math.floor(price * 0.5);
    } else if (discountChance < 0.3) {
      discountType = 'SALE';
      originalPrice = price;
      price = Math.floor(price * 0.7);
    } else if (discountChance < 0.5) {
      discountType = 'NORMAL_DISCOUNT';
      originalPrice = price;
      price = Math.floor(price * 0.85);
    }

    const pool = imagePools[category];
    const imageId = pool[i % pool.length];
    const image = `https://images.unsplash.com/photo-${imageId}?q=80&w=800&auto=format&fit=crop`;

    return {
      id,
      name: `${prefix} ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) || ''}`,
      type: `${category} SERIES`,
      brand: brands[i % brands.length],
      price,
      originalPrice,
      image,
      thumbnails: [
        `https://images.unsplash.com/photo-${pool[(i + 1) % pool.length]}?q=80&w=200&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-${pool[(i + 2) % pool.length]}?q=80&w=200&auto=format&fit=crop`,
        `https://images.unsplash.com/photo-${pool[(i + 3) % pool.length]}?q=80&w=200&auto=format&fit=crop`,
      ],
      colors: ['ONYX', 'SILVER', 'CHALK'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'Advanced technical fabrication for extreme environments. Features modular attachment points and heat-mapped ventilation.',
      detailedDescription: 'Engineered for the modern urban warrior, this unit combines high-performance synthetic insulation with a weather-resistant shell. The articulation at the joints ensures full range of motion, while the integrated storage systems allow for seamless tactical deployment.',
      shippingInfo: 'Global technical courier delivery. Standard deployment time: 3-5 business days. Remote sector access may require additional logistics clearance.',
      rating: 4 + (Math.random() * 1),
      reviewsCount: 10 + Math.floor(Math.random() * 90),
      category,
      discountType
    };
  });
};

export const PUFFERS = generateProducts(15, 'PUFFER', 'TEMPLAR PUFFER');
export const BOOTS = generateProducts(10, 'BOOTS', 'STORM BOOT');
export const APPAREL = generateProducts(15, 'APPAREL', 'ELITE GEAR');

export const PRODUCTS: Product[] = [...PUFFERS, ...BOOTS, ...APPAREL];

export const INVENTORY_IMAGES = [
  'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611312449412-6cefac56398e?q=80&w=400&auto=format&fit=crop'
];

export const FOOTER_LINKS = ['INSTAGRAM', 'TWITTER', 'FACEBOOK', 'TIKTOK'];
