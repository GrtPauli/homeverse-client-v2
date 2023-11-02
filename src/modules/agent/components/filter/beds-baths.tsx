import { HvButton } from '@/components'
import { Dispatch, FC, SetStateAction, useState } from 'react'

interface IProps {
  bedsAndBaths: { bedrooms: string; bathrooms: string }
  setBedsAndBaths: Dispatch<SetStateAction<{ bedrooms: string; bathrooms: string }>>
  handleFilter: () => void
}

export const BedsAndBathsFilter: FC<IProps> = ({
  bedsAndBaths,
  setBedsAndBaths,
  handleFilter,
}) => {
  return (
    <div className="w-[400px] mt-2">
      <div className="bg-colors-cadet/10 font-bold py-3 px-5">
        <h1>Number of Bedrooms</h1>
      </div>

      <div className="px-5 py-3 mb-2">
        <p className="mb-2">Bedrooms</p>

        <div className="bg-light-cultured-2 flex justify-between rounded-full overflow-hidden">
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bedrooms"
            value="Any"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bedrooms"
            value="1"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bedrooms"
            value="2"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bedrooms"
            value="3"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bedrooms"
            value="4"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bedrooms"
            value="5"
          />
        </div>
      </div>

      <div className="bg-colors-cadet/10 font-bold py-3 px-5">
        <h1>Number of Bathrooms</h1>
      </div>

      <div className="px-5 pt-3">
        <p className="mb-2">Bathrooms</p>

        <div className="bg-light-cultured-2 flex justify-between rounded-full overflow-hidden">
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bathrooms"
            value="Any"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bathrooms"
            value="1"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bathrooms"
            value="2"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bathrooms"
            value="3"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bathrooms"
            value="4"
          />
          <Item
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
            type="bathrooms"
            value="5"
          />
        </div>
      </div>

      <div className="mt-5 px-5 pb-3">
        <HvButton onClick={() => handleFilter()} title="Apply" />
      </div>
    </div>
  )
}

interface ItemProps {
  value: string
  type: 'bathrooms' | 'bedrooms'
  bedsAndBaths: { bedrooms: string; bathrooms: string }
  setBedsAndBaths: Dispatch<SetStateAction<{ bedrooms: string; bathrooms: string }>>
}

const Item: FC<ItemProps> = ({ bedsAndBaths, setBedsAndBaths, type, value }) => {
  return (
    <button
      onClick={() => setBedsAndBaths({ ...bedsAndBaths, [type]: value })}
      className={`py-2 text-xs px-5 ${
        type == 'bathrooms'
          ? bedsAndBaths.bathrooms == value && 'bg-primary text-light-white rounded-full'
          : bedsAndBaths.bedrooms == value && 'bg-primary text-light-white rounded-full'
      }`}
    >
      {value}
      {value !== 'Any' && '+'}
    </button>
  )
}
