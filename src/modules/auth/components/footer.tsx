import React from 'react'
import GoogleIcon from '../../../assets/images/google.png'
import Image from 'next/image'
import { HvAppleIcon, HvFacebookIcon, HvTwitterIcon } from '@/assets/icons'
import { useAuthContext } from '../context'

export const FormFooter = ({ id }: any) => {
  const { authenticateWithTwitter, loading, authenticateWithFacebook } = useAuthContext()

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-5">
        <button
          onClick={() => authenticateWithFacebook()}
          className="w-full py-3 bg-blue-800 text-light-white rounded-full px-5 gap-3 text-[13px] flex justify-center items-center font-semibold"
        >
          <HvFacebookIcon />
          <p>Continue With Facebook</p>
        </button>

        <button className="w-full py-3 bg-black text-light-white rounded-full px-5 gap-3 text-[13px] flex justify-center items-center font-semibold">
          <HvAppleIcon />
          <p>Continue With Apple</p>
        </button>

        <button
          onClick={() => authenticateWithTwitter(id)}
          className="w-full py-3 bg-blue-400 text-light-white rounded-full px-5 gap-3 text-[13px] flex justify-center items-center font-semibold"
        >
          <HvTwitterIcon />
          <p>Continue With Twitter</p>
        </button>
      </div>
    </div>
  )
}
