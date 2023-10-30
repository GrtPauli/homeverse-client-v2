import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { CountrySelector, StateSelector, CitySelector } from 'volkeno-react-country-state-city'
import 'volkeno-react-country-state-city/dist/index.css'

export const country: any = {
  capital: 'Abuja',
  currency: 'NGN',
  currency_name: 'Nigerian naira',
  currency_symbol: '₦',
  emoji: "abbreviation:'WAT'",
  emojiU: "tzName:'West Africa Time'}]",
  id: 161,
  iso2: 'NG',
  iso3: 'NGA',
  label: null,
  latitude: 'gmtOffset:3600',
  longitude: "gmtOffsetName:'UTC+01:00'",
  name: 'Nigeria',
  native: 'Nigeria',
  numeric_code: 566,
  phone_code: 234,
  region: 'Africa',
  subregion: 'Western Africa',
  timezones: "[{zoneName:'Africa\\/Lagos'",
  tld: '.ng',
  value: 'NG',
}

export const countryFlag: string = ''

export interface ILocationInput {
  state: any
  city: any
}

interface IProps {
  labelSmall?: boolean
  flexCol?: boolean
  setLocation: Dispatch<SetStateAction<ILocationInput>>
  location: ILocationInput
}

export const LocationSelector: FC<IProps> = ({ labelSmall, flexCol, location, setLocation }) => {
  // const handleCountrySelect = (option: any) => {
  //   setCountry(option)
  // }

  const handleStateSelect = (option: any) => {
    setLocation({
      ...location,
      state: option,
    })
  }

  const handleCitySelect = (option: any) => {
    setLocation({
      ...location,
      city: option,
    })
  }

  return (
    <div
      className={`${
        flexCol && 'flex-col gap-5'
      } flex w-full justify-between location-selector gap-8`}
    >
      {/* <div className={`${flexCol && 'w-full'} w-[33.3%]`}>
        <p
          className={`text-dark-prussian-blue font-medium mb-3 ${
            labelSmall == true ? 'text-[13px]' : 'text-[15px]'
          }`}
        >
          Country
        </p>
        <CountrySelector
          containerClass=" w-full"
          onChange={handleCountrySelect}
          name="country"
          placeholder="Select a country"
          value={country}
        />
      </div> */}

      <div className={`${flexCol && 'w-full'} w-[50%]`}>
        <p
          className={`text-dark-prussian-blue font-semibold mb-2 ${
            labelSmall == true ? 'text-[13px]' : 'text-[15px]'
          }`}
        >
          State
        </p>
        <StateSelector
          containerClass=" w-full"
          country={country}
          name="statef"
          value={location.state}
          countryPlaceholder="Select a country first"
          onChange={handleStateSelect}
        />
      </div>

      <div className={`${flexCol && 'w-full'} w-[50%]`}>
        <p
          className={`text-dark-prussian-blue font-semibold mb-2 ${
            labelSmall == true ? 'text-[13px]' : 'text-[15px]'
          }`}
        >
          City
        </p>
        <CitySelector
          containerClass=" w-full"
          state={location.state}
          name="cityf"
          value={location.city}
          statePlaceholder="Select a state first"
          onChange={handleCitySelect}
        />
      </div>
    </div>
  )
}
