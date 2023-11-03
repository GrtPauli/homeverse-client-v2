import { CreateListingPage } from '@/modules'
import React from 'react'

interface IProps {
    listingId?: string
    clientId?: string
}

const CreateListing: React.FC<IProps> = ({ clientId, listingId }) => {
  return <CreateListingPage clientId={clientId} />
}

export default CreateListing

export async function getServerSideProps({ query, req }: any) {
    return {
      props: { clientId: query.clientId },
    }
} 