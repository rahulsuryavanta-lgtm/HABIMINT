'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, Truck } from 'lucide-react';
import { RootState } from '@/stores';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData, fetchInitiateOrderPayment, fetchTotalCartQty, fetchUpdatePaymentStatus } from '@/stores/productCartSlice';
import { API_MESSAGE, RAZORPAY_STATUS_MAP } from '@/lib/constants/GlobalConstant';
import { getUserInfo } from '@/utils/getToken';
import { fetchAddEditAddress, fetchGetAddressList } from '@/stores/profileSlice';
import useToast from '@/utils/useToast';
import Script from 'next/script';
import CircleLoader from '../loaders/CircleLoader';


const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];



const Checkout: React.FC<{
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}> = ({ step, setStep, }) => {

    const router = useRouter();
    const { cart_products, cart_total, couponOffer, couponOfferLoading, cartLoading } =
        useSelector((state: RootState) => state.productCartSlice);
    const { userAddress } = useSelector((state: RootState) => state.profileSlice);
    const userData = getUserInfo()
    const [loading, setLoading] = useState(false);
    const { Error, Success } = useToast()
    const dispatch = useDispatch()
    const { Created, Pay_Success, Failed, Timeout, Cancelled } =
        RAZORPAY_STATUS_MAP;


    // Form state
    const [formData, setFormData] = useState({
        addressId: 0,
        fullName: '',
        email: '',
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
    });


    useEffect(() => {
        // country
        setFormData({
            addressId: userAddress[0]?.id || 0,
            addressLine1: userAddress[0]?.address || "",
            city: userAddress[0]?.city || "",
            state: INDIAN_STATES.includes(userAddress[0]?.state) ? userAddress[0]?.state : '',
            pincode: userAddress[0]?.pin_code || "",
            fullName: userData?.name || "",
            email: userData?.email || "",
            phone: userData?.phone_number || "",
        })
    }, [userAddress])

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [placingOrder, setPlacingOrder] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [termsError, setTermsError] = useState<string | null>(null);

    const callCartDataApi = async () => {
        try {
            await dispatch(fetchCartData({})).then((res: any) => {
                if (res.payload?.response?.status_code === 200) {
                    if (res.payload?.response?.data?.cart_products?.length === 0) {
                        router.push("/");
                        Error("Please add products");
                    }
                } else {
                    router.push("/");
                    Error(API_MESSAGE.SOMETHING_WENT_WRONG);
                }
            });
        } catch (err: any) {
        } finally {
            // setCartLoading(false);
        }
    };

    const callAddressListApi = async () => {
        await dispatch(fetchGetAddressList({}))
    }

    useEffect(() => {
        callCartDataApi();
        callAddressListApi();

    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Invalid phone number (10 digits)';
        }
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Invalid pincode (6 digits)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) {
            return;
        }
        if (!agreedToTerms) {
            setTermsError('Please agree to our Terms & Conditions to proceed.');
            return;
        }
        setTermsError(null);

        setPlacingOrder(true);
        try {
            // first save the address 
            let params: any = {
                address: formData?.addressLine1,
                city: formData?.city,
                pin_code: formData?.pincode,
                state: formData?.state,
                country: "India",
                is_default: 1,
                address_type: "Home",
            };

            if (userAddress?.length > 0 && userAddress?.[0]?.id) {
                params = {
                    ...params,
                    id: formData?.addressId,
                }
            }
            await dispatch(fetchAddEditAddress({ params })).then(async (res) => {
                if (res?.payload?.response?.status_code === 200) {
                    if (!formData?.addressId) {
                        setFormData({
                            ...formData,
                            addressId: res?.payload?.response?.data[0]?.id,
                        })
                    }
                    await callRazorpayApi()
                }
            })


        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setPlacingOrder(false);
        }
    };



    const callRazorpayApi = async () => {
        if (!formData?.addressId) {
            Error("Please add address");
            return
        }
        setStep(2)
        setLoading(true);


        let params = {
            total_amount: +cart_total?.total?.toFixed(2),
            payment_method: 2, // 1 - COD | 2 - Online
            shipping_address: formData?.addressId,
            shipping_amount: +cart_total?.shipping?.toFixed(2),
            sub_amount: +cart_total?.sub_total?.toFixed(2),
            discount_amount: +cart_total?.discount?.toFixed(2) || 0,
            cart_id: cart_products?.map((item: any) => item.cart_id).toString(),
        };

        try {
            await dispatch(fetchInitiateOrderPayment({ params })).then(
                async (res: any) => {
                    // for razorpay
                    if (
                        res?.payload?.response?.status_code === 200 &&
                        res?.payload?.response?.data?.razorpay_order_id
                    ) {
                        await OpenRazorpayModal(
                            res?.payload?.response?.data?.order_id,
                            res?.payload?.response?.data?.razorpay_order_id
                        );
                    }
                    // for cod
                    // if (res?.payload?.response?.status_code === 200) {
                    //   Success(res?.payload?.response?.message);
                    //   setOrderStatus(true);
                    // }
                    setLoading(false);
                }
            );
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const OpenRazorpayModal = async (
        app_orderId: number,
        initiate_razorpay_orderId: string
    ) => {
        // const userData: User_Data_Int = await getUserInfo();
        setLoading(true);

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            currency: "INR",
            name: "HABIMINT",
            description: "Purchase",
            order_id: initiate_razorpay_orderId.toString(),
            handler: async function (response: any) {
                await updatePaymentStatus(
                    // response.razorpay_payment_id,
                    app_orderId,
                    response,
                    initiate_razorpay_orderId,
                    Pay_Success
                );
            },
            prefill: {
                name: "",
                email: userData?.email,
                contact: userData?.phone,
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#5B7054",
            },
            timeout: 600,
            modal: {
                ondismiss: async (reason: any) => {
                    // const {
                    //     reason: paymentReason, field, step, code,
                    // } = reason && reason.error ? reason.error : {};
                    // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly.
                    if (reason === undefined) {
                        await updatePaymentStatus(
                            app_orderId,
                            "",
                            initiate_razorpay_orderId,
                            Cancelled
                        );
                    }
                    // Reason 2 - When modal is auto closed because of time out
                    else if (reason === "timeout") {
                        await updatePaymentStatus(
                            app_orderId,
                            "",
                            initiate_razorpay_orderId,
                            Timeout
                        );
                    }
                    // Reason 3 - When payment gets failed.
                    else {
                        await updatePaymentStatus(
                            app_orderId,
                            "",
                            initiate_razorpay_orderId,
                            Cancelled
                        );
                    }
                },
            },
        };

        try {
            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", async function (response: any) {
                await updatePaymentStatus(
                    app_orderId,
                    response?.error?.metadata?.payment_id,
                    initiate_razorpay_orderId,
                    Failed
                );
            });
            rzp1.open();
        } catch (error) {
            // fetchDetailData()
            console.error("error", error);
        }
    };

    const updatePaymentStatus = async (
        app_orderId: number,
        razorpay_response: any,
        initiate_order_id: string,
        status: number
    ) => {
        setLoading(true);

        let params = {
            razorpay_payment_id: razorpay_response?.razorpay_payment_id || "",
            razorpay_order_id: razorpay_response?.razorpay_order_id || "",
            razorpay_signature: razorpay_response?.razorpay_signature || "",
            order_id: app_orderId,
            status: status,
        };

        try {
            await dispatch(fetchUpdatePaymentStatus({ params })).then(
                async (res: any) => {
                    if (res?.payload?.response?.status_code === 200) {
                        dispatch(fetchTotalCartQty({}));
                        if (status == Pay_Success) {
                            setStep(3)
                        } else {
                            setStep(1)
                            Error(res?.payload?.response?.message)
                        }
                    }
                }
            );
        } catch (error) {
        } finally {
            setStep(3)
            setLoading(false);
        }
    };

    if (cartLoading || cart_products?.length === 0) {
        return (
            <CircleLoader showLoadingTxt />
        );
    }


    return (
        <div>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {/* LEFT - Delivery Details Form */}
                <div className="lg:col-span-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
                    >
                        {/* Contact Information */}
                        <div className="mb-8">
                            <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-habimint-text mb-2">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        // onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter your full name"
                                        disabled
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-habimint-text mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            // onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="you@example.com"
                                            disabled
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-habimint-text mb-2">
                                            Phone Number (+91) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="10-digit number"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="mb-8">
                            <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                                Delivery Address
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-habimint-text mb-2">
                                        Address Line 1 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="House/Flat no., Building name"
                                    />
                                    {errors.addressLine1 && (
                                        <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>
                                    )}
                                </div>



                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-habimint-text mb-2">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.city ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="City"
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-habimint-text mb-2">
                                            State <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.state ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select State</option>
                                            {INDIAN_STATES.map((state) => (
                                                <option key={state} value={state}>
                                                    {state}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.state && (
                                            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-habimint-text mb-2">
                                            Pincode <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            maxLength={6}
                                            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="6 digits"
                                        />
                                        {errors.pincode && (
                                            <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Method */}
                        {/* <div>
                  <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                    Delivery Method
                  </h2>
                  <div className="space-y-3">
                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${formData.deliveryMethod === 'standard'
                        ? 'border-habimint-primary bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-habimint-primary"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-habimint-text">Standard Delivery</div>
                        <div className="text-sm text-habimint-text-light">3-5 business days</div>
                      </div>
                      <div className="font-bold text-habimint-text">
                        {subtotal >= 1499 ? 'Free' : '₹99'}
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${formData.deliveryMethod === 'express'
                        ? 'border-habimint-primary bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-habimint-primary"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-habimint-text">Express Delivery</div>
                        <div className="text-sm text-habimint-text-light">1-2 business days</div>
                      </div>
                      <div className="font-bold text-habimint-text">₹199</div>
                    </label>
                  </div>
                </div> */}
                    </motion.div>
                </div>

                {/* RIGHT - Order Summary */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-sm p-6 sticky top-24"
                    >
                        <h2 className="font-heading text-2xl font-bold text-habimint-text mb-6">
                            Order Summary
                        </h2>

                        {/* Cart Items */}
                        <div className="space-y-4 mb-6">
                            {cart_products.map((item) => (
                                <div key={item.product_id} className="flex gap-3">
                                    <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                        <Image
                                            src={item.image || '/images/fall-forward-hero.jpg'}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm text-habimint-text mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-xs text-habimint-text-light mb-1">Qty: {item.cart_qty}</p>
                                        <p className="text-sm font-bold text-habimint-primary">
                                            ₹{+item.numPrice * +item.cart_qty}

                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 pt-4 space-y-3 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-habimint-text-light">Subtotal</span>
                                <span className="font-semibold text-habimint-text">₹{cart_total?.sub_total}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-habimint-text-light">Discount</span>
                                <span className="font-semibold text-habimint-text">-  ₹{cart_total?.discount}</span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <span className="text-habimint-text-light">Delivery</span>
                                <span className="font-semibold text-habimint-text">
                                    {cart_total?.total > 1000 ? (
                                        <span className="text-green-600">Free</span>
                                    ) : (
                                        `₹${cart_total?.shipping}`
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <div className="flex justify-between">
                                <span className="font-heading text-xl font-bold text-habimint-text">Total</span>
                                <span className="font-heading text-2xl font-bold text-habimint-primary">
                                    ₹{cart_total?.total}
                                </span>
                            </div>
                        </div>

                        {/* Terms & Conditions Agreement */}
                        <div className="flex items-start gap-3 mb-3">
                            <input
                                type="checkbox"
                                id="terms-agree"
                                required
                                checked={agreedToTerms}
                                onChange={(e) => {
                                    setAgreedToTerms(e.target.checked);
                                    if (e.target.checked) setTermsError(null);
                                }}
                                className="mt-1 w-4 h-4 accent-[#2D5A27] cursor-pointer"
                            />
                            <label
                                htmlFor="terms-agree"
                                className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                            >
                                I have read and agree to the{' '}
                                <a
                                    href="/terms-condition"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2D5A27] underline font-medium"
                                >
                                    Terms &amp; Conditions
                                </a>{' '}
                                and{' '}
                                <a
                                    href="/privacy-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2D5A27] underline font-medium"
                                >
                                    Privacy Policy
                                </a>{' '}
                                of Habimint.
                            </label>
                        </div>
                        {termsError && (
                            <p className="text-sm text-red-600 mb-3" role="alert">
                                {termsError}
                            </p>
                        )}

                        {/* Place Order Button */}
                        <button
                            onClick={handlePlaceOrder}
                            disabled={placingOrder || !agreedToTerms}
                            className="w-full bg-habimint-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                        >
                            {placingOrder ? 'Placing Order...' : 'Place Order'}
                        </button>

                        {/* Payment Note */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                            <p className="text-sm text-yellow-800">
                                💰 We’re fully digital to save you from paper cuts and slow checkouts—we accept online payments only!
                            </p>
                            {/* TODO: Backend to integrate Razorpay here */}
                        </div>

                        {/* Trust Badges */}
                        <div className="space-y-2 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-xs text-habimint-text-light">
                                <Lock className="w-4 h-4 text-habimint-primary" />
                                Secure & encrypted checkout
                            </div>
                            {/* <div className="flex items-center gap-2 text-xs text-habimint-text-light">
                    <Truck className="w-4 h-4 text-habimint-primary" />
                    Tracked delivery to your doorstep
                  </div> */}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Checkout