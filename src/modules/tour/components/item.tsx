import React, { FC, useState } from 'react'
import HouseImg from '../../../../../assets/images/slide-3.jpg'
import { Image } from 'antd'
import { HvButton, HvPopover } from '@/components'
import { ITour, TourMethod, TourStatus } from '@/modules/tour/model'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import CurrencyFormat from 'react-currency-format'
import { MoreOutlined } from '@ant-design/icons'
import { TourItemMenu } from './menu'
import Link from 'next/link'

interface IProps {
  request?: boolean
  setDetailModal?: any
  item: ITour
  noBorder: boolean
  agent: boolean
}

export const TourItem: FC<IProps> = ({
  setDetailModal,
  agent,
  item,
  request = false,
  noBorder = false,
}) => {
  return (
    <div className={`${noBorder ? 'pb-5' : 'border-b pb-8'} pt-8`}>
      <div className="w-full flex justify-between">
        <div className="flex gap-5">
          <Image
            src={item.propertyImg.uri}
            width="250px"
            height="150px"
            className="object-cover"
          />

          <div className="flex flex-col justify-between h-[150px]">
            <div>
              <div className="flex items-center mb-1 gap-5">
                <h1 className="font-bold text-lg leading-none">House ID : {item._id}</h1>
                {/* <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <p className="text-sm">Active</p>
                            </div> */}
              </div>
              <CurrencyFormat
                value={item.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(value) => <h1 className="font-bold text-primary text-lg">{value}</h1>}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src={item.propertyLocation.countryFlag} width="18px" height="18px" />
                <p className="leading-none">
                  {item.propertyLocation.country} {' , '} {item.propertyLocation.state} {' , '}{' '}
                  {item.propertyLocation.city}
                </p>
              </div>
              <p className="leading-none mb-3">
                House Listed On : {moment(item.propertyListingDate).format(APP_DATE_TIME_FORMAT)}
              </p>
              <p className="leading-none">
                Tour Scheduled Date : {moment(item.tourScheduledDate).format(APP_DATE_TIME_FORMAT)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-[150px] items-end">
          <HvPopover
            wrapper={
              <button>
                <MoreOutlined className="text-2xl" />
              </button>
            }
            placement="leftTop"
            trigger="hover"
            children={<TourItemMenu agent={agent} tour={item} />}
          />

          {/* <HvButton onClick={() => setDetailModal(true)} title="View Details"/> */}

          <div className="flex flex-col items-end gap-3">
            {item.tourStatus == (TourStatus[1] as any) && (
              <p className="leading-none">
                Tour Status :{' '}
                <span className="inline-block text-primary font-bold">{item.tourStatus}</span>
              </p>
            )}
            {item.tourStatus == (TourStatus[0] as any) && (
              <p className="leading-none">
                Tour Status :{' '}
                <span className="inline-block text-green-500 font-bold">{item.tourStatus}</span>
              </p>
            )}
            {item.tourStatus == (TourStatus[2] as any) && (
              <p className="leading-none">
                Tour Status :{' '}
                <span className="inline-block text-red-500 font-bold">{item.tourStatus}</span>
              </p>
            )}
            <p className="leading-none">
              Tour Method : {item.method == (TourMethod[0] as any) ? 'In Person' : 'Video Call'}
            </p>
            {item.method == (TourMethod[1] as any) && (
              <Link href="" className="leading-none text-colors-cadet hover:text-primary">
                Enter Video Call
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
