import React, { FC } from 'react'
import HouseImg from '../../../../assets/images/slide-4.jpg'
import { Image } from 'antd'
import { IRental } from '../../model'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { HvButton } from '@/components'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface IProps {
  item: IRental
}

export const RentalItem: FC<IProps> = ({ item }) => {
  const router = useRouter()

  return (
    <Link
      href={`/rental-manager/properties/${item?._id}/detail`}
      className="shadow rounded-2xl overflow-hidden w-[320px] hover:shadow-lg duration-150 ease-in"
    >
      <div className="w-full relative">
        <Image
          preview={false}
          src={HouseImg.src}
          width="100%"
          height="200px"
          className="object-cover object-center"
        />
        <div className="absolute bg-primary rounded-full text-white py-1 px-3 text-xs top-3 left-3 font-bold">
          Off Market
        </div>
      </div>

      <div className="px-5 pt-1 pb-3">
        <h1 className="font-black text-xl">{item.homeType}</h1>
        <p className="text-colors-cadet text-sm">
          {item.state}, {item.city}, {item.zip}
        </p>
        {/* <p className='text-colors-cadet text-sm'>{item.address}</p> */}
        <p className="text-primary text-sm font-bold text-right mt-">
          {moment(item.createdAt).format(APP_DATE_TIME_FORMAT)}
        </p>
        {/* <HvButton
          paddingY="py-2.5"
          title="Manage Rental"
          onClick={() => router.push(`/rental-manager/properties/${item?._id}/manage`)}
        /> */}
      </div>
    </Link>
  )
}
