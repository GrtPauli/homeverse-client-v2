import React from 'react'
import { NewListings } from './new-litings'
import { AffordableHomes } from './affordable-homes'
import { LuxuryHomes } from './luxury-homes'

export const BuyTabContent = () => {
  return (
    <div>
      <NewListings />
      <AffordableHomes />
      <LuxuryHomes />
    </div>
  )
}
