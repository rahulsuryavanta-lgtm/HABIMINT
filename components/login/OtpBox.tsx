import React, { useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { SignInStep_Int } from '@/interface/ProfileInt';
import { RootState } from '@/stores';
import { fetchVerifyOtpApi, handleOtpLoader } from '@/stores/profileSlice';

const AuthSchema = Yup.object().shape({
    otp: Yup.string()
        .length(4, 'OTP must be exactly 4 digits')
        .required('OTP is required'),
});

const OtpBox: React.FC<{ step: SignInStep_Int }> = ({ step }) => {

    const dispatch = useDispatch()
    const { otpLoader } = useSelector((state: RootState) => state.profileSlice)
    const initialValues = {
        customer_id: step?.userData?.id || 1,
        otp: '',
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
        onSubmit: (values) => callVerifyOtpApi(values)
    });

    const callVerifyOtpApi = async (params: any) => {
        dispatch(handleOtpLoader(true))
        await dispatch(fetchVerifyOtpApi({ params }))
    }


    return (
        <form onSubmit={handleSubmit}>

            <div className='w-full flex justify-center px-5 md:px-10 '>
                <div className='flex flex-col gap-y-3 items-center justify-center '>

                    <div className='flex flex-col gap-4'>

                        <>
                            <MuiOtpInput
                                value={values.otp}
                                length={4}
                                onChange={(newValue) => {
                                    setFieldValue("otp", newValue)
                                }}
                                sx={{
                                    '& .MuiTextField-root': {
                                        height: '48px',
                                        width: '48px',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        height: '48px',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '7.5px 13px !important',
                                        fontSize: '150%',
                                        color: errors.otp && touched.otp ? "#ef4444" : "#5A895B",
                                        borderRadius: "50%",
                                        background: errors.otp && touched.otp ? "#ef444421" : "#E8F1E9",

                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderRadius: "50%",
                                        borderColor: errors.otp && touched.otp ? "#ef4444 !important" : "#5A895B !important",
                                    }
                                }}
                                TextFieldsProps={{
                                    disabled: otpLoader
                                }}
                            />
                        </>

                        <button
                            type="submit"
                            disabled={otpLoader}
                            className="w-full bg-habimint-primary text-white py-3 rounded-full font-semibold hover:bg-opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {otpLoader ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>

                    {errors.otp && touched.otp && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.otp}
                        </div>
                    )}


                    <div>
                        <p className='text-primary-dark700 mt-[93px]'>
                            We sent an OTP to&nbsp;<span className='text-primary-dark750 font-semibold'>{step?.userData?.email}</span>, please verify to continue!
                        </p>
                    </div>
                </div>

            </div>
        </form>


    )


}

export default OtpBox