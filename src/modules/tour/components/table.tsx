import React, { useState } from 'react'
import { ConfigProvider, Empty, Image, Rate, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ITour, TourMethod, TourStatus } from '../model'
import moment from 'moment'
import { APP_DATE_FORMAT, APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import {
  HvChatIcon,
  HvEditIcon,
  HvHomeIcon,
  HvInfoIcon,
  HvTickCircleIcon,
  HvVideoIcon,
} from '@/assets/icons'
import { useTourContext } from '../context'
import HvSwitchInput from '@/components/input/switch'
import { HvClipBoardIcon } from '@/assets/icons/clipboard'
import { HvModal } from '@/components'
import { TourDetails } from './details'
import { useListingContext } from '@/modules/listing/context'
import { HvConfirmModal } from '@/components/modal/confirm'
import { useAuthContext } from '@/modules/auth/context'

interface IModal {
  open: boolean
  data: ITour
}

interface IConfirmModal {
  open: boolean
  title?: string
  subTitle?: string
  id?: string
  action?: 'accept-request' | 'revoke-request' | 'cancel-tour' | 'complete-tour'
}

export const ToursTable = ({ agent }: any) => {
  const { tours, loading, updateTour, getTours } = useTourContext()
  const [detailModal, setDetailModal] = useState<IModal>({ data: null, open: false })
  const { listing, getListing, initLoading } = useListingContext()
  const { firebaseAuth } = useAuthContext()

  const [confirmModal, setConfirmModal] = useState<IConfirmModal>({
    open: false,
    title: '',
    subTitle: '',
    id: '',
    action: null,
  })

  const columns: ColumnsType<ITour> = [
    {
      title: agent ? 'Tourist' : 'Agent',
      key: agent ? 'tourist' : 'agent',
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Image
            className="rounded-full"
            width="30px"
            height="30px"
            src={agent ? record.touristPhoto : record.agentPhoto}
          />
          <p>{agent ? record.touristName : record.agentName}</p>
        </div>
      ),
    },
    {
      title: 'Tour Scheduled Date',
      dataIndex: 'tourScheduledDate',
      key: 'tourScheduledDate',
      render: (value) => <>{moment(value).format(APP_DATE_TIME_FORMAT)}</>,
    },
    {
      title: 'Status',
      dataIndex: 'tourStatus',
      key: 'tourStatus',
      render: (value) => (
        <>
          {value == TourStatus[0] && (
            <p className="text-blue-500 font-bold">{(value as string).replace('_', ' ')}</p>
          )}
          {value == TourStatus[2] && (
            <p className="text-primary font-bold">{(value as string).replace('_', ' ')}</p>
          )}
          {value == TourStatus[4] && (
            <p className="text-green-500 font-bold">{(value as string).replace('_', ' ')}</p>
          )}
          {value == TourStatus[1] && (
            <p className="text-red-500 font-bold">{(value as string).replace('_', ' ')}</p>
          )}
          {value == TourStatus[3] && (
            <p className="text-red-500 font-bold">{(value as string).replace('_', ' ')}</p>
          )}
        </>
      ),
    },
    {
      title: 'Tour Method',
      dataIndex: 'method',
      key: 'method',
      render: (value) => <p>{value == TourMethod[0] ? 'In Person' : 'Video Call'}</p>,
    },
    // {
    //   title: 'Property ID',
    //   dataIndex: 'propertyId',
    //   key: 'propertyId',
    //   render: (value) => <>{value.slice(0, 6)}</>,
    // },
    {
      title: 'Tour Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (_, record) => (
        <Rate
          className="!text-[20px]"
          allowHalf
          disabled
          defaultValue={record?.tourReview?.rating || 0}
        />
      ),
    },
    // {
    //   title: 'Listing Date',
    //   dataIndex: 'propertyListingDate',
    //   key: 'propertyListingDate',
    //   render: (value) => <>{moment(value).format(APP_DATE_FORMAT)}</>,
    // },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <div className="flex items-center gap-3 justify-center">
          {record.method == (TourMethod[1] as any) && (
            <button className="">
              <HvVideoIcon className="w-5 h-5 text-colors-cadet hover:text-primary duration-150 ease-in" />
            </button>
          )}

          <button className="">
            <HvChatIcon className="w-5 h-5 text-colors-cadet hover:text-primary duration-150 ease-in" />
          </button>

          <button
            className="mr-3"
            onClick={() => {
              getListing(record.propertyId)
              setDetailModal({ data: record, open: true })
            }}
          >
            <HvClipBoardIcon className="w-5 h-5 text-colors-cadet hover:text-primary duration-150 ease-in" />
          </button>

          {agent && record.tourStatus == (TourStatus[0] as any) && (
            <button
              className="bg-primary text-xs font-bold py-2 px-4 text-light-white rounded-full flex items-center gap-2"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Accept Tour Request',
                  subTitle: 'Are you sure you want to accept tour request ?',
                  id: record._id,
                  action: 'accept-request',
                })
              }
            >
              Accept
              <HvTickCircleIcon className="w-5 h-5" />
            </button>
          )}

          {agent && record.tourStatus == (TourStatus[0] as any) && (
            <button
              className="bg-primary text-xs font-bold py-2 px-4 text-light-white rounded-full flex items-center gap-2"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Revoke Tour Request',
                  subTitle: 'Are you sure you want to revoke tour request ?',
                  id: record._id,
                  action: 'revoke-request',
                })
              }
            >
              Revoke
              <HvTickCircleIcon className="w-5 h-5" />
            </button>
          )}

          {agent && record.tourStatus == (TourStatus[2] as any) && (
            <button
              className="bg-primary text-xs font-bold py-2 px-4 text-light-white rounded-full flex items-center gap-2"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Mark Tour as Completed',
                  subTitle: 'Are you sure you want to mark tour as completed ?',
                  id: record._id,
                  action: 'complete-tour',
                })
              }
            >
              Completed
              <HvTickCircleIcon className="w-5 h-5" />
            </button>
          )}

          {agent && record.tourStatus == (TourStatus[2] as any) && (
            <button
              className="bg-primary text-xs font-bold py-2 px-4 text-light-white rounded-full flex items-center gap-2"
              onClick={() =>
                setConfirmModal({
                  open: true,
                  title: 'Mark Tour as Cancelled',
                  subTitle: 'Are you sure you want to mark tour as cancelled ?',
                  id: record._id,
                  action: 'cancel-tour',
                })
              }
            >
              Cancelled
              <HvTickCircleIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      ),
    },
  ]

  const updateStatus = (tourStataus: TourStatus) => {
    updateTour(confirmModal.id, {
      tourStatus: tourStataus,
    }).then(() => {
      setConfirmModal({ open: false })
      getTours({ agentId: firebaseAuth?.currentUser?.uid }, true)
    })
  }

  const handleUpdateStatus = () => {
    switch (confirmModal.action) {
      case 'accept-request':
        updateStatus(TourStatus[2] as any)
        break
      case 'revoke-request':
        updateStatus(TourStatus[1] as any)
        break
      case 'complete-tour':
        updateStatus(TourStatus[4] as any)
        break
      case 'cancel-tour':
        updateStatus(TourStatus[3] as any)
        break
    }

    // if (confirmModal.title.includes('Completed')) {
    //   updateTour(confirmModal.id, {
    //     tourStatus: TourStatus[0] as any,
    //   }).then(() => {
    //     setConfirmModal({ open: false })
    //     getTours({ agentId: firebaseAuth?.currentUser?.uid }, true)
    //   })
    // } else {
    //   updateTour(confirmModal.id, {
    //     tourStatus: TourStatus[2] as any,
    //   }).then(() => {
    //     setConfirmModal({ open: false })
    //     getTours({ agentId: firebaseAuth?.currentUser?.uid }, true)
    //   })
    // }
  }

  return (
    <>
      <div className="pt-3">
        <TableFilter />
        {tours.length > 0 ? (
          <ConfigProvider
            theme={{
              token: {
                fontFamily: '',
                colorPrimary: '#FF5A3D',
              },
            }}
          >
            <Table
              loading={loading}
              className="translate-y-2"
              bordered
              columns={columns}
              dataSource={tours}
            />
          </ConfigProvider>
        ) : (
          <Empty />
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
        onDismiss={() => setConfirmModal({ open: false })}
      />

      <HvModal
        open={detailModal.open}
        onDismiss={() => setDetailModal({ data: null, open: false })}
        title="Tour Details"
        destroyOnClose
        width={600}
        className="!p-0"
        wrapClassName="py-5"
      >
        <TourDetails setDetailModal={setDetailModal} tour={detailModal.data} agent={agent} />
      </HvModal>
    </>
  )
}

const TableFilter = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className="flex items-center gap-10 mt-2 mb-8">
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Tour Requests" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Pending Tours" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Completed Tours" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Cancelled Tours" />
    </div>
  )
}
