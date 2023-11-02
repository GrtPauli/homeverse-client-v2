import { HvTextInput, RegularLayout } from '@/components'
import { Form, Formik, FormikProps } from 'formik'
import React from 'react'

const MakeOfferPage = () => {
  return (
    <div>
      <RegularLayout>
        <h1 className="font-extrabold text-3xl mb-1">Make an Offer</h1>
        <p className="text-sm text-colors-cadet mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid
          asperiores veniam quia nesciunt neque magni, eveniet nulla?
        </p>

        <div className="w-[100%] bg-light-white rounded-lg shadow-lg px-10 pt-8 pb-14">
          <Formik
            initialValues={{}}
            onSubmit={() => {}}
          >
            {(props: FormikProps<any>) => (
              <Form>
                <div className="flex justify-between gap-8 mb-5">
                  <HvTextInput
                    label="Offer Price"
                    name="offerPrice"
                    placeHolder="Enter Offer Price"
                    type="number"
                  /> 
                  
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </RegularLayout>
    </div>
  )
}

export default MakeOfferPage