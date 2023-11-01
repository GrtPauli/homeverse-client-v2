import React, { useEffect } from 'react'
import { CreateCard } from './components'
import { useListingContext } from '../context'
import { useAuthContext } from '@/modules/auth/context'
import { HvLoader } from '@/components'
import { ListItem } from '../components'

const HubListingsPage = () => {
  const { getUserListings, initLoading, listings } = useListingContext()
  const { firebaseInitLoading } = useAuthContext()

  // useEffect(() => {
  //   if (firebaseInitLoading == false) {
  //     getUserListings()
  //   }
  // }, [firebaseInitLoading])

  return (
    <div className='h-full'>
      {!initLoading && listings.length > 0 ? (
        <div className="bg-light-cultured-3 grid grid-cols-4 place-content-center place-items-center px-[30px]">
          {listings.map((item, i) => (
            <ListItem detailUrl={`/hub/listings/${item.id}`} item={item} key={i} />
          ))}
        </div>
      ) : <CreateCard/>}
    </div>
  )
}

export default HubListingsPage