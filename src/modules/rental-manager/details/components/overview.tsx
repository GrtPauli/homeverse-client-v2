import { HvButton } from '@/components'
import React from 'react'

export const RentalOverview = () => {
  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex flex-col gap-10">
        <div className="bg-white shadow-lg rounded-xl w-full p-8 pt-5">
          <div className="flex justify-between">
            <h1 className="font-black text-xl">Payments</h1>
            <HvButton paddingY="py-2.5" fullWidth={false} title="Details" />
          </div>

          <div className="border rounded-xl p-5 mt-5">
            <h1 className="font-bold text-base">Upcoming payments will appear here</h1>
            <p className="text-sm">Set up payments</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl w-full p-8 pt-5">
          <div className="flex justify-between">
            <h1 className="font-black text-xl">Leases</h1>
            <HvButton paddingY="py-2.5" fullWidth={false} title="Details" />
          </div>

          <div className="border rounded-xl p-5 mt-5">
            <h1 className="font-bold text-base">Active leases will appear here</h1>
            <p className="text-sm">Upload a lease</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl w-full p-8 pt-5"></div>
    </div>
  )
}
