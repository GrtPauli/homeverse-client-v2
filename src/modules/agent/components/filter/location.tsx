import { HvButton, ILocationInput, LocationSelector } from '@/components'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface IProps {
  location: ILocationInput
  setLocation: Dispatch<SetStateAction<ILocationInput>>
  handleFilter: () => void
}

export const LocationFilter: FC<IProps> = ({ location, setLocation, handleFilter }) => {
  return (
    <div className="w-[400px] mt-2">
      <div className="bg-colors-cadet/10 font-bold py-3 px-5">
        <h1>Location</h1>
      </div>

      <div className="px-5 py-3">
        <LocationSelector flexCol location={location} setLocation={setLocation} />

        <div className="mt-5">
          <HvButton onClick={() => handleFilter()} title="Apply" />
        </div>
      </div>
    </div>
  )
}
