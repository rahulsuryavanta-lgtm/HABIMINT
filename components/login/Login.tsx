import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Chrome } from 'lucide-react';
import Link from 'next/link';
import { useFormik } from "formik";
import * as Yup from "yup";
import { FORMS_MESSAGE } from '@/lib/constants/GlobalConstant';
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginApi, handleOtpLoader } from '@/stores/profileSlice';
import { SignInStep_Int } from '@/interface/ProfileInt';
import { RootState } from '@/stores';

const AuthSchema = Yup.object().shape({
    email: Yup.string()
        .email(FORMS_MESSAGE.INVALID_EMAIL)
        .required(FORMS_MESSAGE.EMAIL_REQUIRED),
    password: Yup.string().required(FORMS_MESSAGE.PASSWORD_REQUIRED),
});

interface LoginValues {
    email: string;
    password: string;
}



const Login: React.FC<{
    setStep: React.Dispatch<React.SetStateAction<SignInStep_Int>>;
}> = ({ setStep }) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { otpLoader } = useSelector((state: RootState) => state.profileSlice);


    const initialValues = {
        email: "",
        password: "",
    };

    const {
        values,
        handleSubmit,
        errors,
        setFieldValue,
        touched,
        setErrors,
        resetForm,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: AuthSchema,
        onSubmit: (values) => callLoginApi(values),
    });

    const callLoginApi = async (value: LoginValues): Promise<void> => {
        dispatch(handleOtpLoader(true));

        const response = await fetchLoginApi(value);
        if (response?.status_code === 200) {
            dispatch(handleOtpLoader(false));

            setStep({
                mark: "OTP",
                userData: response?.data,
            });
        }
        dispatch(handleOtpLoader(false));
    };

    return (
        <motion.div
            key="signin"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="font-heading text-3xl font-bold text-habimint-text mb-2">
                Welcome Back
            </h2>
            <p className="text-habimint-text-light mb-6">
                Continue your journey from Aham to Ananta
            </p>

            {/* Google Sign In */}
            <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}customer/auth/google`}
                className="w-full h-full"
            >

                <button
                    className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-full font-semibold text-habimint-text hover:bg-gray-50 transition mb-6"
                >
                    <Chrome className="w-5 h-5" />
                    Continue with Google
                </button>
            </Link>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-sm text-habimint-text-light">or continue with email</span>
                <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-habimint-text mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            value={values?.email}
                            onChange={(e) => {
                                setFieldValue("email", e.target.value)
                            }}
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="you@example.com"
                        />
                    </div>
                    {errors.email && touched.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email as string}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-habimint-text mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={(e) => {
                                setFieldValue("password", e.target.value)
                            }}
                            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && touched.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password as string}</p>
                    )}
                </div>

                {/* <div className="text-right">
                    <Link
                        href="/forgot-password"
                        className="text-sm text-habimint-primary hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div> */}

                <button
                    type="submit"
                    disabled={otpLoader}
                    className="w-full bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {otpLoader ? 'Sending OTP...' : 'Send OTP'}
                </button>
            </form>
        </motion.div>
    )
}

export default Login