// Product Card Component for Habimint
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from './Button';
import { Badge } from './Badge';
import { useCart } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      await addItem(product, 1);
      // TODO: Show success toast notification
    } catch (error) {
      // TODO: Show error toast notification
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className={cn(
        'group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300',
        className
      )}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/products/${product.slug}`}>
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-habimint-bg">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant={product.badge.toLowerCase() as 'new' | 'bestseller' | 'sale'}>
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="sale">{discount}% OFF</Badge>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <span className="bg-white text-habimint-text px-4 py-2 rounded-full font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Name */}
          <h3 className="font-heading text-xl font-semibold text-habimint-text mb-2 group-hover:text-habimint-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-habimint-text-light text-sm mb-4 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-habimint-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-habimint-text-light line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              isLoading={isAdding}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="px-4"
              onClick={(e) => e.preventDefault()}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};