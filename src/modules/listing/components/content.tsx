import React from 'react'
import { ListItem } from './listitem2'
import { useListingContext } from '../context'
import { HvLoader2, ILocationInput } from '@/components'

export const Content = () => {
  const { getListings, filterLoading, listings } = useListingContext()

  return (
    <div className="gap-14 pb-36">
      <div className="px-10 w-full flex flex-col justify-center items-center mt-14">
        {filterLoading ? (
          <div>
            <HvLoader2 loading={filterLoading} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-10">
            {listings.map((item, i) => (
              <ListItem item={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
