import { HvButton } from '@/components'
import Link from 'next/link'
import React from 'react'
import {BsFillHouseAddFill} from "react-icons/bs"

export const CreateCard = () => {
  return (
    <div className='h-full w-full rounded-lg shadow-lg bg-light-white flex flex-col items-center justify-center gap-3 px-8 py-10'>
      <BsFillHouseAddFill className='text-7xl text-colors-cadet'/>
      <p className='text-center mb-5'>Generate an offer link by adding a listing.</p>
      <Link href="/hub/listings/create">
        <HvButton title="Create New Listing"/>
      </Link>
    </div>
  )
} 