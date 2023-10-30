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
import { AgentHubLayout } from '@/components/layout/hub'
import { useListingContext } from '../context'
import { useAuthContext } from '@/modules/auth/context'
import { useRouter } from 'next/router'
import { ListingForm } from './components'

export const CreateListingPage = ({ id }: any) => {
  const [country, setCountry] = useState<any>(null)
  const [countryFlag, setCountryFlag] = useState<any>(null)
  const [state, setState] = useState<any>(null)
  const [city, setCity] = useState<any>(null)
  const [photos, setPhotos] = useState<IListingImage[]>([])
  const { createListing, loading, initLoading, getListing, listing, updateListing } =
    useListingContext()
  const { firebaseAuth } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (id) {
      getListing(id)
    }
  }, [])

  return (
    <>
      {id ? (
        initLoading && (
          <div className="flex h-screen w-full justify-center items-center">
            <HvLoader loading={initLoading} size="lg" />
          </div>
        )
      ) : (
        <></>
      )}

      {id ? (
        !initLoading && (
          <AgentHubLayout>
            <ListingForm id={id} />
          </AgentHubLayout>
        )
      ) : (
        <AgentHubLayout>
          <ListingForm id={id} />
        </AgentHubLayout>
      )}
    </>
  )
}
