import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { JournalsSectionProducts } from '@/public/data/product_store';
import AddRemoveButton from '../button/AddRemoveButton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { CartProduct_Int, ProductList_Int } from '@/interface/ProductInterface';

export default function JournalsSection() {

    const { homePageData, homePageLoading } = useSelector((state: RootState) => state.homePageSlice)
    const [products, setProducts] = useState(JournalsSectionProducts)

    const updateCartData = (apiProducts: ProductList_Int[]) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                const cartProduct = apiProducts.find(
                    (item) => item.id === product.product_id
                );

                if (!cartProduct) return product;

                return {
                    ...product,
                    cart_id: +cartProduct.Cart?.id || 0,
                    cart_qty: +cartProduct.Cart?.qty || 0,
                };
            })
        );
    };


    useEffect(() => {
        if (homePageData?.products?.length > 0) {
            updateCartData(homePageData?.products)
        }
    }, [homePageData])

    const onCartQtyUpdate = (data: CartProduct_Int[]) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                const cartProduct = data.find(
                    (item) => item.id === product.product_id
                );

                if (!cartProduct) return product;

                return {
                    ...product,
                    cart_id: +cartProduct?.cart_id || 0,
                    cart_qty: +cartProduct?.cart_qty || 0,
                };
            })
        );

    }


    return (
        <section className="bg-habimint-bg py-20">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-habimint-text mb-4">
                        Our Journals
                    </h2>
                    <p className="text-habimint-text-light text-lg">
                        Crafted for those who choose to grow intentionally
                    </p>
                    {/* Purple brushstroke accent */}
                    <svg width="200" height="8" viewBox="0 0 200 8" className="mx-auto mt-4">
                        <path
                            d="M10,5 C40,1 80,7 120,4 C140,2 175,6 190,4"
                            stroke="#C084C8"
                            strokeWidth="3.5"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>

                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {products.map((product) => (
                        <motion.div
                            key={product.product_id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: product.delay }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Product Image & Badges */}
                            <div className="relative aspect-[4/5] rounded-t-2xl overflow-hidden group">
                                <Image
                                    src={product.image}
                                    alt={`${product.title} Journal`}
                                    fill
                                    quality={90}
                                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                                />

                                {/* Left Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`${product.badgeLeft.className} text-xs px-3 py-1 rounded-full font-medium`}>
                                        {product.badgeLeft.text}
                                    </span>
                                </div>

                                {/* Right Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className={`${product.badgeRight.className} text-xs px-3 py-1 rounded-full font-medium`}>
                                        {product.badgeRight.text}
                                    </span>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-6">
                                <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">
                                    {product.title}
                                </h3>
                                <p className="text-habimint-text-light text-sm mb-3">
                                    {product.subtitle}
                                </p>
                                <p className="text-habimint-text-light text-sm mb-4 leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Pricing */}
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-habimint-primary text-2xl font-bold">
                                        {product.price}
                                    </span>
                                    <span className="text-gray-400 line-through text-base">
                                        {product.originalPrice}
                                    </span>
                                    <span className="bg-habimint-primary-light text-habimint-primary text-xs px-2 py-1 rounded">
                                        {product.savings}
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {/* <button className="flex-1 bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
                                        Add to Cart
                                    </button> */}
                                    <div className='flex-1'>
                                        <AddRemoveButton
                                            onCartQtyUpdate={onCartQtyUpdate}
                                            product_id={product.product_id}
                                            cart_id={product.cart_id}
                                            cart_qty={product.cart_qty}
                                        />
                                    </div>
                                    <Link href={product.link} className="flex-1">
                                        <button className="w-full border-2 border-habimint-primary text-habimint-primary py-3 rounded-full font-semibold hover:bg-habimint-primary hover:text-white transition">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}