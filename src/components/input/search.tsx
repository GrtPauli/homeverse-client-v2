import { HvSearchIcon } from '@/assets/icons'
import React from 'react'

interface IProps {
    small?: boolean
    color?: "light" | "alt-light"
}

export const HvSearchInput: React.FC<IProps> = ({ small, color }) => {
  return (
    <div className={`${small ? "w-[350px]" : "w-[520px]"} relative`}>
        <input
            placeholder="Adress, School"
            name="search"
            className={`bg-white shadow ${small ? "py-3 px-5" : "py-4 px-5"} w-full rounded-full placeholder-slate-700`}
        />

        <div className="absolute right-0 top-0 p-1 h-full">
            <button className={`bg-primary rounded-full flex items-center justify-center h-full ${small ? "py-3 px-3" : "py-3 px-4"}`}>
                <HvSearchIcon className={`text-white ${small && "w-5 h-5"}`} />
            </button>
        </div>
    </div>
  )
}