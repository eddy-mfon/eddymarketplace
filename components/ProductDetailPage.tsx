
import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface ProductDetailPageProps {
    product: Product;
    onAddToCart: (p: Product) => void;
    onBack: () => void;
    onProductClick: (p: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onAddToCart, onBack, onProductClick }) => {
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
    const [mainImage, setMainImage] = useState(product.image);

    const relatedProducts = PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const [activeAccordion, setActiveAccordion] = useState<string | null>('desc');

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    return (
        <div className="pt-24 md:pt-32 pb-24 md:pb-32 px-4 md:px-6 bg-black text-white min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-8 md:mb-12 text-[8px] md:text-[10px] font-black tracking-widest uppercase opacity-40 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <button onClick={onBack} className="hover:opacity-100 transition-opacity">HOME</button>
                    <span>/</span>
                    <button onClick={onBack} className="hover:opacity-100 transition-opacity">{product.category}</button>
                    <span>/</span>
                    <span className="opacity-100">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-32">
                    {/* Gallery Container */}
                    <div className="flex flex-col gap-4 md:gap-6">
                        <div className="aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden glass border-white/5 relative shadow-2xl">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-cover grayscale brightness-90 hover:brightness-100 transition-all duration-700"
                            />
                        </div>
                        <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
                            {[product.image, ...product.thumbnails].map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMainImage(img)}
                                    className={`aspect-square w-20 md:w-auto bg-neutral-900 rounded-sm overflow-hidden glass border transition-all shrink-0 ${mainImage === img ? 'border-white opacity-100' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover grayscale" alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Specs */}
                    <div className="flex flex-col">
                        <div className="mb-8 md:mb-12">
                            <div className="text-[10px] md:text-[12px] font-black tracking-[0.4em] opacity-40 mb-2 uppercase">{product.brand}</div>
                            <h1 className="text-4xl md:text-7xl font-black font-heading tracking-tighter uppercase mb-4 leading-none">{product.name}</h1>
                            <div className="flex items-center gap-6">
                                <span className="text-2xl md:text-3xl font-black tracking-tighter">${product.price.toLocaleString()}</span>
                                {product.originalPrice && (
                                    <span className="text-lg md:text-xl font-bold opacity-30 line-through tracking-tighter">${product.originalPrice.toLocaleString()}</span>
                                )}
                            </div>
                        </div>

                        {/* Ratings Summary */}
                        <div className="flex items-center gap-4 mb-8 md:mb-12 py-4 md:py-6 border-y border-white/10 uppercase text-[9px] md:text-[10px] font-black tracking-widest">
                            <div className="flex text-white">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i} className={i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-20'}>★</span>
                                ))}
                            </div>
                            <span className="opacity-40">{product.rating.toFixed(1)}</span>
                            <span className="opacity-20">|</span>
                            <span className="opacity-40">{product.reviewsCount} REVIEWS</span>
                        </div>

                        {/* Size Picker */}
                        <div className="mb-8 md:mb-12">
                            <div className="text-[9px] md:text-[10px] font-black tracking-widest opacity-40 mb-4 md:mb-6 uppercase">Technical Specs [SIZE]</div>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 md:w-16 md:h-16 border flex items-center justify-center text-[10px] md:text-[11px] font-black transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16">
                            <button
                                onClick={() => onAddToCart(product)}
                                className="flex-1 bg-white text-black py-5 md:py-6 font-black tracking-[0.5em] uppercase hover:bg-neutral-200 transition-all active:scale-95 text-[10px] md:text-xs"
                            >
                                Initialize Deployment
                            </button>
                            <button className="h-14 md:h-20 sm:w-20 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
                                <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>

                        {/* Accordions */}
                        <div className="space-y-3 md:space-y-4">
                            <div className="border border-white/10 rounded-sm">
                                <button
                                    onClick={() => toggleAccordion('desc')}
                                    className="w-full text-left p-4 md:p-6 flex justify-between items-center group"
                                >
                                    <span className="text-[10px] md:text-[11px] font-black tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">Technical Analysis</span>
                                    <span className="text-lg md:text-xl opacity-20">{activeAccordion === 'desc' ? '-' : '+'}</span>
                                </button>
                                {activeAccordion === 'desc' && (
                                    <div className="px-4 md:px-6 pb-6 md:pb-8 text-[10px] md:text-[11px] font-bold leading-relaxed opacity-60 uppercase tracking-widest">
                                        {product.detailedDescription}
                                    </div>
                                )}
                            </div>

                            <div className="border border-white/10 rounded-sm">
                                <button
                                    onClick={() => toggleAccordion('ship')}
                                    className="w-full text-left p-4 md:p-6 flex justify-between items-center group"
                                >
                                    <span className="text-[10px] md:text-[11px] font-black tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">Logistics</span>
                                    <span className="text-lg md:text-xl opacity-20">{activeAccordion === 'ship' ? '-' : '+'}</span>
                                </button>
                                {activeAccordion === 'ship' && (
                                    <div className="px-4 md:px-6 pb-6 md:pb-8 text-[10px] md:text-[11px] font-bold leading-relaxed opacity-60 uppercase tracking-widest">
                                        {product.shippingInfo}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mb-24 md:mb-48">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-12 mb-16 px-6 py-10 md:py-12 glass border-white/5">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <div className="text-6xl md:text-[80px] font-black font-heading leading-none tracking-tighter">4.5</div>
                            <div className="text-[9px] md:text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">(50 Field Reports)</div>
                        </div>
                        <div className="flex-1 max-w-md w-full space-y-2 hidden sm:block">
                            {[5, 4, 3, 2, 1].map(r => (
                                <div key={r} className="flex items-center gap-4">
                                    <span className="text-[10px] font-black opacity-30 w-4">{r}</span>
                                    <div className="flex-1 h-1 bg-white/10 relative">
                                        <div className="absolute top-0 left-0 h-full bg-white transition-all duration-1000" style={{ width: `${r === 5 ? '80' : r === 4 ? '15' : '5'}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4 text-center md:text-left max-w-sm">
                            <div className="text-[9px] md:text-[10px] font-black tracking-widest opacity-40 uppercase">Top Field Report</div>
                            <div className="flex justify-center md:justify-start mb-2">
                                {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-xs md:text-sm">★</span>)}
                            </div>
                            <p className="text-[10px] md:text-[11px] font-bold opacity-60 leading-relaxed uppercase tracking-widest mb-4">
                                "The thermal regulation on this unit is unparalleled. Deployed in Sector 7 for 48 hours without any heat loss."
                            </p>
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-800 shrink-0" />
                                <span className="text-[8px] md:text-[9px] font-black tracking-widest opacity-40 uppercase">Verified / 13 OCT 2024</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                <section>
                    <div className="text-center mb-12 md:mb-16">
                        <div className="text-[10px] md:text-[12px] font-black tracking-[0.6em] opacity-20 mb-4 uppercase">[ COMPLEMENTARY GEAR ]</div>
                        <h2 className="text-3xl md:text-6xl font-black font-heading tracking-tighter uppercase">Recommended Units</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {relatedProducts.map(p => (
                            <div key={p.id} onClick={() => onProductClick(p)}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetailPage;
