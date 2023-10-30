import React from 'react'
import HouseImg from '../../../../assets/images/slide-3.jpg'
import { Image } from 'antd'
import { RentalMenu } from './menu'

export const RentalDetailHeader = () => {
  return (
    <div className="w-full pt-10 shadow bg-white">
      <div className="px-12">
        <div className="flex items-center gap-8">
          <Image
            src={HouseImg.src}
            width="230px"
            height="150px"
            className="object-cover rounded-xl"
          />
          <div className="flex flex-col items-start gap-2">
            <h1 className="font-black text-4xl">Condo</h1>
            <p>Abuja, Kuje, 900110</p>
            <div className="bg-primary rounded-full text-white py-1 px-3 text-xs font-bold">
              Off Market
            </div>
          </div>
        </div>
      </div>

      <RentalMenu />
    </div>
  )
}
