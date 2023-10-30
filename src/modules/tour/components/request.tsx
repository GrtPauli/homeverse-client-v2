import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import moment from 'moment'
import { APP_DATE_FORMAT, APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { HvButton } from '@/components'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import '@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css'
import 'react-clock/dist/Clock.css'
import Clock from 'react-clock'
import 'react-time-picker/dist/TimePicker.css'
import TimePicker from 'react-time-picker'
import { useTourContext } from '../context'
import { useAuthContext } from '@/modules/auth/context'
import { IListing } from '@/modules/listing/model'
import { TourMethod, TourStatus } from '../model'
import { useRouter } from 'next/router'

type ValuePiece = Date | string | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface IProps {
  showModal: IModalData
  setShowModal?: Dispatch<SetStateAction<IModalData>>
}

interface IModalData {
  open: boolean
  data?: Partial<IListing>
  content?: 'date-picker' | 'time-picker' | 'confirm'
}

export const RequestTour: FC<IProps> = ({ showModal, setShowModal }) => {
  const [day, setDay] = useState<Date>()
  const [method, setMethod] = useState<'in-person' | 'video-call'>('in-person')
  const [time, setTime] = useState('10:00')
  const { loading, createTourRequest, createTour } = useTourContext()
  const { firebaseAuth } = useAuthContext()
  const router = useRouter()

  const handleSubmit = () => {
    createTour({
      agentId: showModal.data.agentId,
      agentName: showModal.data.agent.name,
      agentPhoto: showModal.data.agent.photo,
      method: method == 'in-person' ? (TourMethod[0] as any) : (TourMethod[1] as any),
      propertyId: showModal.data._id,
      propertyListingDate: showModal.data.createdAt,
      touristId: firebaseAuth.currentUser.uid,
      touristName: firebaseAuth.currentUser.displayName,
      touristPhoto: firebaseAuth.currentUser.photoURL,
      tourScheduledDate: day.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1])),
      tourStatus: TourStatus[0] as any,
    }).then(() => {
      setShowModal({ ...showModal, open: false })
      router.push('/my/tours')
    })

    // createTourRequest({
    //   agentId: showModal.data.agent,
    //   agentName: 'Paul Andrew',
    //   method: method == 'in-person' ? TourMethod[0] : TourMethod[1],
    //   propertyId: showModal.data._id,
    //   propertyListingDate: showModal.data.createdAt,
    //   touristId: firebaseAuth.currentUser.uid,
    //   touristName: 'John Terry',
    //   tourScheduledDate: day.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1])),
    // })
  }

  return (
    <div>
      {showModal.content !== 'confirm' && (
        <div className="bg-light-cultured-2 flex justify-between rounded-full overflow-hidden">
          <button
            onClick={() => setMethod('in-person')}
            className={`w-[50%] py-3 ${
              method == 'in-person' && 'bg-primary text-light-white rounded-full'
            }`}
          >
            In Person
          </button>
          <button
            onClick={() => setMethod('video-call')}
            className={`w-[50%] py-3 ${
              method == 'video-call' && 'bg-primary text-light-white rounded-full'
            }`}
          >
            Video Chat
          </button>
        </div>
      )}

      <div className="flex items-center justify-center mb-2 w-full">
        {showModal.content == 'date-picker' && <HvDayPicker day={day} setDay={setDay} />}
        {showModal.content == 'time-picker' && <HvTimePicker time={time} setTime={setTime} />}
        {showModal.content == 'confirm' && (
          <ConfirmSelection method={method} time={time} day={day} />
        )}
      </div>

      <HvButton
        loading={loading}
        onClick={() => {
          showModal.content == 'date-picker' &&
            setShowModal({ open: true, ...showModal, content: 'time-picker' })
          showModal.content == 'time-picker' &&
            setShowModal({ open: true, ...showModal, content: 'confirm' })
          showModal.content == 'confirm' && handleSubmit()
        }}
        title={
          showModal.content == 'date-picker'
            ? 'Proceed with this date'
            : showModal.content == 'time-picker'
            ? 'Proceed with this time'
            : 'Proceed'
        }
      />

      {showModal.content == 'time-picker' || showModal.content == 'confirm' ? (
        <div className="mt-3">
          <HvButton
            outline
            title="Go Back"
            onClick={() => {
              showModal.content == 'time-picker' &&
                setShowModal({ open: true, ...showModal, content: 'date-picker' })
              showModal.content == 'confirm' &&
                setShowModal({ open: true, ...showModal, content: 'time-picker' })
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

const ConfirmSelection = ({ method, day, time }: any) => {
  return (
    <div className="pt-3 pb-5 w-full text-center">
      <h1 className="font-bold text-lg">Confirm Selection</h1>
      <p className="mb-1">{method == 'in-person' ? 'In Person' : 'Video Call'}</p>
      {/* <p>{format(day, 'PP')}, {time}</p> */}
      <p>
        {moment(day.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]))).format(
          APP_DATE_TIME_FORMAT,
        )}
      </p>
      <p className="mt-3 leading-7">
        Click on "Proceed" button to send <br />
        your tour request
      </p>
    </div>
  )
}

const HvDayPicker = ({ day, setDay }: any) => {
  let footer = <p className="text-center mt-3">Please pick a day.</p>
  if (day) {
    footer = <p className="text-center mt-3">You picked {moment(day).format(APP_DATE_FORMAT)}.</p>
  }

  return (
    <div>
      <DayPicker mode="single" selected={day} onSelect={setDay} footer={footer} />
    </div>
  )
}

const HvTimePicker = ({ time, setTime }: any) => {
  return (
    <div className="w-full mt-5">
      <TimePicker clockIcon={null} onChange={setTime} value={time} isOpen />
    </div>
  )
}

const HvTimeRangePicker = () => {
  const [value, onChange] = useState<Value>(['10:00', '11:00'])
  return <TimeRangePicker clockIcon={null} onChange={onChange} value={value} isOpen={true} />
}
