// Centralized API layer for Habimint
import axios from 'axios';
import {
  Product,
  Cart,
  Order,
  Blog,
  B2BEnquiry,
  NewsletterSubscription,
  Coupon,
  ApiResponse,
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ============================================
// PRODUCTS API
// ============================================

/**
 * Get all products
 * TODO: Backend integration - GET /api/products
 */
export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await api.get('/api/products');
  return response.data;
};

/**
 * Get single product by slug
 * TODO: Backend integration - GET /api/products/:slug
 */
export const getProduct = async (slug: string): Promise<ApiResponse<Product>> => {
  const response = await api.get(`/api/products/${slug}`);
  return response.data;
};

/**
 * Get featured products
 * TODO: Backend integration - GET /api/products/featured
 */
export const getFeaturedProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await api.get('/api/products/featured');
  return response.data;
};

// ============================================
// AUTH API
// ============================================

/**
 * Login user with credentials
 * TODO: Backend integration - POST /api/auth/login
 */
export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ token: string; user: any }>> => {
  const response = await api.post('/api/auth/login', data);
  return response.data;
};

/**
 * Register new user
 * TODO: Backend integration - POST /api/auth/register
 */
export const registerUser = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<ApiResponse<{ token: string; user: any }>> => {
  const response = await api.post('/api/auth/register', data);
  return response.data;
};

/**
 * Get current user profile
 * TODO: Backend integration - GET /api/auth/me
 */
export const getCurrentUser = async (): Promise<ApiResponse<any>> => {
  const response = await api.get('/api/auth/me');
  return response.data;
};

/**
 * Google OAuth authentication
 * Note: This will be handled by NextAuth.js
 */
export const googleAuth = () => {
  // TODO: Implement NextAuth Google provider
  // This is handled on the frontend with signIn('google')
};

// ============================================
// CART API
// ============================================

/**
 * Get user's cart
 * TODO: Backend integration - GET /api/cart
 */
export const getCart = async (): Promise<ApiResponse<Cart>> => {
  const response = await api.get('/api/cart');
  return response.data;
};

/**
 * Add item to cart
 * TODO: Backend integration - POST /api/cart
 */
export const addToCart = async (data: {
  productId: string;
  quantity: number;
}): Promise<ApiResponse<Cart>> => {
  const response = await api.post('/api/cart', data);
  return response.data;
};

/**
 * Remove item from cart
 * TODO: Backend integration - DELETE /api/cart/:id
 */
export const removeFromCart = async (itemId: string): Promise<ApiResponse<Cart>> => {
  const response = await api.delete(`/api/cart/${itemId}`);
  return response.data;
};

/**
 * Update cart item quantity
 * TODO: Backend integration - PUT /api/cart/:id
 */
export const updateCartItem = async (
  itemId: string,
  data: { quantity: number }
): Promise<ApiResponse<Cart>> => {
  const response = await api.put(`/api/cart/${itemId}`, data);
  return response.data;
};

/**
 * Clear entire cart
 * TODO: Backend integration - DELETE /api/cart
 */
export const clearCart = async (): Promise<ApiResponse<null>> => {
  const response = await api.delete('/api/cart');
  return response.data;
};

// ============================================
// ORDERS API
// ============================================

/**
 * Create new order
 * TODO: Backend integration - POST /api/orders
 */
export const createOrder = async (data: any): Promise<ApiResponse<Order>> => {
  const response = await api.post('/api/orders', data);
  return response.data;
};

/**
 * Get user's orders
 * TODO: Backend integration - GET /api/orders/my
 */
export const getMyOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await api.get('/api/orders/my');
  return response.data;
};

/**
 * Get single order by ID
 * TODO: Backend integration - GET /api/orders/:id
 */
export const getOrder = async (orderId: string): Promise<ApiResponse<Order>> => {
  const response = await api.get(`/api/orders/${orderId}`);
  return response.data;
};

// ============================================
// COUPON API
// ============================================

/**
 * Apply coupon code
 * TODO: Backend integration - POST /api/coupon/apply
 */
export const applyCoupon = async (code: string): Promise<ApiResponse<Coupon>> => {
  const response = await api.post('/api/coupon/apply', { code });
  return response.data;
};

// ============================================
// BLOG API
// ============================================

/**
 * Get all blog posts
 * TODO: Backend integration - GET /api/blogs
 */
export const getBlogs = async (): Promise<ApiResponse<Blog[]>> => {
  const response = await api.get('/api/blogs');
  return response.data;
};

/**
 * Get single blog post by slug
 * TODO: Backend integration - GET /api/blogs/:slug
 */
export const getBlog = async (slug: string): Promise<ApiResponse<Blog>> => {
  const response = await api.get(`/api/blogs/${slug}`);
  return response.data;
};

/**
 * Get featured blog posts
 * TODO: Backend integration - GET /api/blogs/featured
 */
export const getFeaturedBlogs = async (): Promise<ApiResponse<Blog[]>> => {
  const response = await api.get('/api/blogs/featured');
  return response.data;
};

// ============================================
// B2B API
// ============================================

/**
 * Submit B2B enquiry form
 * TODO: Backend integration - POST /api/b2b/enquiry
 */
export const submitB2BEnquiry = async (
  data: B2BEnquiry
): Promise<ApiResponse<null>> => {
  const response = await api.post('/api/b2b/enquiry', data);
  return response.data;
};

// ============================================
// NEWSLETTER API
// ============================================

/**
 * Subscribe to newsletter
 * TODO: Backend integration - POST /api/newsletter
 */
export const subscribeNewsletter = async (
  email: string
): Promise<ApiResponse<null>> => {
  const response = await api.post('/api/newsletter', { email });
  return response.data;
};

export default api;