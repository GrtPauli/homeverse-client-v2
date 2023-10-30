import { AppSelectInput, HvSelectInput, HvTextInput } from '@/components'
import Image from 'next/image'
import React from 'react'
import HouseInfo from '../../../../../assets/images/house-info.png'
import { Years, years } from '@/constants/Helper'
import { PropertySizeUnit } from '@/modules/listing/model'

const homeType: string[] = ['SINGLE_FAMILY', 'CONDO']

const lotUnit: string[] = ['ACRES', 'SQ_FT']

export const HomeFacts = () => {
  return (
    <div className="mb-10">
      {/* <div className="flex justify-between items-center border-t border-colors-cadet/70 border-b py-3 mb-5">
          <h1 className="text-dark-prussian-blue  font-extrabold text-xl">Home Facts</h1>
          <Image src={HouseInfo} alt="phone" width={30} height={50} />
        </div> */}
      <h1 className="font-bold text-lg border-b pb-3 mb-5">Home Facts</h1>

      {/* <div className="mt-5">
        <SelectInput isMulti isSearchable options={skills} name="skills" label='Home Type' placeholder="Select Your Home Type"/>
        </div> */}

      <div className="flex justify-between gap-8 mb-5 items-start">
        <HvSelectInput name="yearBuilt" label="Year Built" options={Years} />
        {/* <AppSelectInput options={years} name="yearBuilt" label="Year Built" /> */}
      </div>

      <div className="flex justify-between gap-8 mb-5 items-start">
        <HvTextInput
          label="Total Number of Bedrooms"
          name="bedrooms"
          placeHolder="Enter total number of bedrooms"
          type="number"
        />
        <HvTextInput
          label="Total Number of Bathrooms"
          name="bathrooms"
          placeHolder="Enter total number of full bathrooms"
          type="number"
        />
      </div>

      <div className="flex justify-between gap-8 mb-5">
        <HvTextInput
          label="Total Number of Rooms"
          name="totalRooms"
          placeHolder="Enter total number of rooms"
          type="number"
        />
        <HvTextInput
          label="Total Number of Garages"
          name="garages"
          placeHolder="Enter total number of garages"
          type="number"
        />
      </div>

      <div className="flex justify-between gap-8 mb-5">
        <HvTextInput
          label="Property Size"
          name="propertySize"
          placeHolder="Enter property size"
          type="number"
        />
        <HvSelectInput
          options={PropertySizeUnit}
          name="propertySizeUnit"
          label="Property Size Unit"
        />
      </div>

      <div className="flex justify-between gap-8 mb-5">
        <HvTextInput
          label="Basement sq. ft."
          name="basementSqFt"
          placeHolder="Enter basement size"
          type="number"
        />
        <HvTextInput
          label="Garage sq. ft."
          name="garageSqFt"
          placeHolder="Enter garage size"
          type="number"
        />
      </div>

      <div className="flex justify-between gap-8 mb-5">
        <HvTextInput label="Related Website" name="relatedWebsite" placeHolder="www.sample.com" />
        <HvTextInput label="Virtual Tour URL" name="virtualTourURL" placeHolder="www.sample.com" />
      </div>
    </div>
  )
}
