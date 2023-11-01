import { HvLoader } from '@/components'
import { HubLayout } from '@/components/layout/hub'
import { useAuthContext } from '@/modules/auth/context'
import { useListingContext } from '@/modules/listing/context'
import { ListingDetailPage } from '@/modules/listing/details'
import HubListingDetailPage from '@/modules/listing/hub/detail'
import React, { useEffect } from 'react'

const ListingDetail = ({ id }: any) => {
    const { initLoading, getListing, listing } = useListingContext()
    const { firebaseInitLoading } = useAuthContext()
  
    useEffect(() => {
      if (firebaseInitLoading == false) {        
        getListing(id)
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
                    selectedKeys={["listings"]}
                    headerTitle='Listing Detail'
                    headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
                >
                    <HubListingDetailPage />
                </HubLayout>
            )}
        </>
    )
}

export default ListingDetail

export async function getServerSideProps({ query, req }: any) {
    return {
      props: { id: query.id },
    }
} 