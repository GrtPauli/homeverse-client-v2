import React from 'react'
import NoPhone from '../../../assets/images/no-phone.png'
import Image from 'next/image'

export const NoContacts = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 h-full">
      <Image src={NoPhone} alt="No Contacts" width={150} />
      <p className="text-center mt-5 text-[15px] leading-7">
        You currently have no contacts available.
        <br />
        Please check your requests to add contacts.
      </p>
    </div>
  )
}
