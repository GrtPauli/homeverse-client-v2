import React, { useState } from 'react'
import { ILocationInput } from '@/components'
import { useListingContext } from '../../context'
import { BedsAndBathsFilter } from './beds-baths'
import { FilterItem } from './item'
import { LocationFilter } from './location'
import { PriceRangeFilter } from './price'

export const ListingsFilter = () => {
  const { getListings, filterLoading, listings } = useListingContext()
  const [location, setLocation] = useState<ILocationInput>({ city: null, state: null })
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: null,
    max: null,
  })

  const [bedsAndBaths, setBedsAndBaths] = useState<{ bedrooms: string; bathrooms: string }>({
    bathrooms: 'Any',
    bedrooms: 'Any',
  })

  const handleFilter = () => {
    getListings({
      bathrooms: bedsAndBaths.bathrooms,
      bedrooms: bedsAndBaths.bedrooms,
      city: location.city?.name,
      state: location.state?.name,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    })
  }

  return (
    <div className="px-10 py-5 bg-light-white w-full h-[200px] shadow-lg sticky top-[98px] z-[80] border-t">
      <div className="flex gap-5 items-center  ">
        <FilterItem title="Location">
          <LocationFilter
            handleFilter={handleFilter}
            location={location}
            setLocation={setLocation}
          />
        </FilterItem>

        <FilterItem title="Price Range">
          <PriceRangeFilter
            handleFilter={handleFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </FilterItem>

        <FilterItem title="Beds and Baths">
          <BedsAndBathsFilter
            handleFilter={handleFilter}
            bedsAndBaths={bedsAndBaths}
            setBedsAndBaths={setBedsAndBaths}
          />
        </FilterItem>
      </div>

      <div className="mt-5">
        <h1 className="font-black text-2xl mb-2">Homes For Sale</h1>
        <p>Sort By</p>
      </div>
    </div>
  )
}
