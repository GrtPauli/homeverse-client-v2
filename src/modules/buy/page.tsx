import { RegularLayout } from '@/components'
import React from 'react'
import { Hero } from '../home/components'
import BgImg from '../../assets/images/buy-h.jpg'

export const BuyPage = () => {
  return (
    <>
      <RegularLayout className="pt-[100px]">
        <Hero
          bgImg={BgImg}
          title={
            <>
              The #1 site real estate <br /> professionals trust
            </>
          }
          tab="1"
        />
      </RegularLayout>
    </>
  )
}
