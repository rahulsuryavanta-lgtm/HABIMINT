import {
  CartProduct_Int,
  CartTotal_Int,
  OrderHistoryData_Int,
  Product_Int,
} from "@/interface/ProductInterface";
import { callApi } from "@/lib/apiBase/api";
import {
  CART_API,
  ORDER_API,
  PRODUCT_API,
  URLDELETEMETHOD,
  URLGETMETHOD,
  URLPOSTMETHOD,
  URLPUTMETHOD,
} from "@/lib/constants/ApiConstants";
import { JournalsSectionProducts, JournalsSectionProducts_Int } from "@/public/data/product_store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductDetail: any = createAsyncThunk<any, any>(
  "productCartStore/fetchProductDetail",
  async ({ paramSlug }, { getState, dispatch }) => {
    if (paramSlug?.isPageApi) {
      dispatch(handleDetailLoader(true));
    }
    try {
      const response = await callApi<any>({
        url: `${PRODUCT_API.DETAILS}?slug=${paramSlug?.slug}`,
        method: URLGETMETHOD,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchCartData: any = createAsyncThunk<any, any>(
  "productCartStore/fetchCartData",
  async ({ }, { getState, dispatch }) => {
    dispatch(handleCartLoader(true));
    try {
      const response = await callApi<any>({
        url: CART_API.CART_DATA,
        method: URLGETMETHOD,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchAddToCart: any = createAsyncThunk<any, any>(
  "productCartStore/fetchAddToCart",
  async ({ params }, { getState, dispatch }) => {
    dispatch(handleCartLoader(true));
    try {
      const response = await callApi<any>({
        url: CART_API.ADD_CART,
        method: URLPOSTMETHOD,
        body: params,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchUpdateCart: any = createAsyncThunk<any, any>(
  "productCartStore/fetchUpdateCart",
  async ({ params }, { getState, dispatch }) => {
    dispatch(handleCartLoader(true));
    try {
      const response = await callApi<any>({
        url: CART_API.UPDATE_CART,
        method: URLPUTMETHOD,
        body: params,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchDeleteCartItem: any = createAsyncThunk<any, any>(
  "productCartStore/fetchDeleteCartItem",
  async ({ params }, { getState, dispatch }) => {
    dispatch(handleCartLoader(true));
    try {
      const response = await callApi<any>({
        url: CART_API.DELETE_CART,
        method: URLDELETEMETHOD,
        body: params,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchTotalCartQty: any = createAsyncThunk<any, any>(
  "productCartStore/fetchTotalCartQty",
  async ({ }, { getState, dispatch }) => {
    try {
      const response = await callApi<any>({
        url: CART_API.TOTAL_CART_QTY,
        method: URLGETMETHOD,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchInitiateOrderPayment: any = createAsyncThunk<any, any>(
  "productCartStore/fetchInitiateOrderPayment",
  async ({ params }, { getState, dispatch }) => {
    try {
      const response = await callApi<any>({
        url: ORDER_API.PAY_NOW,
        method: URLPOSTMETHOD,
        body: params,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchGetCouponOffer: any = createAsyncThunk<any, any>(
  "productCartStore/fetchGetCouponOffer",
  async ({ params }, { getState, dispatch }) => {
    dispatch(handleCouponOfferLoader(true));

    try {
      const response = await callApi<any>({
        url: ORDER_API.AVAILABLE_COUPON,
        method: URLGETMETHOD,
        body: params,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchUpdatePaymentStatus: any = createAsyncThunk<any, any>(
  "productCartStore/fetchUpdatePaymentStatus",
  async ({ params }, { getState, dispatch }) => {
    try {
      const response = await callApi<any>({
        url: ORDER_API.VERIFY_PAYMENT,
        method: URLPOSTMETHOD,
        body: params,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

export const fetchOrderHistory: any = createAsyncThunk<any, any>(
  "productCartStore/fetchOrderHistory",
  async ({ }, { getState, dispatch }) => {
    dispatch(handleOrderHistoryLoader(true));
    try {
      const response = await callApi<any>({
        url: ORDER_API.ORDER_HISTORY,
        method: URLGETMETHOD,
      });

      return { response };
    } catch (error) {
      console.warn("error: ", error);
    }
  }
);

interface ProductCartState {
  productDetail: Product_Int;
  productDetailLoading: boolean;
  cart_products: JournalsSectionProducts_Int[];
  cart_total: CartTotal_Int;
  total_records: number;
  cartLoading: boolean;
  cartDrawerOpen: boolean;
  orderHistory: OrderHistoryData_Int[];
  orderHistoryLoading: boolean;
  couponOffer?: any;
  couponOfferLoading?: boolean;
}

const initialState: ProductCartState = {
  productDetail: {} as any,
  productDetailLoading: true,
  cart_products: [] as any[],
  cart_total: {} as any,
  total_records: 0,
  cartLoading: false,
  cartDrawerOpen: false,
  orderHistory: [] as any,
  orderHistoryLoading: false,
  couponOffer: [] as any,
  couponOfferLoading: false,
};

export const productCartSlice = createSlice({
  name: "productCartStore",
  initialState,
  reducers: {
    handleDetailLoader: (state, action) => {
      state.productDetailLoading = action.payload;
    },
    handleCartLoader: (state, action) => {
      state.cartLoading = action.payload;
    },
    handleCartDrawer: (state, action) => {
      // state.cartDrawerOpen = action.payload;
      state.cartLoading = action.payload;
    },
    handleOrderHistoryLoader: (state, action) => {
      state.orderHistoryLoading = action.payload;
    },
    handleCouponOfferLoader: (state, action) => {
      state.couponOfferLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {
        state.productDetail = action.payload?.response?.data || ({} as any);
        state.productDetailLoading = false;
      }
    });

    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {

        const cartProducts =
          action.payload?.response?.data?.cart_products ?? [];

        state.cart_products = cartProducts.reduce((acc: any[], cartItem: any) => {
          const product = JournalsSectionProducts.find(
            item => item.product_id === cartItem.id
          );

          if (product) {
            acc.push({
              ...product,
              cart_id: cartItem.cart_id,
              cart_qty: cartItem.cart_qty,
            });
          }

          return acc;
        }, []);

        state.cart_total =
          action.payload?.response?.data?.cart_total || ({} as any);
        // state.cartDrawerOpen = true;
      }
      state.cartLoading = false;
    });

    builder.addCase(fetchAddToCart.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {

        const cartProducts =
          action.payload?.response?.data?.cart_products ?? [];

        state.cart_products = cartProducts.reduce((acc: any[], cartItem: any) => {
          const product = JournalsSectionProducts.find(
            item => item.product_id === cartItem.id
          );

          if (product) {
            acc.push({
              ...product,
              cart_id: cartItem.cart_id,
              cart_qty: cartItem.cart_qty,
            });
          }

          return acc;
        }, []);

        state.cart_total =
          action.payload?.response?.data?.cart_total || ({} as any);
        // state.cartDrawerOpen = true;
      }
      state.cartLoading = false;
    });


    builder.addCase(fetchUpdateCart.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {
        const cartProducts =
          action.payload?.response?.data?.cart_products ?? [];

        state.cart_products = cartProducts.reduce((acc: any[], cartItem: any) => {
          const product = JournalsSectionProducts.find(
            item => item.product_id === cartItem.id
          );

          if (product) {
            acc.push({
              ...product,
              cart_id: cartItem.cart_id,
              cart_qty: cartItem.cart_qty,
            });
          }

          return acc;
        }, []);
        state.cart_total =
          action.payload?.response?.data?.cart_total || ({} as any);
      }
      state.cartLoading = false;
    });

    builder.addCase(fetchDeleteCartItem.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {

        const cartProducts =
          action.payload?.response?.data?.cart_products ?? [];

        state.cart_products = cartProducts.reduce((acc: any[], cartItem: any) => {
          const product = JournalsSectionProducts.find(
            item => item.product_id === cartItem.id
          );

          if (product) {
            acc.push({
              ...product,
              cart_id: cartItem.cart_id,
              cart_qty: cartItem.cart_qty,
            });
          }

          return acc;
        }, []);

        state.cart_total =
          action.payload?.response?.data?.cart_total || ({} as any);
        // state.cartDrawerOpen = true;
      }
      state.cartLoading = false;
    });

    builder.addCase(fetchTotalCartQty.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {
        state.cart_total = {
          ...state.cart_total,
          cart_qty: action.payload?.response?.data,
        };
      }
    });

    builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {
        state.orderHistory = action.payload?.response?.data || [];
      }
      state.orderHistoryLoading = false;
    });

    builder.addCase(fetchGetCouponOffer.fulfilled, (state, action) => {
      if (action.payload?.response?.status_code === 200) {
        state.couponOffer = action.payload?.response?.data || [];
      }
      state.couponOfferLoading = false;
    });
  },
});

export const {
  handleCartLoader,
  handleCartDrawer,
  handleDetailLoader,
  handleOrderHistoryLoader,
  handleCouponOfferLoader,
} = productCartSlice.actions;

export default productCartSlice.reducer;
