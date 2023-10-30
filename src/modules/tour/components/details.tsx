import React, { Dispatch, SetStateAction, useState } from 'react'
import { Carousel, ConfigProvider, Empty, Image, Rate, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useListingContext } from '@/modules/listing/context'
import { HvButton, HvLoader2, HvTextInput } from '@/components'
import CurrencyFormat from 'react-currency-format'
import { CameraIcon, LocationIcon } from '@/assets/icons'
import { ListingStatus } from '@/modules/listing/model'
import { ITour } from '../model'
import { useTourContext } from '../context'
import { useAuthContext } from '@/modules/auth/context'
import { Form, Formik } from 'formik'

interface IProps {
  agent: boolean
  tour: ITour
  setDetailModal: Dispatch<SetStateAction<{ open: boolean; data: ITour }>>
}

export const TourDetails = ({ agent, tour, setDetailModal }: IProps) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <p className="font-medium">House Details</p>,
      children: <HouseDetails />,
    },
    {
      key: '2',
      label: <p className="font-medium">Tour Review</p>,
      children: <TourReview setDetailModal={setDetailModal} tour={tour} agent={agent} />,
    },
  ]
  const { initLoading } = useListingContext()

  return (
    <div className="px-5 pb-5 pt-2">
      {!initLoading ? (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: '',
              colorPrimary: '#FF5A3D',
            },
          }}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      ) : (
        <div className="py-20 w-full items-center justify-center">
          <HvLoader2 loading={initLoading} />
        </div>
      )}
    </div>
  )
}

const HouseDetails = () => {
  const { listing } = useListingContext()

  return (
    <div>
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
            <div className="w-full h-[300px]" key={i}>
              <Image
                className="object-cover object-center"
                width="100%"
                height="100%"
                src={item.uri}
              />
            </div>
          ))}
        </Carousel>
      </ConfigProvider>

      <div className="mt-5">
        <div className="flex justify-between">
          <CurrencyFormat
            value={listing.price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
            renderText={(value) => <h1 className="font-bold text-primary text-2xl">{value}</h1>}
          />
          <div className="flex items-center gap-3">
            <div className="flex gap-2 items-center">
              <div
                className={`w-2 h-2 rounded-full 
                  ${listing.status == (ListingStatus[0] as any) && 'bg-green-500'} 
                  ${listing.status == (ListingStatus[1] as any) && 'bg-blue-500'} 
                `}
              />
              <p className="text-[13px] text-colors-cadet capitalize">
                {listing.status == (ListingStatus[0] as any) && 'Active'}
                {listing.status == (ListingStatus[1] as any) && 'Sold'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <CameraIcon className="w-4 h-4 text-colors-cadet" />
              <p className="text-[13px] text-colors-cadet">{listing.photos.length}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-3 mt-1 text-[13px]">
          <div className="flex items-center gap-1 border-r pr-2">
            <p>{listing.bedrooms}</p>
            <p>Bedrooms</p>
          </div>

          <div className="flex items-center gap-1 border-r pr-2">
            <p>{listing.bathrooms}</p>
            <p>Bathrooms</p>
          </div>

          <div className="flex items-center gap-1">
            <CurrencyFormat
              value={listing.propertySize}
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value) => <p className="">{value}</p>}
            />
            <p>{listing.propertySizeUnit}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5">
          <LocationIcon className="w-4 h-4 text-colors-cadet" />
          <p className="text-[13px] text-colors-cadet">
            {listing.state} {' , '} {listing.city}
          </p>
        </div>

        <HvButton title="View Full Details" />
      </div>
    </div>
  )
}

const TourReview = ({ agent, tour, setDetailModal }: IProps) => {
  const [showEditReview, setShowEditReview] = useState(false)
  const { loading, updateTour, getTours } = useTourContext()
  const { firebaseAuth } = useAuthContext()
  const [rate, setRate] = useState(tour.tourReview.rating || 0)

  const handleTourReview = (val: any) => {
    updateTour(tour._id, {
      tourReview: {
        comment: val.comment,
        name: firebaseAuth.currentUser.displayName,
        photo: firebaseAuth.currentUser.photoURL,
        rating: rate,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    }).then(() => {
      setDetailModal({ data: null, open: false })
      getTours({ touristId: firebaseAuth?.currentUser?.uid }, true)
    })
  }

  return (
    <div>
      {showEditReview ? (
        <EditReview
          handleTourReview={handleTourReview}
          rate={rate}
          setRate={setRate}
          loading={loading}
          setShowEditReview={setShowEditReview}
          review={tour.tourReview}
        />
      ) : (
        <Review
          review={tour.tourReview}
          agent={agent}
          setShowEditReview={setShowEditReview}
          setDetailModal={setDetailModal}
        />
      )}
    </div>
  )
}

const Review = ({ review, agent, setShowEditReview, setDetailModal }: any) => {
  return (
    <>
      <div className="">
        {review ? (
          <div>
            <div className="flex items-center gap-3">
              <Image
                width="80px"
                height="80px"
                src={review.photo}
                className="rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold">Tourist</h1>
                <p>{review.name}</p>
              </div>
            </div>

            <div className="mt-5">
              <div>
                <p className="text-dark-prussian-blue font-semibold text-[15px]">Rating</p>
                <Rate className="!text-[20px]" allowHalf disabled defaultValue={review.rating} />
              </div>

              <div className="mt-5">
                <p className="text-dark-prussian-blue font-semibold text-[15px] mb-3">Review</p>
                <div className="bg-colors-cadet/10 px-5 py-3 rounded-lg">
                  <p className="leading-8">{review.comment}</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              {agent ? (
                <HvButton
                  title="Done"
                  onClick={() => setDetailModal({ data: null, open: false })}
                />
              ) : (
                <div className="flex flex-col gap-3">
                  <HvButton onClick={() => setShowEditReview(true)} title="Edit Review" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="pt-10">
            <Empty
              description={
                agent ? (
                  <p>Tourist has not made a review yet.</p>
                ) : (
                  <p className="leading-7 text-sm">You have not made a review yet.</p>
                )
              }
            />

            <div className="pt-10">
              {agent ? (
                <HvButton
                  title="Done"
                  onClick={() => setDetailModal({ data: null, open: false })}
                />
              ) : (
                <div className="flex flex-col gap-3 mt-5">
                  <HvButton onClick={() => setShowEditReview(true)} title="Write Review" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const EditReview = ({
  review,
  setShowEditReview,
  handleTourReview,
  rate,
  setRate,
  loading,
}: any) => {
  return (
    <div>
      <Formik
        initialValues={{
          comment: review?.comment || '',
        }}
        onSubmit={handleTourReview}
      >
        <Form>
          <p className="text-dark-prussian-blue font-semibold text-[15px]">Rating</p>
          <Rate
            className="!text-[30px] mb-5"
            allowHalf
            value={rate}
            onChange={(val) => setRate(val)}
          />
          <HvTextInput textarea name="comment" label="Comment" />

          <div className="flex justify-end gap-3 mt-5">
            <HvButton
              onClick={() => setShowEditReview(false)}
              outline
              paddingX="px-8"
              paddingY="py-3"
              fullWidth={false}
              title="Cancel"
            />
            <HvButton
              loading={loading}
              type="submit"
              paddingX="px-8"
              paddingY="py-3"
              fullWidth={false}
              title="Apply"
            />
          </div>
        </Form>
      </Formik>
    </div>
  )
}
