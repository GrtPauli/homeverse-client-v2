import { HubLayout } from '@/components/layout/hub'
import HubListingsPage from '@/modules/listing/hub/page'
import React from 'react'

const Listings = () => {
  return (
    <HubLayout 
        selectedKeys={["listings", "my-listings"]}
        headerTitle='Listings'
        headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
    >
        <HubListingsPage/>
    </HubLayout>
  )
}

export default Listings