import React from 'react'
import HouseImg from '../../../../assets/images/service-1.png'
import { Image } from 'antd'
import { HvButton } from '@/components'

export const NoRentals = () => {
  return (
    <div className="flex items-stretch justify-center h-full gap-10 py-5">
      <div className="flex flex-col items-start h-full">
        <div className="flex items-center gap-3">
          <Image src={HouseImg.src} width="200px" height="150px" />
          <h1 className="font-black text-2xl">
            Hi, Paul!
            <br /> Ready to add your property?
          </h1>
        </div>
        <p className="font-bold text-base mb-1">
          Providing some basic information is the first step.
        </p>
        <p className="font-light text-sm leading-loose mb-10">
          Once you find a renter for your listing, you can screen them,
          <br /> sign the lease, and collect rent — entirely on
          <span className="font-bold inline ml-1">"Homeverse Rental Manager".</span>
        </p>
        <HvButton fullWidth={false} title="Add a Property" />
      </div>

      <div className="border w-[400px]"></div>
    </div>
  )
}
