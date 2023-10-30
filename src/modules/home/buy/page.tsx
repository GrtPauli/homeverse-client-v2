import { RegularLayout } from '@/components'
import React from 'react'
import { Hero } from '../components'
import HouseImg from '../../../assets/images/armchair-black-living-room-with-copy-space.jpg'
import { AffordableHomes, LuxuryHomes, NewListings } from './components'

const BuyPage = () => {
  return (
    <RegularLayout className="pt-[100px]">
      <Hero
        bgImg={HouseImg}
        title={
          <>
            Purchase Your Dream <br /> Home Here
          </>
        }
        selectedKey="buy"
      />

      <NewListings />
      <AffordableHomes />
      <LuxuryHomes />
    </RegularLayout>
  )
}

export default BuyPage
