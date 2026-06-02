import { MODULE_NAMES } from "./GlobalConstant";

export const URLPOSTMETHOD = 'POST';
export const URLGETMETHOD = 'GET';
export const URLLINKMETHOD = 'LINK';
export const URLDELETEMETHOD = 'DELETE';
export const URLUPDATEMETHOD = 'UPDATE';
export const URLPUTMETHOD = 'PUT';

export const PROFILE_URLS = {
  LOGIN: 'customer/customer-login',
  CREATE_ACCOUNT: "customer/customer-registration",
  VERIFY_OTP: "customer/verify-otp",
  GOOGLE_LOGIN: "customer/auth/google",
  GET_PROFILE: 'customer/customer-profile',
};

// export const PRODUCT_URLS = {
//   LIST_PRODUCT: 'product/list-product',
//   DETAIL_PRODUCT: 'product/product-details',
//   CREATE_PRODUCT: 'product/create-product',
//   UPDATE_PRODUCT: 'product/update-product',
//   UPDATE_STATUS: 'product/update-product-status',
// };
// export const createApiUrls = (moduleName: MODULE_NAMES) => ({
//   LIST: `${moduleName.toLowerCase()}/list`,
//   CREATE: `${moduleName.toLowerCase()}/create`,
//   UPDATE: `${moduleName.toLowerCase()}/update`,
//   DELETE: `${moduleName.toLowerCase()}/delete`,
//   UPDATE_STATUS: `${moduleName.toLowerCase()}/update-status`,
//   DETAILS: `${moduleName.toLowerCase()}/details`,
//   GET: `${moduleName.toLowerCase()}`,
// });

export const BLOG_API = {
  GET: 'blogs',
  DETAILS: "blogs/details"
}

export const HOMEPAGE_API = {
  GET: 'customer/dashboard',
  SUBSCRIBE_NEWSLETTER: 'customer/subscribe-newsletter',

}

export const PRODUCT_API = {
  LIST: 'product/list',
  DETAILS: 'customer/product-details',
}

export const CART_API = {
  CART_DATA: "cart/get-cart",
  ADD_CART: 'cart/add-to-cart',
  UPDATE_CART: 'cart/update-cart',
  DELETE_CART: "cart/delete-cart-items",
  TOTAL_CART_QTY: "cart/total-cart-qty"
}

export const CUSTOMER_ADDRESS = {
  ADD: "customer-address/add",
  UPDATE: "customer-address/update",
  LIST: "customer-address/list",
  DELETE: "customer-address/delete"


}


export const ORDER_API = {
  PAY_NOW: "order/pay-now",
  VERIFY_PAYMENT: "order/verify-payment",
  ORDER_HISTORY: "order/history",
  AVAILABLE_COUPON: "coupon/get-coupons",
};
