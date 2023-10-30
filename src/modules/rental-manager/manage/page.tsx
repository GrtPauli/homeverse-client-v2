import React, { useRef } from 'react'
import { CreateSteps } from './components'
import { HvArrowLeftIcon, HvArrowRightIcon } from '@/assets/icons'
import { HvButton, HvLoader } from '@/components'
import { Image } from 'antd'
import Logo from '../../../assets/images/Group 1.png'
import { useRentalContext } from '../context'
import { PropertyInfoStepOne } from './property-info/step-1'
import HouseImg from '../../../assets/images/property-1.jpg'
import { PropertyInfoStepTwo } from './property-info/step-2'
import { ListingDetailsStepOne } from './listing-details/step-1'
import { ListingDetailsStepTwo } from './listing-details/step-2'
import { ListingDetailsStepThree } from './listing-details/step-3'
import { LeaseStepOne } from './lease/step-1'
import { LeaseStepTwo } from './lease/step-2'
import { MediaStepOne } from './media/step-1'
import { MediaStepTwo } from './media/step-2'
import { AmenitiesStepOne } from './amenities/step-1'
import { AmenitiesStepTwo } from './amenities/step-2'
import { FinalDetailsStepOne } from './final-details/step-1'
import { FinalDetailsStepTwo } from './final-details/step-2'
import { FinalDetailsStepThree } from './final-details/step-3'
import { FinalDetailsStepFour } from './final-details/step-4'
import { Review } from './review'

const ManageRentalPage = () => {
  const { step, subStep, initLoading, rental } = useRentalContext()

  return (
    <>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}

      {!initLoading && (
        <div className="h-screen flex flex-col justify-between bg-light-cultured-3">
          <div className="bg-light-white py-1.5 px-12 flex justify-between items-center shadow-md fixed top-0 w-full z-50">
            <Image src={Logo.src} alt="logo" width={180} height={50} />

            <div className="flex justify-between w-[80%]">
              <div className="flex items-center gap-5">
                <h1 className="font-black text-lg leading-none">
                  {step == 0 && 'Property Info'}
                  {step == 1 && 'Listing Details'}
                  {step == 2 && 'Lease'}
                  {step == 3 && 'Media'}
                  {step == 4 && 'Amenities'}
                  {step == 5 && 'Final Details'}
                  {step == 6 && 'Review'}
                  {step == 7 && 'Publish'}
                </h1>
                <p className="font-light text-sm leading-none mt-0.5">
                  Step {step} of {subStep}
                </p>
              </div>

              <HvButton fullWidth={false}>Save and Exit</HvButton>
            </div>
          </div>
          <CreateSteps />

          <div className="px-10 h-full pt-[100px] overflow-scroll">
            <div className="py-10 flex flex-col w-full justify-center items-center">
              <div className="w-[90%]">
                {step == 0 && subStep == 1 && <PropertyInfoStepOne />}
                {step == 0 && subStep == 2 && <PropertyInfoStepTwo />}
                {step == 1 && subStep == 1 && <ListingDetailsStepOne />}
                {step == 1 && subStep == 2 && <ListingDetailsStepTwo />}
                {step == 1 && subStep == 3 && <ListingDetailsStepThree />}
                {step == 2 && subStep == 1 && <LeaseStepOne />}
                {step == 2 && subStep == 2 && <LeaseStepTwo />}
                {step == 3 && subStep == 1 && <MediaStepOne />}
                {step == 3 && subStep == 2 && <MediaStepTwo />}
                {step == 4 && subStep == 1 && <AmenitiesStepOne />}
                {step == 4 && subStep == 2 && <AmenitiesStepTwo />}
                {step == 5 && subStep == 1 && <FinalDetailsStepOne />}
                {step == 5 && subStep == 2 && <FinalDetailsStepTwo />}
                {step == 5 && subStep == 3 && <FinalDetailsStepThree />}
                {step == 5 && subStep == 4 && <FinalDetailsStepFour />}
                {step == 6 && <Review />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ManageRentalPage
