import { Formik, Form, FormikProps } from 'formik'
import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { HvButton, HvSelectInput, HvTextInput } from '@/components'
import { useRentalContext } from '../../context'
import { HvArrowLeftIcon, HvArrowRightIcon } from '@/assets/icons'
import HouseImg from '../../../../assets/images/property-1.jpg'
import { Image } from 'antd'

export const LeaseStepTwo = () => {
  const { setStep, setSubStep, updatedRental, setUpdatedRental } = useRentalContext()

  const handleNext = (val: any) => {
    setUpdatedRental({
      ...val,
    })
    setSubStep(1)
    setStep(3)
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
            leaseTerms: updatedRental?.leaseTerms,
          }}
          onSubmit={() => {}}
        >
          {(props: FormikProps<any>) => (
            <Form className="px-10 pt-6">
              <h1 className="font-black text-2xl">
                What should renters know about the lease terms?
              </h1>
              <p className="font-light text-sm mb-3">
                Share details that can be deal breakers, or deal makers, for renters.
              </p>
              <div className="flex flex-col gap-5">
                <HvTextInput textAreaRows={7} name="leaseTerms" label="Lease Terms" textarea />
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
