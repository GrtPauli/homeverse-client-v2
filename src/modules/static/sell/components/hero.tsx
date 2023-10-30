import React from 'react'
import { Carousel, ConfigProvider } from 'antd'
import { ChevronRightIcon } from '@/assets/icons'

export const Hero = () => {
  return (
    <div className="relative">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '',
          },
        }}
      >
        <div className="relative">
          <Carousel dots={false} autoplay swipeToSlide dotPosition="left" pauseOnHover={false}>
            <div className="hero-s bg-center bg-cover h-[510px] w-full slide-1" />
            <div className="hero-s bg-center bg-cover h-[510px] w-full slide-2" />
            <div className="hero-s bg-center bg-cover h-[510px] w-full slide-3" />
            <div className="hero-s bg-center bg-cover h-[510px] w-full slide-4" />
            <div className="hero-s bg-center bg-cover h-[510px] w-full slide-5" />
          </Carousel>

          <div className="top-0 absolute w-full h-full bg-dark-jungle-green/70 flex justify-center items-center">
            <div className="text-light-white text-center">
              <div>
                <h1 className="font-extrabold text-5xl mb-5">Buy & Sell Real Estate with Web3</h1>
                <p className="">
                  Find your dream house by us, empowered with blockchain technology for easier,
                  <br />
                  faster & more secure transactions.
                </p>
              </div>

              <div className="mt-5">
                <div className="flex gap-5 justify-center items-center">
                  {/* <button className='bg-primary text-light-white rounded-md px-8 py-4 font-bold'>
                                    I'm an Agent
                                </button> */}

                  <button className="bg-dark-prussian-blue text-light-white rounded-md px-8 py-4 font-bold">
                    I'm a Seller
                  </button>

                  <button className="bg-primary text-light-white rounded-md px-8 py-4 font-bold">
                    I'm a Buyer
                  </button>
                </div>

                <div className="text-light-white justify-center mt-5 flex items-center">
                  <p className="">I'm Just Curious</p>
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
    </div>
  )
}
