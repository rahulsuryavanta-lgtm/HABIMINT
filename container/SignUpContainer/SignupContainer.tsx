
import CreateAccount from '@/components/login/CreateAccount'
import OtpBox from '@/components/login/OtpBox'
import { SignInStep_Int } from '@/interface/ProfileInt'
import React, { useState } from 'react'

const SignupContainer = () => {

    const [step, setStep] = useState<SignInStep_Int>({
        mark: "LOGIN",
        userData: {} as any
    })


    return (
        <>
            {
                step.mark === "LOGIN" ?
                    <CreateAccount setStep={setStep} /> :
                    <OtpBox step={step} />
            }
        </>
    )
}

export default SignupContainer