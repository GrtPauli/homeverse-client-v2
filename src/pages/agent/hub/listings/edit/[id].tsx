import { CreateListingPage } from '@/modules'
import { ListingDetailPage } from '@/modules/listing/details'
import React from 'react'

const EditListing = ({ id }: any) => {
  return <CreateListingPage id={id} />
}

export default EditListing

export async function getServerSideProps({ query, req }: any) {
  return {
    props: { id: query.id },
  }
}
