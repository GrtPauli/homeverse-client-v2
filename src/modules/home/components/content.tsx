import React from 'react'
import { Hero } from './hero'
import HouseImg from '../../../assets/images/buy-h.jpg'

export const HomeContent = () => {
  return (
    <div>
      <Hero
        bgImg={HouseImg}
        title={
          <>
            The #1 site real estate <br /> professionals trust
          </>
        }
        tab="0"
      />
    </div>
  )
}
