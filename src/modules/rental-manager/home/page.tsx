import { RentalManagerLayout } from '@/components/layout/rental-manager'
import React from 'react'
import { RentalManagerHero } from './components'

const RentalManagerPage = () => {
  return (
    <RentalManagerLayout containerClassName="py-[100px]">
      <RentalManagerHero />
    </RentalManagerLayout>
  )
}

export default RentalManagerPage
