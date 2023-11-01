import React from 'react'
import { DetailsContent, ListingFeatures, ListingOverview } from '../details/components'
import { useAuthContext } from '@/modules/auth/context'
import { useListingContext } from '../context'
import { HvButton, HvModal } from '@/components'
import { HvConfirmModal } from '@/components/modal/confirm'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { ChatRequestStatus } from '@/modules/chat/model'
import { RequestTour } from '@/modules/tour/components'
import { ConfigProvider, Carousel, Tabs, Rate, Image, TabsProps } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import CurrencyFormat from 'react-currency-format'
import { ListingStatus } from '../model'

const HubListingDetailPage = () => {
    const { initLoading, getListing, listing } = useListingContext()
    const { firebaseInitLoading } = useAuthContext()
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: <p className="font-medium">Overview</p>,
            children: <ListingOverview listing={listing} />,
        },
        {
            key: '2',
            label: <p className="font-medium">Facts and Features</p>,
            children: <ListingFeatures listing={listing} />,
        },
        {
            key: '3',
            label: <p className="font-medium">Tour Reviews</p>,
            children: <ListingFeatures listing={listing} />,
        },
    ]

  return (
    <div className="">
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: '',
                    colorPrimary: '#FF5A3D',
                },
            }}
        >
            <div className='w-full flex gap-5'>
                <div className='w-[70%]'>
                    <Carousel className='rounded-lg overflow-hidden shadow-lg' autoplay swipeToSlide dotPosition="left" pauseOnHover={false}>
                        {listing.photos?.map((item, i) => (
                            <div className="w-full h-[430px] rounded-lg shadow-lg overflow-hidden" key={i}>
                                <Image
                                    className="object-cover object-center rounded-lg shadow-lg"
                                    width="100%"
                                    height="100%"
                                    src={item}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>

                <div className="w-[30%] bg-light-white rounded-lg shadow-lg px-10 py-8">

                </div>
            </div>

            <div className="w-full flex items-start justify-center pt-5 gap-5">
                <div className="w-[100%] bg-light-white rounded-lg shadow-lg px-10 py-8">
                    <div className="flex justify-between items-start mb-1">
                        <CurrencyFormat
                            value={listing.price}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'₦'}
                            renderText={(value) => (
                            <h1 className="font-extrabold text-3xl text-primary">{value}</h1>
                            )}
                        />
                    {/* <p className='text-sm text-colors-cadet mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?</p> */}
                    </div>

                    <div className="flex gap-3 items-center mb-5">
                    <div className="flex gap-2 items-center">
                        <div
                        className={`w-2 h-2 rounded-full 
                        ${listing.status == (ListingStatus[0] as any) && 'bg-green-500'} 
                        ${listing.status == (ListingStatus[1] as any) && 'bg-blue-500'} 
                        `}
                        />
                        <p className="text-sm capitalize">
                        {listing.status == (ListingStatus[0] as any) && 'Active'}
                        {listing.status == (ListingStatus[1] as any) && 'Sold'}
                        </p>
                    </div>

                    <div className="w-0.5 h-4 bg-gray-300"></div>
                    <div className="text-sm flex items-center gap-2">
                        <p>Listed on {moment(listing.createdAt).format(APP_DATE_TIME_FORMAT)}</p>
                        <p>(85 days ago)</p>
                    </div>
                    </div>

                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
        </ConfigProvider>

    {/* <HvModal
        width={400}
        open={showModal?.open}
        onDismiss={() => setShowModal({ open: false })}
        title="Request Tour With Agent"
    >
        <RequestTour showModal={showModal} setShowModal={setShowModal} />
    </HvModal>

    <HvConfirmModal
        open={confirmModal}
        onProceed={() => {
        updateListing(listing.id, { status: ListingStatus[1] as any }).then(() => {
            getListing(listing.id, true)
        })
        }}
        proceedLoading={loading}
        title="Mark as Sold"
        subTitle="Are you sure want to mark this listing as sold ?"
        onDismiss={() => setConfirmModal(false)}
    /> */}
    </div>
  )
}

export default HubListingDetailPage