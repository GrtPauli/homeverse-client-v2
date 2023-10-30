import { RentalManagerLayout } from '@/components/layout/rental-manager'
import React from 'react'
import { RentalOverview, RentalDetailHeader } from './components'

export const RentalDetailPage = () => {
  return (
    <>
      <RentalManagerLayout containerClassName="bg-light-cultured-3 h-full pt-[100px] pb-[100px]- px-12-">
        <RentalDetailHeader />
        <div className="py-10 px-12">
          <RentalOverview />
        </div>
      </RentalManagerLayout>
    </>
  )
}
