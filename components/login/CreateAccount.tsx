import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Chrome, Phone } from 'lucide-react';
import Link from 'next/link';
import { useFormik } from 'formik';
import useToast from '@/utils/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores';
import { fetchCreateAccountApi, handleOtpLoader } from '@/stores/profileSlice';
import { SignInStep_Int } from '@/interface/ProfileInt';
import * as Yup from "yup";
import { countryData } from '@/public/data/coountry';

interface InitialValues_Int {
    fullName: string | null;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    phone_code: string;
    phone_number: string;
}

const AuthSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Full Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
    terms: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions'),
    phone_number: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number is not valid')
        .required('Phone number is required')
});


const CreateAccount: React.FC<{ setStep: React.Dispatch<React.SetStateAction<SignInStep_Int>> }> = ({ setStep }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { Success } = useToast()
    const dispatch = useDispatch()
    const { otpLoader } = useSelector((state: RootState) => state.profileSlice)
    const [selectedCode, setSelectedCode] = useState({} as any);

    const initialValues: InitialValues_Int = {
        fullName: null,
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
        phone_code: "+91",
        phone_number: ""
    }

    const {
        values,
        handleSubmit,
        errors,
        setFieldValue,
        touched,
        setErrors,
        resetForm,
        handleChange
    } = useFormik({
        initialValues: initialValues,
        validationSchema: AuthSchema,
        onSubmit: (value: InitialValues_Int) => callLoginApi(value)
    });



    const callLoginApi = async (value: any) => {
        dispatch(handleOtpLoader(true))

        let params = {
            "email": value.email,
            "phone_code": value.phone_code,
            "phone_number": value.phone_number,
            "name": value.fullName,
            "password": value.password
        }

        let response = await fetchCreateAccountApi(params)

        if (response?.status_code === 200 && response?.data?.id) {
            Success(response?.message)
            setStep({
                mark: "OTP",
                userData: response?.data
            })
        }
        dispatch(handleOtpLoader(false))


    }



    return (
        <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="font-heading text-3xl font-bold text-habimint-text mb-2">
                Start Your Journey
            </h2>
            <p className="text-habimint-text-light mb-6">
                From Aham to Ananta — your transformation begins here
            </p>

            {/* Google Sign Up */}
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

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-habimint-text mb-2">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={values.fullName}
                            onChange={(e) => {
                                setFieldValue("fullName", e.target.value)
                            }}
                            className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Enter your full name"
                        />
                    </div>
                    {errors.fullName && touched.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName as string}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-habimint-text mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            value={values.email}
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
                        Phone
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Country Code Select */}
                        <select
                            value={values?.phone_code}
                            onChange={(e) => setFieldValue('phone_code', e.target.value)}
                            className={`w-full sm:w-[140px] px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.phone_code && touched.phone_code ? 'border-red-500' : 'border-gray-300'
                                } bg-white`}
                        >
                            <option value="">Select code</option>
                            {countryData.map((country) => (
                                <option key={country.phoneCode} value={country.phoneCode}>
                                    {country.flag} {country.phoneCode}
                                </option>
                            ))}
                        </select>

                        {/* Phone Number Input */}
                        <div className="relative flex-1">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                value={values.phone_number}
                                onChange={(e) => {
                                    setFieldValue("phone_number", e.target.value)
                                }}
                                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.phone_number && touched.phone_number ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="1234567890"
                            />
                        </div>
                    </div>

                    {/* Error Messages */}
                    {(errors.phone_code && touched.phone_code) || (errors.phone_number && touched.phone_number) ? (
                        <div className="mt-1 space-y-1">
                            {errors.phone_code && touched.phone_code && (
                                <p className="text-red-500 text-xs">{errors.phone_code as string}</p>
                            )}
                            {errors.phone_number && touched.phone_number && (
                                <p className="text-red-500 text-xs">{errors.phone_number as string}</p>
                            )}
                        </div>
                    ) : null}
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
                            placeholder="Min. 8 characters"
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

                <div>
                    <label className="block text-sm font-medium text-habimint-text mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={(e) => {
                                setFieldValue("confirmPassword", e.target.value)
                            }}
                            className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-habimint-primary ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.confirmPassword && touched.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword as string}</p>
                    )}
                </div>

                <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={values.terms}
                            onChange={(e) => {
                                setFieldValue("terms", e.target.checked)
                            }}
                            className="mt-1 w-4 h-4 text-habimint-primary rounded focus:ring-2 focus:ring-habimint-primary"
                        />
                        <span className="text-sm text-habimint-text-light">
                            I agree to the{' '}
                            <Link href="/terms" className="text-habimint-primary hover:underline">
                                Terms & Conditions
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-habimint-primary hover:underline">
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    {errors.terms && touched.terms && (
                        <p className="text-red-500 text-xs mt-1">{errors.terms as string}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={otpLoader}
                    className="w-full bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {otpLoader ? 'Creating account...' : 'Create Account'}
                </button>
            </form>
        </motion.div>
    )
}

export default CreateAccount