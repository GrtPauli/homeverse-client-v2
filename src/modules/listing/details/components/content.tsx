import React, { FC, useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { ListingStatus, IListing } from '../../model'
import { Carousel, ConfigProvider, Rate, Tabs, TabsProps } from 'antd'
import { Image } from 'antd'
import { ListingOverview } from './overview'
import { ListingFeatures } from './features'
import { HvButton, HvModal } from '@/components'
import { HvConfirmModal } from '@/components/modal/confirm'
import { useListingContext } from '../../context'
import Link from 'next/link'
import { RequestTour } from '@/modules/tour/components'
import { useChatContext } from '@/modules/chat/context'
import { ChatRequestStatus } from '@/modules/chat/model'

interface IProps {
  listing: Partial<IListing>
  agent?: boolean
}

interface IModalData {
  open: boolean
  data?: Partial<IListing>
  content?: 'date-picker' | 'time-picker' | 'confirm'
}

export const DetailsContent: FC<IProps> = ({ listing, agent = false }) => {
  const [showModal, setShowModal] = useState<IModalData>(null)
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const { updateListing, loading, getListing } = useListingContext()
  const {
    loading: chatContextLoading,
    requestChat,
    checkChatRequestStatus,
    chatRequest,
  } = useChatContext()

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

  const handleChatRequest = () => {
    requestChat({
      ...listing.agent,
    })
  }

  // useEffect(() => {
  //   checkChatRequestStatus(listing.agent.id)
  // }, [])

  return (
    <div className="mb-20">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '',
            colorPrimary: '#FF5A3D',
          },
        }}
      >
        <Carousel autoplay swipeToSlide dotPosition="left" pauseOnHover={false}>
          {listing.photos?.map((item, i) => (
            <div className="w-full h-[450px]" key={i}>
              <Image
                className="object-cover object-center"
                width="100%"
                height="100%"
                src={item}
              />
            </div>
          ))}
        </Carousel>

        <div className="w-full flex items-start justify-center -translate-y-10 px-10 gap-5">
          <div className="w-[70%] bg-light-white rounded shadow-lg px-10 py-8">
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

          <div className="w-[30%] sticky top-28">
            {agent ? (
              <div className="bg-light-white rounded shadow-lg">
                <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                  Manage Listing
                </h1>

                <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
                </p>

                <div className="flex flex-col gap-5 px-5 py-5">
                  {listing.status == (ListingStatus[1] as any) ? (
                    <HvButton disabled paddingY="py-3.5" title="Edit Listing" />
                  ) : (
                    <Link href={`/dashboard/listings/edit/${listing.id}`}>
                      <HvButton paddingY="py-3.5" title="Edit Listing" />
                    </Link>
                  )}

                  <HvButton
                    disabled={listing.status == (ListingStatus[1] as any) && true}
                    onClick={() => setConfirmModal(true)}
                    paddingY="py-3.5"
                    title="Mark as Sold"
                  />
                  <HvButton
                    disabled={listing.status == (ListingStatus[1] as any) && true}
                    paddingY="py-3.5"
                    title="Unlist Property"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="bg-light-white rounded shadow-lg">
                  <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                    Agent
                  </h1>

                  <div className="flex items-center gap-5 px-5 py-5">
                    <Image
                      src={listing.agent.photo}
                      className="rounded-full"
                      width={50}
                      height={50}
                    />

                    <div>
                      <h1 className="font-bold ">{listing.agent.name}</h1>
                      <Rate className="!text-[20px]" allowHalf disabled defaultValue={3} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 px-5 py-5">
                    <HvButton
                      onClick={() =>
                        setShowModal({ open: true, data: listing, content: 'date-picker' })
                      }
                      paddingY="py-3.5"
                      title="Request a Tour"
                    />

                    {chatRequest?.status == ChatRequestStatus.PENDING ? (
                      <HvButton disabled title="Chat Request Pending" />
                    ) : (
                      <HvButton
                        onClick={() => handleChatRequest()}
                        paddingY="py-3.5"
                        title="Request Chat With Agent"
                        loading={chatContextLoading}
                      />
                    )}

                    <HvButton paddingY="py-3.5" title="Save Property" />
                  </div>
                </div>

                {/* 
                <div className="bg-light-white rounded shadow-lg">
                  <h1 className="border-b px-5 py-3 font-bold text-dark-prussian-blue text-lg">
                    Actions
                  </h1>
                  <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
                  </p>

                  <div className="flex flex-col gap-5 px-5 py-5">
                    <HvButton
                      onClick={() =>
                        setShowModal({ open: true, data: listing, content: 'date-picker' })
                      }
                      paddingY="py-3.5"
                      title="Request a Tour"
                    />
                    <HvButton 
                      paddingY="py-3.5" 
                      title="Request Chat With Agent" 
                    />
                    <HvButton paddingY="py-3.5" title="Save Property" />
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </ConfigProvider>

      <HvModal
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
      />
    </div>
  )
}
