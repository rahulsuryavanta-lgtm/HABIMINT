// Zustand store for authentication management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/lib/types';
import { loginUser, registerUser, getCurrentUser } from '@/lib/api';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthStore>()(persist(
  (set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await loginUser({ email, password });
        // const { token, user } = response.data!;
        // localStorage.setItem('authToken', token);
        // set({ user, token, isAuthenticated: true, isLoading: false });
        
        // Temporary mock implementation
        const mockUser: User = {
          id: 'user-' + Date.now(),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const mockToken = 'mock-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        set({ 
          user: mockUser, 
          token: mockToken, 
          isAuthenticated: true, 
          isLoading: false 
        });
      } catch (error: any) {
        set({ 
          error: error.response?.data?.message || 'Login failed', 
          isLoading: false 
        });
        throw error;
      }
    },

    register: async (email: string, password: string, name: string) => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await registerUser({ email, password, name });
        // const { token, user } = response.data!;
        // localStorage.setItem('authToken', token);
        // set({ user, token, isAuthenticated: true, isLoading: false });
        
        // Temporary mock implementation
        const mockUser: User = {
          id: 'user-' + Date.now(),
          email,
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const mockToken = 'mock-token-' + Date.now();
        localStorage.setItem('authToken', mockToken);
        set({ 
          user: mockUser, 
          token: mockToken, 
          isAuthenticated: true, 
          isLoading: false 
        });
      } catch (error: any) {
        set({ 
          error: error.response?.data?.message || 'Registration failed', 
          isLoading: false 
        });
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem('authToken');
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        error: null 
      });
    },

    fetchUser: async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        set({ isAuthenticated: false, user: null });
        return;
      }

      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await getCurrentUser();
        // set({ user: response.data!, isAuthenticated: true, isLoading: false });
        
        // Temporary: Keep the existing user if token exists
        const existingUser = get().user;
        if (existingUser) {
          set({ isAuthenticated: true, isLoading: false });
        } else {
          set({ isAuthenticated: false, isLoading: false });
          localStorage.removeItem('authToken');
        }
      } catch (error: any) {
        localStorage.removeItem('authToken');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false, 
          error: error.message, 
          isLoading: false 
        });
      }
    },

    clearError: () => {
      set({ error: null });
    },
  }),
  {
    name: 'habimint-auth',
  }
));