import React from 'react'
import Agent from '../../../../assets/images/agent.jpg'
import Image from 'next/image'
import { CheckOutlined } from '@ant-design/icons'
import { Button } from '@/components'

export const SellYourSelf = () => {
  return (
    <div className="py-20 px-16 bg-light-cultured-3">
      <h1 className="text-dark-prussian-blue font-extrabold text-3xl">Sell Your Home Yourself</h1>
      <p className="mt-4 text-colors-cadet">
        Deciding to sell your home yourself is referred to as for-sale-by-owner (FSBO). The FSBO
        process is similar to traditional selling, but without the help of a real estate agent. In
        this case, you’re responsible for the home prep, marketing, showings, and negotiations.
      </p>

      <div className="mt-10 flex justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-bold mb-4 text-dark-prussian-blue text-xl">
              Why Sell Traditionally
            </h1>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <CheckOutlined className="text-primary" />
                <p>Potential for bidding wars</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckOutlined className="text-primary" />
                <p>Access to local market expertise</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckOutlined className="text-primary" />
                <p>Get help negotiating and reviewing offers</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckOutlined className="text-primary" />
                <p>Navigate a stressful process with a dedicated guide</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckOutlined className="text-primary" />
                <p>Potential for bidding wars</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckOutlined className="text-primary" />
                <p>Access to local market expertise</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckOutlined className="text-primary" />
                <p>Get help negotiating and reviewing offers</p>
              </div>
            </div>
          </div>

          <div>
            <button className="bg-primary py-4 px-10 rounded text-light-white flex justify-center items-center font-bold">
              Post Your Home For Sale
            </button>
          </div>
        </div>

        <div className="shadow-lg p-3 bg-colors-opal">
          <div className="relative h-[400px] w-[450px]">
            <Image src={Agent} alt="agent" fill />
          </div>
        </div>
      </div>
    </div>
  )
}
