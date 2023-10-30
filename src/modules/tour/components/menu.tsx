import { HvConfirmModal } from '@/components/modal/confirm'
import React, { FC, useState } from 'react'
import { useTourContext } from '../context'
import { ITour, TourStatus } from '../model'
import { HvButton, HvModal, HvTextInput } from '@/components'
import { Empty, Image, Rate } from 'antd'
import { Form, Formik } from 'formik'
import { useAuthContext } from '@/modules/auth/context'
import { IReview } from '@/modules/model'

interface IProps {
  agent: boolean
  tour: ITour
}

interface IModalData {
  open: boolean
  title?: string
  subTitle?: string
}

export const TourItemMenu: FC<IProps> = ({ agent, tour }) => {
  const [confirmModal, setConfirmModal] = useState<IModalData>({
    open: false,
    title: '',
    subTitle: '',
  })
  const { loading, updateTour } = useTourContext()
  const [modal, setModal] = useState(false)
  const [rate, setRate] = useState(0)
  const { firebaseAuth } = useAuthContext()
  const [showEditReview, setShowEditReview] = useState(false)

  const handleUpdateStatus = () => {
    if (confirmModal.title.includes('Completed')) {
      updateTour(tour._id, {
        tourStatus: TourStatus[0] as any,
      }).then(() => setConfirmModal({ ...confirmModal, open: false }))
    } else {
      updateTour(tour._id, {
        tourStatus: TourStatus[2] as any,
      }).then(() => setConfirmModal({ ...confirmModal, open: false }))
    }
  }

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
    }).then(() => setModal(false))
  }

  return (
    <>
      <div className="w-[200px] px-1 py-1">
        {agent ? (
          <>
            <button
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Mark Tour Completed',
                  subTitle: 'Are you sure you want to mark tour as completed ?',
                })
              }
              className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full"
            >
              <p>Mark Tour Completed</p>
            </button>
            <button
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Mark Tour Cancelled',
                  subTitle: 'Are you sure you want to mark tour as cancelled ?',
                })
              }
              className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full"
            >
              <p>Mark Tour Cancelled</p>
            </button>
            <button className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full">
              <p>Chat With Tourist</p>
            </button>
            <button
              onClick={() => setModal(true)}
              className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full"
            >
              <p>View Tourist Review</p>
            </button>
            <button className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full">
              <p>View House Details</p>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setModal(true)}
              className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full"
            >
              <p>Edit Tour Review</p>
            </button>
            <button className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full">
              <p>Chat With Agent</p>
            </button>
            <button className="hover:bg-black/5 duration-200 ease-in py-3 px-3 w-full">
              <p>View House Details</p>
            </button>
          </>
        )}
      </div>

      <HvConfirmModal
        open={confirmModal.open}
        onProceed={() => {
          handleUpdateStatus()
        }}
        proceedLoading={loading}
        title={confirmModal.title}
        subTitle={confirmModal.subTitle}
        onDismiss={() => setConfirmModal({ ...confirmModal, open: false })}
      />

      <HvModal
        title="Tour Review"
        width={400}
        open={modal}
        destroyOnClose
        onDismiss={() => {
          setModal(false)
        }}
        // wrapClassName='py-10'
      >
        <div>
          {showEditReview ? (
            <EditReview
              handleTourReview={handleTourReview}
              rate={rate}
              setRate={setRate}
              setModal={setModal}
              loading={loading}
              setShowEditReview={setShowEditReview}
            />
          ) : (
            <Review
              review={tour.tourReview}
              agent={agent}
              setShowEditReview={setShowEditReview}
              setModal={setModal}
            />
          )}

          {/* {agent ? ( */}

          {/* ) : (
            <div>
              {showEditReview ? (
                <EditReview
                  handleTourReview={handleTourReview}
                  rate={rate}
                  setRate={setRate}
                  setModal={setModal}
                  loading={loading}
                />
              ) : <Review review={tour.tourReview} />}
            </div>
          )} */}

          {/* {!agent && !showEditReview ? (
            <div className="flex justify-end gap-3 mt-5">
              <HvButton
                onClick={() => setModal(false)}
                outline
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Cancel"
              />
              <HvButton
                onClick={() => setShowEditReview(true)}
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Edit"
              />
            </div>
          ) : <></>} */}

          {agent && <HvButton title="Done" onClick={() => setModal(false)} />}
        </div>
      </HvModal>
    </>
  )
}

const Review = ({ review, agent, setShowEditReview, setModal }: any) => {
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
                <Rate className="!text-[20px]" disabled defaultValue={review.rating} />
              </div>

              <div className="mt-5">
                <p className="text-dark-prussian-blue font-semibold text-[15px] mb-3">Review</p>
                <div className="bg-colors-cadet/10 px-5 py-3 rounded-lg">
                  <p className="leading-8">{review.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-center mb-2 text-lg font-bold">No Review</h1>
            <p className="text-center mb-10">Tourist has not made a review yet.</p>
            <Empty className="pb-5" />

            <div>
              {agent ? (
                <HvButton title="Done" onClick={() => setModal(false)} />
              ) : (
                <div className="flex flex-col gap-3 mt-5">
                  <HvButton
                    onClick={() => setModal(false)}
                    outline
                    paddingX="px-8"
                    paddingY="py-3"
                    fullWidth={false}
                    title="Cancel"
                  />
                  <HvButton
                    onClick={() => setShowEditReview(true)}
                    paddingX="px-8"
                    paddingY="py-3"
                    fullWidth={false}
                    title="Write Review"
                  />
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
  setShowEditReview,
  handleTourReview,
  rate,
  setRate,
  setModal,
  loading,
}: any) => {
  return (
    <div>
      <Formik
        initialValues={{
          comment: '',
        }}
        onSubmit={handleTourReview}
      >
        <Form>
          <p className="text-dark-prussian-blue font-semibold text-[15px]">Rating</p>
          <Rate
            className="!text-[20px] mb-5"
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
