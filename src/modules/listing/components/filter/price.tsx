import { HvButton, HvTextInput } from '@/components'
import { Form, Formik } from 'formik'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface IProps {
  priceRange: { min: number; max: number }
  setPriceRange: Dispatch<SetStateAction<{ min: number; max: number }>>
  handleFilter: () => void
}

export const PriceRangeFilter: FC<IProps> = ({ handleFilter, priceRange, setPriceRange }) => {
  return (
    <div className="w-[400px] mt-2">
      <div className="bg-colors-cadet/10 font-bold py-3 px-5">
        <h1>Price Range</h1>
      </div>

      <div className="px-5 py-3">
        <Formik
          initialValues={{
            min: null,
            max: null,
          }}
          onSubmit={() => handleFilter()}
        >
          <Form>
            <div className="flex flex-col gap-5">
              <HvTextInput
                onChange={(val) => setPriceRange({ ...priceRange, min: parseInt(val) })}
                type="number"
                name="min"
                label="Minimum"
              />
              <HvTextInput
                onChange={(val) => setPriceRange({ ...priceRange, max: parseInt(val) })}
                type="number"
                name="max"
                label="Maximum"
              />
            </div>

            <div className="mt-5">
              <HvButton type="submit" title="Apply" />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
