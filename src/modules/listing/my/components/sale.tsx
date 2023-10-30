import React from 'react'
import { useListingContext } from '../../context'
import { ListingItem } from './item'
import { NoListing } from '../../components'

export const SaleListings = () => {
  const { userListings } = useListingContext()

  return (
    <div className="min-h-[200px]">
      {userListings.length > 0 ? (
        <div className="py-5 flex gap-10">
          {userListings.map((item, i) => (
            <ListingItem item={item} key={i} />
          ))}
        </div>
      ) : (
        <NoListing />
      )}
    </div>
  )
}
