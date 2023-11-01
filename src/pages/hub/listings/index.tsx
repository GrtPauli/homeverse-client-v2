import { HvLoader } from '@/components'
import { HubLayout } from '@/components/layout/hub'
import { useAuthContext } from '@/modules/auth/context'
import { useListingContext } from '@/modules/listing/context'
import HubListingsPage from '@/modules/listing/hub/page'
import React, { useEffect } from 'react'

const Listings = () => {
  const { getUserListings, initLoading } = useListingContext()
  const { firebaseInitLoading } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getUserListings()
    }
  }, [firebaseInitLoading])
  
  return (
    <>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}

      {!initLoading && (
        <HubLayout 
            selectedKeys={["listings", "my-listings"]}
            headerTitle='Listings'
            headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
        >
            <HubListingsPage/>
        </HubLayout>
      )}
    </>
  )
}

export default Listings