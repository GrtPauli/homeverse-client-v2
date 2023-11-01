import { HubLayout } from '@/components/layout/hub'
import { CreateListingPage } from '@/modules'
import React from 'react'

const CreateListing = () => {
  return (
    <HubLayout
        selectedKeys={["listings", "create-listing"]}
        headerTitle='Create Listing'
        headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
    >
        <CreateListingPage />
    </HubLayout>
  )
}

export default CreateListing