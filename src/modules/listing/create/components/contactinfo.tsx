import { HvTextInput } from '@/components'
import Image from 'next/image'
import React from 'react'
import PhoneImg from '../../../../../assets/images/phone.png'

export const ContactInfo = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center border-t border-colors-cadet/70 border-b py-3 mb-5">
        <h1 className="text-dark-prussian-blue  font-extrabold text-xl">Contact Information</h1>
        <Image src={PhoneImg} alt="phone" width={30} height={50} />
      </div>

      <p className="text-sm text-colors-cadet mb-5 leading-7">
        Potential buyers will contact you through the email address you use to register on Zillow.
        You must also add your phone number to the listing here.
      </p>

      <HvTextInput label="Phone Number" name="description" />
    </div>
  )
}
