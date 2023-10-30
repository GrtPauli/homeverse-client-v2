import { RegularLayout } from '@/components'
import React from 'react'
import { Hero } from '../components'
import HouseImg from '../../../assets/images/buy.jpg'
import { NewRentalListings } from './components'

const RentPage = () => {
  return (
    <RegularLayout className="pt-[100px]">
      <Hero
        bgImg={HouseImg}
        title={
          <>
            Discover Your Perfect <br /> Rental Here
          </>
        }
        selectedKey="rent"
      />
      <NewRentalListings />
    </RegularLayout>
  )
}

export default RentPage
