// Zustand store for cart management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product } from '@/lib/types';
import { addToCart, removeFromCart, updateCartItem, getCart, clearCart } from '@/lib/api';

interface CartStore {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  clearCartItems: () => Promise<void>;
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCart = create<CartStore>()(persist(
  (set, get) => ({
    cart: null,
    isLoading: false,
    error: null,

    fetchCart: async () => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await getCart();
        // set({ cart: response.data, isLoading: false });
        
        // Temporary mock implementation
        set({ 
          cart: {
            id: 'temp-cart',
            items: [],
            subtotal: 0,
            total: 0,
          }, 
          isLoading: false 
        });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },

    addItem: async (product: Product, quantity: number) => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await addToCart({ productId: product.id, quantity });
        // set({ cart: response.data, isLoading: false });
        
        // Temporary mock implementation
        const currentCart = get().cart;
        const existingItem = currentCart?.items.find(item => item.productId === product.id);
        
        if (existingItem) {
          // Update quantity if item exists
          const updatedItems = currentCart!.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          set({ 
            cart: { 
              ...currentCart!, 
              items: updatedItems,
              subtotal,
              total: subtotal,
            }, 
            isLoading: false 
          });
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `item-${Date.now()}`,
            productId: product.id,
            product,
            quantity,
            price: product.price,
          };
          const updatedItems = [...(currentCart?.items || []), newItem];
          const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          set({ 
            cart: {
              id: currentCart?.id || 'temp-cart',
              items: updatedItems,
              subtotal,
              total: subtotal,
            }, 
            isLoading: false 
          });
        }
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },

    removeItem: async (itemId: string) => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await removeFromCart(itemId);
        // set({ cart: response.data, isLoading: false });
        
        // Temporary mock implementation
        const currentCart = get().cart;
        const updatedItems = currentCart!.items.filter(item => item.id !== itemId);
        const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ 
          cart: { 
            ...currentCart!, 
            items: updatedItems,
            subtotal,
            total: subtotal,
          }, 
          isLoading: false 
        });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },

    updateItem: async (itemId: string, quantity: number) => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await updateCartItem(itemId, { quantity });
        // set({ cart: response.data, isLoading: false });
        
        // Temporary mock implementation
        const currentCart = get().cart;
        const updatedItems = currentCart!.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ 
          cart: { 
            ...currentCart!, 
            items: updatedItems,
            subtotal,
            total: subtotal,
          }, 
          isLoading: false 
        });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },

    clearCartItems: async () => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // await clearCart();
        
        set({ 
          cart: {
            id: 'temp-cart',
            items: [],
            subtotal: 0,
            total: 0,
          }, 
          isLoading: false 
        });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },

    getItemCount: () => {
      const cart = get().cart;
      return cart?.items.reduce((count, item) => count + item.quantity, 0) || 0;
    },

    getSubtotal: () => {
      const cart = get().cart;
      return cart?.subtotal || 0;
    },
  }),
  {
    name: 'habimint-cart',
  }
));