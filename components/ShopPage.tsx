
import React, { useState } from 'react';
import { Product, DiscountType } from '../types';
import ProductCard from './ProductCard';

interface ShopPageProps {
  title: string;
  products: Product[];
  onProductClick: (p: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ title, products, onProductClick }) => {
  const [filter, setFilter] = useState<DiscountType | 'ALL'>('ALL');

  const filteredProducts = filter === 'ALL' 
    ? products 
    : products.filter(p => p.discountType === filter);

  const discountTiers: { label: string; value: DiscountType | 'ALL' }[] = [
    { label: 'ALL PRODUCTS', value: 'ALL' },
    { label: 'HOLIDAY SPECIALS', value: 'HOLIDAY' },
    { label: 'FLASH SALE', value: 'SALE' },
    { label: 'SEASONAL OFFERS', value: 'NORMAL_DISCOUNT' },
    { label: 'RESERVE PRICE', value: 'NONE' },
  ];

  return (
    <div className="pt-40 px-6 pb-32 min-h-screen bg-black">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="animate-fade-in">
            <div className="text-[10px] tracking-[0.5em] font-black opacity-30 mb-4 uppercase">[ CATEGORY ARCHIVE ]</div>
            <h1 className="text-7xl md:text-[120px] font-black font-heading leading-none tracking-tighter uppercase">
              {title}
            </h1>
          </div>
          
          <div className="flex flex-wrap gap-4 md:justify-end animate-fade-in delay-100">
            {discountTiers.map(tier => (
              <button
                key={tier.value}
                onClick={() => setFilter(tier.value)}
                className={`px-6 py-3 text-[9px] font-black tracking-widest uppercase transition-all border ${
                  filter === tier.value ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </header>

        {filteredProducts.length === 0 ? (
          <div className="h-64 flex items-center justify-center glass rounded-sm border-white/5">
            <p className="text-[10px] font-black tracking-[1em] opacity-30 uppercase">No Items found in this tier</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, i) => (
              <div 
                key={product.id} 
                onClick={() => onProductClick(product)}
                className="relative"
              >
                {product.discountType !== 'NONE' && (
                  <div className="absolute top-4 left-4 z-10 glass px-3 py-1 text-[8px] font-black tracking-widest uppercase shadow-xl border-white/20">
                    {product.discountType.replace('_', ' ')}
                  </div>
                )}
                <ProductCard product={product} />
                {product.originalPrice && (
                  <div className="text-[9px] font-bold line-through opacity-30 -mt-4 mb-4 ml-0">
                    ${product.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
