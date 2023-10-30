import { Image } from 'antd'
import { Formik, Form, FormikProps } from 'formik'
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { HvButton, HvSelectInput, HvTextInput } from '@/components'
import { useRentalContext } from '../../context'
import { HvArrowLeftIcon, HvArrowRightIcon } from '@/assets/icons'
import HouseImg from '../../../../assets/images/property-1.jpg'

export const PropertyInfoStepTwo = () => {
  const { setStep, setSubStep, updatedRental, setUpdatedRental } = useRentalContext()

  const handleNext = (val: any) => {
    setUpdatedRental({
      ...val,
    })
    setSubStep(1)
    setStep(1)
  }

  const handleBack = (val: any) => {
    setUpdatedRental({
      ...val,
    })
    setSubStep(1)
  }

  return (
    <div className="flex justify-between shadow-lg rounded-lg overflow-hidden bg-light-white">
      <div className="w-[50%]">
        <Formik
          initialValues={{
            description: updatedRental?.description,
          }}
          onSubmit={() => {}}
        >
          {(props: FormikProps<any>) => (
            <Form className="px-10 pt-6">
              <h1 className="font-black text-2xl">Describe the property</h1>
              <p className="font-light text-sm mb-3">
                Write several sentences describing the upgrades and desirable features that will
                attract renters to your property.
              </p>
              <div className="flex flex-col gap-5">
                <HvTextInput
                  textAreaRows={7}
                  name="description"
                  label="Property Description"
                  textarea
                />
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
