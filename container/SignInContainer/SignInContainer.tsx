import Login from '@/components/login/Login'
import OtpBox from '@/components/login/OtpBox'
import { SignInStep_Int } from '@/interface/ProfileInt'
import React, { useState } from 'react'

const SignInContainer = () => {

    const [step, setStep] = useState<SignInStep_Int>({
        mark: "LOGIN",
        userData: {} as any
    })


    return (
        <>
            {
                step.mark === "LOGIN" ?
                    <Login setStep={setStep} /> :
                    <OtpBox step={step} />
            }
        </>
    )
}

export default SignInContainer