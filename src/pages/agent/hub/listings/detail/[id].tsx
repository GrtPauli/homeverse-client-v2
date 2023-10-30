import { ListingDetailPage } from '@/modules/listing/details'
import React from 'react'

const ListingDetails = ({ id }: any) => {
  return <ListingDetailPage id={id} agent />
}

export default ListingDetails

export async function getServerSideProps({ query, req }: any) {
  return {
    props: { id: query.id },
  }
}
