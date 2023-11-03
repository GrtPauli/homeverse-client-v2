import {
  ApFileInput,
  AppSelectInput,
  HvButton,
  LocationSelector,
  HvTextInput,
  HvLoader,
} from '@/components'
import { Form, Formik, FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { HomeType, IListingImage } from '@/modules/listing/model'
import { AgentHubLayout } from '@/components/layout/hub2'
import { useListingContext } from '../context'
import { useAuthContext } from '@/modules/auth/context'
import { useRouter } from 'next/router'
import { ListingForm } from './components'
import { HubLayout } from '@/components/layout/hub'

interface IProps {
  listingId?: string
  clientId?: string
}

export const CreateListingPage: React.FC<IProps> = ({ clientId, listingId }) => {
  const [country, setCountry] = useState<any>(null)
  const [countryFlag, setCountryFlag] = useState<any>(null)
  const [state, setState] = useState<any>(null)
  const [city, setCity] = useState<any>(null)
  const [photos, setPhotos] = useState<IListingImage[]>([])
  const { clientForListing, getClientForListing, initLoading, getListing, listing, updateListing } = useListingContext()
  const { firebaseInitLoading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      if (listingId) {
        getListing(listingId)
      } else if(clientId) {
        getClientForListing(clientId)
      }    
    }
  }, [firebaseInitLoading])

  return (
    <>
      {clientId || listingId ? (
        initLoading && (
          <div className="flex h-screen w-full justify-center items-center">
            <HvLoader loading={initLoading} size="lg" />
          </div>
        )
      ) : (
        <></>
      )}

      {clientId || listingId ? (
        !initLoading && (
          <HubLayout
              selectedKeys={["listings", "create-listing"]}
              headerTitle={
                clientId ? `Create Listing for ${clientForListing.client.displayName}`
                : "Create Listing"
              }
              headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
          >
            <ListingForm id={listingId} />
          </HubLayout>
        )
      ) : (
        <HubLayout
            selectedKeys={["listings", "create-listing"]}
            headerTitle='Create Listing'
            headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
        >
          <ListingForm id={listingId} />
        </HubLayout>
      )}
    </>
  )
}