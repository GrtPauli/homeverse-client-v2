import { HvGridIcon, HvRowsIcon, HvSearchIcon } from '@/assets/icons'
import HvSwitchInput from '@/components/input/switch'
import React, { useState } from 'react'

export const RentalFilter = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const [method, setMethod] = useState<'in-person' | 'video-call'>('in-person')

  return (
    <div className="flex justify-between border-b py-3 px-10 items-center">
      <div className="flex items-center gap-10">
        <HvSwitchInput setChecked={setChecked} checked={checked} label={`All (0)`} />
        <HvSwitchInput setChecked={setChecked} checked={checked} label={`For Rent (0)`} />
        <HvSwitchInput setChecked={setChecked} checked={checked} label={`Off Market (0)`} />
      </div>

      <div className="flex gap-2">
        <div className="w-[520px] relative">
          <input
            placeholder="Adress, School"
            name="search"
            className="bg-light-cultured-2 py-3 px-5 w-full rounded-full placeholder-slate-700"
          />

          <div className="absolute right-3 top-0 p-1 h-full">
            <button className="rounded-full h-full">
              <HvSearchIcon className="text-slate-700" />
            </button>
          </div>
        </div>

        <div className="bg-light-cultured-2 flex justify-between rounded-full overflow-hidden">
          <button
            onClick={() => setMethod('video-call')}
            className={`px-5 py-3 text-sm ${
              method == 'video-call'
                ? 'bg-primary text-light-white rounded-full'
                : 'text-slate-700'
            }`}
          >
            <HvGridIcon />
          </button>

          <button
            onClick={() => setMethod('in-person')}
            className={`px-5 py-3 text-sm ${
              method == 'in-person' ? 'bg-primary text-light-white rounded-full' : 'text-slate-700'
            }`}
          >
            <HvRowsIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
