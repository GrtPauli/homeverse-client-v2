import React, { FC } from 'react'
import { Image } from 'antd'
import { CameraIcon, LocationIcon } from '@/assets/icons'
import { HvButton } from '@/components'
import CurrencyFormat from 'react-currency-format'
import HouseImg from '../../../assets/images/slide-3.jpg'
import { useRouter } from 'next/router'
import { IListing, ListingStatus } from '@/modules/listing/model'

interface IProps {
  item: IListing
}

export const ListItem2: FC<IProps> = ({ item }) => {
  const router = useRouter()

  return (
    <div className="bg-white rounded w-[350px] shadow-lg overflow-hidden">
      <div className="w-full h-[200px]">
        <Image
          className="rounded-t object-cover"
          width="100%"
          height="100%"
          src={item.photos[0].uri}
        />
      </div>

      <div className="py-5 px-5">
        <div className="flex justify-between">
          <CurrencyFormat
            value={item.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            renderText={(value) => <h1 className="font-bold text-primary text-xl">{value}</h1>}
          />
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
              <div
                className={`w-2 h-2 rounded-full 
                  ${item.status == (ListingStatus[0] as any) && 'bg-green-500'} 
                  ${item.status == (ListingStatus[1] as any) && 'bg-blue-500'} 
                `}
              />
              <p className="text-[13px] text-colors-cadet capitalize">
                {item.status == (ListingStatus[0] as any) && 'Active'}
                {item.status == (ListingStatus[1] as any) && 'Sold'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <CameraIcon className="w-4 h-4 text-colors-cadet" />
              <p className="text-[13px] text-colors-cadet">{item.photos.length}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-3 mt-1 text-[13px]">
          <div className="flex items-center gap-1 border-r pr-2">
            <p>{item.bedrooms}</p>
            <p>Bedrooms</p>
          </div>

          <div className="flex items-center gap-1 border-r pr-2">
            <p>{item.bathrooms}</p>
            <p>Bathrooms</p>
          </div>

          <div className="flex items-center gap-1">
            <CurrencyFormat
              value={item.propertySize}
              displayType={'text'}
              thousandSeparator={true}
              // prefix={'$'}
              // suffix=''
              renderText={(value) => <p className="">{value}</p>}
            />
            <p>{item.propertySizeUnit}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <LocationIcon className="w-3 h-3 text-colors-cadet" />
          <p className="text-[13px] text-colors-cadet">
            {item.state} {' , '} {item.city}
          </p>
        </div>

        <HvButton
          paddingY="py-3.5"
          title="View Details"
          onClick={() => router.push(`/browse/listing/${item._id}`)}
        />
      </div>
    </div>
  )
}
