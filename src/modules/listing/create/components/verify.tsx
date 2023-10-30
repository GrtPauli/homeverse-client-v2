import { Button } from '@/components'
import React, { useState } from 'react'
import OTPInput from 'react-otp-input'

export const VerifyContact = () => {
  const [otp, setOtp] = useState('')

  const handleVerify = () => {}

  return (
    <div>
      <h1 className="font-extrabold text-2xl mb-2">Verify Contact Number</h1>
      <p className="mb-8 text-sm text-colors-cadet">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam, blanditiis repudiandae
        inventore quos.
      </p>

      <div className="flex flex-col justify-center items-center">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="mr-[20px]">-</span>}
          renderInput={(props) => <input {...props} />}
          inputType="tel"
          shouldAutoFocus={true}
          inputStyle={{
            borderRadius: 3,
            borderWidth: 1,
            borderColor: 'rgb(139 177 177 / 0.4)',
            outline: 'none',
            width: '50px',
            height: '50px',
            marginRight: '20px',
            // marginLeft: "20px"
          }}
        />

        <div className="mt-10">
          <button className="text-primary ">Send OTP to +2349134102236</button>
        </div>
      </div>

      <div className="flex justify-end items-center gap-5 mt-8">
        <Button onClick={() => setOtp('')} type="button" title="Clear OTP" fullWidth={false} />
        <Button onClick={() => handleVerify()} title="Verify OTP" fullWidth={false} />
      </div>
    </div>
  )
}
