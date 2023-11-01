import React, { FC } from 'react'
import { Image } from 'antd'
import { CameraIcon, HvHeartIcon, LocationIcon } from '@/assets/icons'
import { HvButton } from '@/components'
import CurrencyFormat from 'react-currency-format'
import HouseImg from '../../../assets/images/slide-3.jpg'
import { useRouter } from 'next/router'
import { IListing, ListingStatus } from '@/modules/listing/model'
import moment from 'moment'
import { APP_DATE_FORMAT } from '@/constants/Helper'
import Link from 'next/link'

interface IProps {
  item: IListing
  detailUrl: string
}

export const ListItem: FC<IProps> = ({ item, detailUrl }) => {
  const router = useRouter()

  return (
    <Link
      href={detailUrl}
      // href={`/browse/listings/sale/${item.id}`}
      className="bg-white rounded-xl w-[300px] hover:text-inherit shadow-md hover:shadow-lg duration-150 ease-in overflow-hidden"
    >
      <div className="w-full h-[200px] relative">
        <Image
          preview={false}
          className="rounded-t object-cover"
          width="100%"
          height="100%"
          src={item?.photos[0]}
        />

        <div className="absolute bg-primary rounded-full text-white py-1 px-3 text-xs top-3 left-3 font-bold">
          New - 52 mins ago
        </div>

        <button className="bg-white absolute right-2 bottom-2 z-50 rounded-full p-2">
          <HvHeartIcon className="text-colors-cadet" />
        </button>
      </div>

      <div className="py-4 px-5 relative">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <p className="text-xs">{item?.homeType}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <CurrencyFormat
            value={item?.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            renderText={(value) => (
              <h1 className="font-extrabold text-primary text-xl">{value}</h1>
            )}
          />
          {/* <div className="flex items-center gap-3">
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
          </div> */}
        </div>

        <div className="flex gap-2 my-1 text-sm">
          <div className="flex items-center gap-1 border-r pr-2">
            <p className="font-bold">{item?.bedrooms}</p>
            <p>Bed</p>
          </div>

          <div className="flex items-center gap-1 border-r pr-2">
            <p className="font-bold">{item?.bathrooms}</p>
            <p>Bath</p>
          </div>

          <div className="flex items-center gap-1">
            <CurrencyFormat
              value={item?.propertySize}
              displayType={'text'}
              thousandSeparator={true}
              // prefix={'$'}
              // suffix=''
              renderText={(value) => <p className="font-bold">{value}</p>}
            />
            <p>{item?.propertySizeUnit}</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1">
          <p className="text-sm text-colors-cadet">
            {item?.state} {' , '} {item?.lga} {' , '} {item?.zip}
          </p>
          {/* <p className="text-[13px] text-colors-cadet font-semibold">Year Built - {moment(Date.now()).format(APP_DATE_FORMAT)}</p> */}
        </div>

        {/* <HvButton
          paddingY="py-3.5"
          title="View Details"
          onClick={() => router.push(`/browse/listing/${item?._id}`)}
        /> */}
      </div>
    </Link>
  )
}
