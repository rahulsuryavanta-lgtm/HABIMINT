"use client"
import { CartProduct_Int } from '@/interface/ProductInterface';
import { RootState } from '@/stores';
import { fetchAddToCart, fetchDeleteCartItem, fetchUpdateCart } from '@/stores/productCartSlice';
import { getUserInfo } from '@/utils/getToken';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AddRemoveButton: React.FC<{ product_id: number; cart_id: number; cart_qty: number; onCartQtyUpdate: (data: any) => void }> = ({
    product_id,
    cart_id,
    cart_qty,
    onCartQtyUpdate
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const loggedInUser = getUserInfo();
    const router = useRouter()
    const dispatch = useDispatch()
    const { cartLoading } = useSelector(
        (state: RootState) => state.productCartSlice
    );



    const handleCart = async (type: "ADD" | "REMOVE" | "NEW_ADD") => {
        if (!loggedInUser?.id) {
            router.push("/login");
        } else {
            setIsLoading(true)
            if (type == "NEW_ADD") {
                let params = {
                    product_id: product_id,
                    qty: 1,
                };

                await dispatch(fetchAddToCart({ params })).then((res: any) => {
                    if (res?.payload?.response?.status_code == 200) {
                        let itemData: CartProduct_Int[] = res?.payload?.response?.data?.cart_products
                        if (itemData?.length > 0) {
                            onCartQtyUpdate(itemData)
                        }
                    }
                    setIsLoading(false)
                });


            } else if (+cart_qty === 1 && type == "REMOVE") {
                let params = {
                    product_id: product_id,
                    cart_id: cart_id,
                };
                await dispatch(fetchDeleteCartItem({ params })).then((res: any) => {
                    let tempRes = [
                        {
                            "id": product_id,
                            "createdAt": "",
                            "updatedAt": "",
                            "name": "",
                            "description": "",
                            "price": "",
                            "product_code": "",
                            "product_slug": "",
                            "discount_price": "",
                            "created_by": "",
                            "updated_by": "",
                            "status": 1,
                            "inside_content": "",
                            "product_features": "",
                            "product_detail": "",
                            "deletedAt": "",
                            "cart_qty": 0,
                            "cart_id": 0,
                            "ProductImages": []
                        }]

                    if (res?.payload?.response?.status_code == 200) {
                        onCartQtyUpdate(tempRes)
                    }

                    setIsLoading(false)

                });

            } else if (+cart_qty > 0) {
                let params = {
                    product_id: product_id,
                    cart_id: cart_id,
                    qty: type === "ADD" ? +cart_qty + 1 : +cart_qty - 1,
                };
                await dispatch(fetchUpdateCart({ params })).then((res: any) => {
                    if (res?.payload?.response?.status_code == 200) {
                        let itemData: CartProduct_Int[] = res?.payload?.response?.data?.cart_products
                        if (itemData?.length > 0) {
                            onCartQtyUpdate(itemData)
                        }
                    }
                    setIsLoading(false)
                });
                // if (paramSlug?.slug) {
                //     dispatch(fetchProductDetail({ paramSlug }));
                // }
            }
        }
    };



    return (
        <div>
            {cart_qty > 0 ? (
                <div className="flex-1 flex items-center justify-between bg-habimint-primary text-white py-2 px-2 rounded-full font-semibold">
                    <button
                        onClick={() => handleCart("REMOVE")}
                        disabled={isLoading}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "-"
                        )}
                    </button>

                    <span>{cart_qty}</span>

                    <button
                        onClick={() => handleCart("ADD")}
                        disabled={isLoading}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-full transition disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "+"
                        )}
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => handleCart("NEW_ADD")}
                    disabled={isLoading}
                    className="flex-1 bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition w-full disabled:opacity-70 flex items-center justify-center"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Add to Cart"
                    )}
                </button>
            )}
        </div>
    )
}

export default AddRemoveButton