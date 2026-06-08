import { ORDER_PAYMENT_STATUS_TYPE, ORDER_STATUS_TYPE } from "@/lib/constants/GlobalConstant"

export interface Product_Int {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    price: string
    product_code: string
    product_slug: string
    discount_price: string
    created_by: string
    updated_by: string
    status: number
    inside_content: string
    product_features: string
    product_detail: string
    deletedAt: string
    cart_id: string
    cart_qty: string
    averageRating: number
    totalReview: number
    ProductImages: ProductImage_Int[]
    productReviews: any[]
}

export interface ProductImage_Int {
    id: number
    createdAt: string
    updatedAt: string
    product_id: number
    image: string
    is_main_image: boolean
    deletedAt: string
}

export interface Pagination {
    totalRecords: number
    currentPage: number
    totalPages: number
    limit: number
}



export interface Root {
    cart_products: CartProduct_Int[]
    cart_total: CartTotal_Int
}

export interface CartProduct_Int {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    price: string
    product_code: string
    product_slug: string
    discount_price: string
    created_by: string
    updated_by: string
    status: number
    inside_content: string
    product_features: string
    product_detail: string
    deletedAt: string
    cart_qty: number
    cart_id: number
    ProductImages: ProductImage[]
}

export interface ProductImage {
    id: number
    createdAt: string
    updatedAt: string
    product_id: number
    image: string
    is_main_image: boolean
    deletedAt: string
}

export interface CartTotal_Int {
    sub_total: number
    total: number
    discount: number
    tax: number
    shipping: number
    customer_address: boolean
    cart_qty: number
}



export interface OrderHistoryData_Int {
    id: number
    createdAt: string
    updatedAt: string
    customer_id: number
    order_number: string
    order_date: string
    total_amount: string
    payment_method: string
    shipping_address: number
    shipping_amount: string
    sub_amount: string
    order_status: ORDER_STATUS_TYPE
    return_status: string
    payment_status: ORDER_PAYMENT_STATUS_TYPE
    is_return: number
    transaction_number: string
    discount_amount: string
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
    status: number
    deletedAt: string
    OrderItems: OrderItem_Int[]
}

export interface OrderItem_Int {
    id: number
    createdAt: string
    updatedAt: string
    order_id: number
    product_id: number
    qty: number
    price: string
    status: number
    is_return: number
    deletedAt: string
    Product: OrderProduct_Int
}

export interface OrderProduct_Int {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    price: string
    product_code: string
    product_slug: string
    discount_price: string
    created_by: string
    updated_by: string
    status: number
    inside_content: string
    product_features: string
    product_detail: string
    deletedAt: string
    ProductImages: OrderProductImage_Int[]
}

export interface OrderProductImage_Int {
    id: number
    createdAt: string
    updatedAt: string
    product_id: number
    image: string
    is_main_image: boolean
    deletedAt: string
}











// ----------- api 
export interface DashboardApi_ResInt {
    products: ProductList_Int[]
    pagination: ProductList_Pagination_Int
}

export interface ProductList_Int {
    id: number
    createdAt: string
    updatedAt: string
    name: string
    description: string
    price: string
    product_code: string
    product_slug: string
    discount_price: string
    created_by: string
    updated_by: string
    status: number
    inside_content: string
    product_features: string
    product_detail: string
    deletedAt: string
    cart_qty: any
    averageRating: string
    totalReview: number
    ProductImages: ProductImage_Int[]
    Cart: ProductList_Cart_Int
    productReviews: any[]
}


export interface ProductList_Pagination_Int {
    totalRecords: number
    currentPage: number
    totalPages: number
    limit: number
}


export interface ProductList_Cart_Int {
    id: number
    createdAt: string
    updatedAt: string
    customer_id: number
    product_id: number
    qty: number
    deletedAt: string
}
