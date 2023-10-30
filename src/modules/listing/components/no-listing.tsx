import React from 'react'
import { Image } from 'antd'
import NoHome from '../../../assets/images/no-home (1).png'
import { HvButton } from '@/components'
import Link from 'next/link'

export const NoListing = () => {
  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center py-16">
      <div className="h-[150px] w-[150px]">
        <Image
          preview={false}
          className="object-cover"
          width="100%"
          height="100%"
          src={NoHome.src}
        />
      </div>
      <p>You currently have no listings, click the button below to create a new listing.</p>

      <div className="w-[200px]">
        <Link href="/dashboard/listings/create">
          <HvButton title="Create New Listing" />
        </Link>
      </div>
    </div>
  )
}
