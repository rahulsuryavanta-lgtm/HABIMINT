export enum API_MESSAGE {
  TOKEN_NOT_FOUND = 'Authorization Token not found.',
  DETAIL_PAGE_NOT_AVAILABLE = 'course not found',
  TOKEN_NOT_VALID = 'Token is Invalid.',
  SOMETHING_WENT_WRONG = 'Something went wrong !',
}

export enum FORMS_MESSAGE {
  REQUIRED = 'This field is required',
  INVALID_EMAIL = 'Invalid email address',
  EMAIL_REQUIRED = 'Email is required',
  PASSWORD_REQUIRED = 'Password is required',
  DISCOUNT_MUSTBE_LESS_THAN_ORIGINAL = 'Discount price must be less than the original price',
}


export enum MODULE_NAMES {
  PRODUCT = 'product',
  BLOG = 'blogs',
}


export const MODULE_NAMES_LIST = {
  PRODUCT: 'product',
  BLOG: 'blogs',
}

export const CURRENCY_SYMBOL = {
  RUPEE: "₹"
}

export type RAZORPAY_STATUS = "Created" | "Pay_Success" | "Failed" | "Timeout" | "Cancelled"


export const RAZORPAY_STATUS_MAP: { [key in RAZORPAY_STATUS]: number } = {
  Pay_Success: 1,
  Failed: 2,
  Cancelled: 3,
  Timeout: 4,
  Created: 5
};

export type ORDER_STATUS_TYPE = "Pending" | "Order Confirmed" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled"

export const ORDER_STATUS_MAP: { [key in ORDER_STATUS_TYPE]: string } = {
  Pending: "Pending",
  "Order Confirmed": "Order Confirmed",
  Shipped: "Shipped",
  "Out for Delivery": "Out for Delivery",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};

export type ORDER_PAYMENT_STATUS_TYPE = "Pending" | "Approved" | "Rejected"

export const ORDER_HISTORY_PAYMENT_STATUS = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed"
}

