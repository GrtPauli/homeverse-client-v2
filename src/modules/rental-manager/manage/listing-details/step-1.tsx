import { Formik, Form, FormikProps } from 'formik'
import React from 'react'
import { HvButton, HvSelectInput, HvTextInput } from '@/components'
import { useRentalContext } from '../../context'
import { HvArrowLeftIcon, HvArrowRightIcon } from '@/assets/icons'
import HouseImg from '../../../../assets/images/property-1.jpg'
import { Image } from 'antd'

export const ListingDetailsStepOne = () => {
  const { setStep, setSubStep, updatedRental, setUpdatedRental } = useRentalContext()

  const handleNext = (val: any) => {
    setUpdatedRental({
      ...val,
    })
    setSubStep(2)
  }

  const handleBack = (val: any) => {
    setUpdatedRental({
      ...val,
    })
    setSubStep(2)
    setStep(0)
  }

  return (
    <div className="flex justify-between shadow-lg rounded-lg overflow-hidden bg-light-white">
      <div className="w-[50%]">
        <Formik
          initialValues={{
            monthlyRent: updatedRental?.monthlyRent,
          }}
          onSubmit={() => {}}
        >
          {(props: FormikProps<any>) => (
            <Form className="px-10 py-6 flex flex-col justify-between h-full">
              <div>
                <h1 className="font-black text-2xl">How much is the monthly rent?</h1>
                <p className="font-light text-sm mb-3">
                  Add or review details about your property's size.
                </p>
                <div className="flex flex-col gap-5">
                  <HvTextInput name="monthlyRent" label="Monthly Rent" />
                </div>

                <p className="font-light text-sm leading-loose mt-5">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae placeat rerum vel
                  voluptas voluptates asperiores deleniti voluptatum vero, fugiat repellat
                  necessitatibus magnam nemo nostrum sint cumque mollitia nihil molestiae veniam
                  excepturi a, autem porro? Itaque aliquam corporis ipsum facere ipsam, voluptas
                  alias natus nemo esse eaque delectus commodi enim aspernatur.
                </p>
              </div>

              <div className="flex mt-3 gap-3">
                <HvButton
                  btnLight
                  paddingY="py-3"
                  paddingX="px-6"
                  fullWidth={false}
                  onClick={() => {
                    handleBack(props.values)
                  }}
                >
                  <HvArrowLeftIcon />
                  Back
                </HvButton>

                <HvButton
                  paddingY="py-3"
                  paddingX="px-6"
                  fullWidth={false}
                  onClick={() => {
                    handleNext(props.values)
                  }}
                >
                  Next
                  <HvArrowRightIcon />
                </HvButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="w-[50%]">
        <Image src={HouseImg.src} width="100%" height="100%" />
      </div>
    </div>
  )
}
