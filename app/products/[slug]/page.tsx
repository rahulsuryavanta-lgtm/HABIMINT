'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Minus, Plus, Share2, ShoppingCart, Truck, Lock, RotateCcw, Copy } from 'lucide-react';
import { notFound, useRouter } from 'next/navigation';
import { DetailPage_Products, DetailPage_Testimonials } from '@/public/data/product_store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { fetchAddToCart, fetchDeleteCartItem, fetchProductDetail, fetchUpdateCart, handleDetailLoader } from '@/stores/productCartSlice';
import { getUserInfo } from '@/utils/getToken';
import { CartProduct_Int } from '@/interface/ProductInterface';


export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const tempProduct = useMemo(
    () => DetailPage_Products[
      params.slug as keyof typeof DetailPage_Products
    ],
    [params.slug]
  );
  const [product, setProduct] = useState(tempProduct)
  const userInfo = getUserInfo();

  if (!product) {
    notFound();
  }


  const dispatch = useDispatch();
  const router = useRouter()

  const { productDetail, productDetailLoading, cartLoading } = useSelector(
    (state: RootState) => state.productCartSlice
  );

  useEffect(() => {
    if (userInfo?.id) {
      let paramSlug = {
        slug: tempProduct.slug,
        isPageApi: true,
      };
      dispatch(fetchProductDetail({ paramSlug })).then((res) => {
        if (res?.payload?.response?.status_code === 200) {
          let prdData = res?.payload?.response?.data
          setProduct((prev) => {
            const updated = {
              ...prev,
              cart_id: prdData.cart_id,
              cart_qty: prdData.cart_qty,
            };
            return updated;
          });
        }

      });
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'about' | 'inside' | 'specs' | 'reviews'>('about');
  const [addingToCart, setAddingToCart] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const savings = product.originalPrice - product.price;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  useEffect(() => {

  }, [])


  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Check out ${product.name} from Habimint!`;
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
  };

  const otherProduct = Object.values(DetailPage_Products).find((p) => p.slug !== product.slug);


  const handleCart = async (type: "ADD" | "REMOVE" | "NEW_ADD") => {

    let reloadPrd = DetailPage_Products[
      params.slug as keyof typeof DetailPage_Products
    ]

    if (!userInfo?.id) {
      router.push("/login");
    } else {
      if (type !== "REMOVE") {
        setAddingToCart(true);
      }

      setIsLoading(true)
      if (type == "NEW_ADD") {
        let params = {
          product_id: product?.id,
          qty: 1,
        };

        await dispatch(fetchAddToCart({ params })).then((res: any) => {
          if (res?.payload?.response?.status_code == 200) {
            let itemData: CartProduct_Int[] = res?.payload?.response?.data?.cart_products
            if (itemData?.length > 0) {
              const cartProduct = itemData.find(
                (item) => item.id === product.id
              );
              if (cartProduct?.id) {
                setProduct((prev) => {
                  const updated = {
                    ...prev,
                    cart_id: cartProduct?.cart_id,
                    cart_qty: cartProduct?.cart_qty,
                  };
                  return updated;
                })
              }
            }

          }
          setIsLoading(false)
        });


      } else if (+product?.cart_qty === 1 && type == "REMOVE") {
        let params = {
          product_id: product?.id,
          cart_id: product?.cart_id,
        };
        await dispatch(fetchDeleteCartItem({ params })).then((res: any) => {
          if (res?.payload?.response?.status_code == 200) {
            let itemData: CartProduct_Int[] = res?.payload?.response?.data?.cart_products
            const cartProduct = itemData.find(
              (item) => item.id === product.id
            );

            setProduct((prev) => {
              const updated = {
                ...prev,
                cart_id: 0,
                cart_qty: 0,
              };
              return updated;

            })

          }

          setIsLoading(false)

        });

      } else if (+product?.cart_qty > 0) {
        let params = {
          product_id: product?.id,
          cart_id: product?.cart_id,
          qty: type === "ADD" ? +product?.cart_qty + 1 : +product?.cart_qty - 1,
        };
        await dispatch(fetchUpdateCart({ params })).then((res: any) => {
          if (res?.payload?.response?.status_code == 200) {
            let itemData: CartProduct_Int[] = res?.payload?.response?.data?.cart_products
            if (itemData?.length > 0) {
              const cartProduct = itemData.find(
                (item) => item.id === product.id
              );
              if (cartProduct?.id) {
                setProduct((prev) => {
                  const updated = {
                    ...prev,
                    cart_id: cartProduct?.cart_id,
                    cart_qty: cartProduct?.cart_qty,
                  };
                  return updated;
                })
              }
            }
          }
          setIsLoading(false)
        });

      }

      if (type !== "REMOVE") {
        setAddingToCart(false);
      }
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{product.name} — {product.tagline} | Habimint</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} — ${product.tagline} | Habimint`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="INR" />
        <link rel="canonical" href={`https://habimint.com/products/${product.slug}`} />
      </head>

      {/* JSON-LD Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.mainImage,
            sku: product.id,
            brand: {
              '@type': 'Brand',
              name: 'Habimint',
            },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              url: `https://habimint.com/products/${product.slug}`,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />

      <main className="bg-white pt-24 pb-20">
        {/* TOP SECTION - Product Details */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* LEFT - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div
                className="relative w-full overflow-hidden rounded-2xl mb-4 flex items-center justify-center min-h-[300px] max-h-[400px] md:min-h-[500px] md:max-h-[600px]"
                style={{ backgroundColor: '#F5F2E8' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={product.gallery[selectedImage]}
                      alt={product.name}
                      width={600}
                      height={600}
                      quality={95}
                      priority
                      className="w-full h-full"
                      style={{
                        objectFit: 'contain',
                        maxHeight: '580px',
                        padding: '16px',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnail Gallery — horizontal scroll row */}
              <div
                className="flex gap-2 md:gap-3 overflow-x-auto pb-2 -mx-1 px-1"
                style={{
                  scrollbarWidth: 'thin',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className="relative shrink-0 rounded-lg overflow-hidden transition-all flex items-center justify-center w-[65px] h-[80px] md:w-[80px] md:h-[100px]"
                    style={{
                      backgroundColor: '#F5F2E8',
                      border:
                        selectedImage === index
                          ? '2px solid #2D5A27'
                          : '2px solid #E5E0D5',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedImage !== index) {
                        (e.currentTarget as HTMLButtonElement).style.border = '2px solid #C8DEC8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedImage !== index) {
                        (e.currentTarget as HTMLButtonElement).style.border = '2px solid #E5E0D5';
                      }
                    }}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      width={100}
                      height={120}
                      style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        padding: '4px',
                      }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* RIGHT - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              {/* Badge */}
              <span className={`${product.badgeColor} text-white text-xs px-4 py-1.5 rounded-full font-medium w-fit mb-4`}>
                {product.badge}
              </span>

              {/* Product Name */}
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-habimint-text mb-2">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="text-habimint-text-light text-base mb-4">{product.tagline}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-habimint-text font-medium">{product.rating}</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-sm text-habimint-primary hover:underline"
                >
                  ({product.reviewCount} reviews)
                </button>
              </div>

              <div className="border-t border-gray-200 mb-6" />

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-heading text-4xl font-bold text-habimint-primary">₹{product.price}</span>
                  <span className="text-gray-400 line-through text-xl">₹{product.originalPrice}</span>
                </div>
                <div className="inline-flex items-center bg-green-50 text-habimint-primary text-sm px-3 py-1 rounded-full">
                  You save ₹{savings} ({discountPercent}% off)
                </div>
              </div>

              <div className="border-t border-gray-200 mb-6" />

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-habimint-text mb-2">Quantity</label>
                <div className="flex items-center gap-4 border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() =>
                      handleCart("REMOVE")
                    }
                    className={`p-3 hover:bg-gray-50 transition ${product?.cart_qty == 0 ? "cursor-default" : "cursor-pointer"}`}
                    disabled={product?.cart_qty <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{product?.cart_qty || 0}</span>
                  <button
                    onClick={() => {
                      if (product?.cart_qty == 0) {
                        handleCart("NEW_ADD")
                      } else {
                        handleCart("ADD")
                      }
                    }
                    }
                    className="p-3 hover:bg-gray-50 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  if (product?.cart_qty == 0) {
                    handleCart("NEW_ADD")
                  } else {
                    handleCart("ADD")
                  }
                }
                }
                disabled={addingToCart}
                className={`w-full py-4 rounded-full font-semibold text-lg mb-3 transition flex items-center justify-center gap-2 bg-habimint-primary text-white hover:bg-opacity-90`}
              >
                {addingToCart ? (
                  'Adding...'
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now Button */}
              {/* <Link href="/checkout">
                <button className="w-full py-4 rounded-full font-semibold text-lg border-2 border-habimint-primary text-habimint-primary hover:bg-habimint-primary hover:text-white transition">
                  Buy Now
                </button>
              </Link> */}

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                  <Lock className="w-4 h-4 text-habimint-primary" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                  <Truck className="w-4 h-4 text-habimint-primary" />
                  Free delivery above ₹1,499
                </div>
                <div className="flex items-center gap-2 text-sm text-habimint-text-light">
                  <RotateCcw className="w-4 h-4 text-habimint-primary" />
                  Easy Returns
                </div>
              </div>

              <div className="border-t border-gray-200 my-6" />

              {/* Features List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-habimint-text mb-4">What's Included</h3>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-habimint-primary" />
                      </div>
                      <span className="text-sm text-habimint-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Buttons */}
              <div>
                <h3 className="text-sm font-medium text-habimint-text mb-3">Share</h3>
                <div className="flex gap-3">
                  <button
                    onClick={handleWhatsAppShare}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    {copySuccess ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section >

        {/* MIDDLE SECTION - Tabs */}
        < section className="container mx-auto px-4 mt-20" >
          <div className="max-w-7xl mx-auto">
            {/* Tab Headers */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex gap-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'about'
                    ? 'border-habimint-primary text-habimint-primary font-semibold'
                    : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                    }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveTab('inside')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'inside'
                    ? 'border-habimint-primary text-habimint-primary font-semibold'
                    : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                    }`}
                >
                  Inside the Journal
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'specs'
                    ? 'border-habimint-primary text-habimint-primary font-semibold'
                    : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                    }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'reviews'
                    ? 'border-habimint-primary text-habimint-primary font-semibold'
                    : 'border-transparent text-habimint-text-light hover:text-habimint-text'
                    }`}
                >
                  Reviews ({product.reviewCount})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="prose prose-lg max-w-none">
                    <p className="text-habimint-text leading-relaxed">{product.description}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'inside' && (
                <motion.div
                  key="inside"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.insidePages.map((page, index) => (
                      <div key={index} className="group">
                        <div
                          className="relative rounded-2xl mb-3 bg-habimint-bg"
                          style={{
                            minHeight: '280px',
                            aspectRatio: '4/3',
                          }}
                        >
                          <Image
                            src={page.image}
                            alt={page.title}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                          />
                        </div>
                        <h4 className="font-heading text-lg font-semibold text-habimint-text mb-1">
                          {page.title}
                        </h4>
                        <p className="text-sm text-habimint-text-light">{page.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-4 pr-4 font-semibold text-habimint-text w-1/3">{key}</td>
                          <td className="py-4 text-habimint-text-light">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Featured Review */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                    className="rounded-2xl"
                    style={{
                      backgroundColor: '#F5F2E8',
                      border: '2px solid #C8DEC8',
                      borderRadius: '16px',
                      padding: '32px',
                      marginBottom: '32px',
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
                      {/* LEFT: Text */}
                      <div className="flex-1 flex flex-col">
                        <span
                          className="inline-block self-start rounded-full text-xs font-semibold tracking-wider"
                          style={{
                            backgroundColor: '#2D5A27',
                            color: '#FFFFFF',
                            padding: '6px 14px',
                            marginBottom: '16px',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        >
                          FEATURED REVIEW
                        </span>

                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <p
                          className="italic"
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '16px',
                            color: '#374151',
                            lineHeight: 1.8,
                          }}
                        >
                          &ldquo;As someone who constantly juggles creativity and business, this journal brought a sense of structure and calm into my life. I was one of the first to use it, and honestly, I didn&rsquo;t expect it to have this much impact. The way it guides your thoughts, helps you reflect, and builds discipline without feeling overwhelming is beautiful. It&rsquo;s not just a journal — it feels like a personal space where I can reset every day. I&rsquo;ve seen a real shift in my focus, clarity, and consistency. Highly recommend this to anyone who wants to grow while staying grounded.&rdquo;
                        </p>

                        <div style={{ marginTop: '20px' }}>
                          <p
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontWeight: 700,
                              fontSize: '16px',
                              color: '#1A1A1A',
                              margin: 0,
                            }}
                          >
                            Shruti Patel
                          </p>
                          <p
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: '13px',
                              color: '#6B7280',
                              margin: '4px 0 0 0',
                            }}
                          >
                            Founder, Simply Artistic
                          </p>
                        </div>
                      </div>

                      {/* RIGHT: Image */}
                      <div
                        className="w-full md:w-auto flex-shrink-0"
                        style={{ maxWidth: '320px' }}
                      >
                        <div
                          className="relative w-full overflow-hidden"
                          style={{
                            aspectRatio: '4 / 3',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                          }}
                        >
                          <img
                            src="/images/shruti-review-collage.jpg"
                            alt="Shruti Patel using the Fall Forward journal"
                            className="w-full h-full"
                            style={{ objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Rating Summary */}
                  <div className="bg-habimint-bg rounded-2xl p-8 mb-8">
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-habimint-primary mb-2">{product.rating}</div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-habimint-text-light">{product.reviewCount} reviews</div>
                      </div>
                      <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3 mb-2">
                            <span className="text-sm w-8">{stars}★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400"
                                style={{
                                  width:
                                    stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '5%' : '3%',
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonials */}
                  <div className="space-y-6">
                    {DetailPage_Testimonials.map((testimonial, index) => (
                      <div key={index} className="border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-habimint-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-habimint-text">{testimonial.name}</h4>
                              <span className="text-sm text-habimint-text-light">• {testimonial.role}</span>
                            </div>
                            <div className="flex gap-1 mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <p className="text-habimint-text-light leading-relaxed">{testimonial.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section >

        {/* BOTTOM SECTION - You Might Also Like */}
        {
          otherProduct && (
            <section className="container mx-auto px-4 mt-20">
              <div className="max-w-7xl mx-auto">
                <h2 className="font-heading text-3xl font-bold text-habimint-text mb-8">You Might Also Like</h2>
                <div className="max-w-md">
                  <Link href={`/products/${otherProduct.slug}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="relative aspect-[4/5] rounded-t-2xl overflow-hidden">
                        <Image src={otherProduct.mainImage} alt={otherProduct.name} fill className="object-cover" />
                        <div className="absolute top-4 left-4">
                          <span
                            className={`${otherProduct.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}
                          >
                            {otherProduct.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-heading text-2xl font-bold text-habimint-text mb-2">
                          {otherProduct.name}
                        </h3>
                        <p className="text-habimint-text-light text-sm mb-4">{otherProduct.tagline}</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-habimint-primary text-2xl font-bold">₹{otherProduct.price}</span>
                          <span className="text-gray-400 line-through text-base">₹{otherProduct.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          )
        }
      </main >
    </>
  );
}
