import { Image } from 'antd'
import { Formik, Form } from 'formik'
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { HvButton, HvSelectInput, HvTextInput } from '@/components'
import { useRentalContext } from '../../context'
import { HvArrowRightIcon } from '@/assets/icons'
import HouseImg from '../../../../assets/images/property-1.jpg'

export const PropertyInfoStepOne = () => {
  const { setSubStep, setUpdatedRental, updatedRental } = useRentalContext()

  const handleNext = (val: any) => {
    setUpdatedRental({
      ...val,
    })
    setSubStep(2)
  }

  return (
    <div className="flex justify-between shadow-lg rounded-lg overflow-hidden bg-light-white">
      <div className="w-[50%]">
        <Formik
          initialValues={{
            squareFootage: updatedRental?.squareFootage,
            bedrooms: updatedRental?.bedrooms,
            bathrooms: updatedRental?.bathrooms,
          }}
          onSubmit={handleNext}
        >
          <Form className="px-10 pt-6">
            <h1 className="font-black text-2xl">Let's start creating your listing</h1>
            <p className="font-light text-sm mb-3">
              Add or review details about your property's size.
            </p>
            <div className="flex flex-col gap-5">
              <HvTextInput name="squareFootage" label="Square Footage" type="number" />
              <HvTextInput name="bedrooms" label="Total Bedrooms" type="number" />
              <HvTextInput name="bathrooms" label="Total Bathrooms" type="number" />
            </div>

            <div className="flex mt-6">
              <HvButton type="submit" paddingY="py-3" paddingX="px-6" fullWidth={false}>
                Next
                <HvArrowRightIcon />
              </HvButton>
            </div>
          </Form>
        </Formik>
      </div>

      <div className="w-[50%]">
        <Image src={HouseImg.src} width="100%" height="100%" />
      </div>
    </div>
  )
}
