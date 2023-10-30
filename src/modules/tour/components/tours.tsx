import React, { useState } from 'react'
import { TourItem } from './item'
import { HvEmpty, HvModal } from '@/components'
import HvSwitchInput from '@/components/input/switch'
import TourDetails from './details'
import { useTourContext } from '@/modules/tour/context'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

interface DataType {}

export const Tours = ({ agent }: { agent: boolean }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { tours } = useTourContext()

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tourist',
      dataIndex: 'touristName',
      key: 'touristName',
      render: (value) => <div></div>,
    },
    {
      title: 'Tour Scheduled Date',
      dataIndex: 'tourScheduledDate',
      key: 'tourScheduledDate',
      // render: (value) => <>{moment(value).format(APP_DATE_TIME_FORMAT)}</>,
    },
    {
      title: 'Tour Method',
      dataIndex: 'method',
      key: 'method',
      // render: (value) => <p>{value == TourMethod[0] ? 'In Person' : 'Video Call'}</p>,
    },
    {
      title: 'Property ID',
      dataIndex: 'propertyId',
      key: 'propertyId',
    },
    {
      title: 'Property Listing Date',
      dataIndex: 'propertyListingDate',
      key: 'propertyListingDate',
      // render: (value) => <>{moment(value).format(APP_DATE_TIME_FORMAT)}</>,
    },
    {
      title: 'Request Status',
      dataIndex: 'requestStatus',
      key: 'requestStatus',
    },
    {
      title: 'Actions',
      key: 'action',
      // render: (_, record) => (
      //   <div className="flex items-center gap-5 justify-center">
      //     <button className="">
      //       <HvChatIcon className="w-5 h-5 text-colors-cadet" />
      //     </button>

      //     {agent && (
      //       <button onClick={() => setShowModal({ open: true, data: record })}>
      //         <HvTickCircleIcon className="w-5 h-5 text-colors-cadet" />
      //       </button>
      //     )}

      //     <button>
      //       <HvHomeIcon className="w-5 h-5 text-colors-cadet" />
      //     </button>
      //   </div>
      // ),
    },
  ]

  return (
    <>
      <Table className="translate-y-2" bordered columns={columns} dataSource={[]} />
      {/* <div>
        {tours.length > 0 && <Filter />}
        {tours.length > 0 ? (
          tours.map((item, i) => (
            <TourItem
              agent={agent}
              noBorder={tours.length == i + 1 ? true : false}
              key={i}
              item={item}
              setDetailModal={setShowModal}
            />
          ))
        ) : (
          <HvEmpty />
        )}
      </div>

      <HvModal
        width={1000}
        title="Tour Details"
        open={showModal}
        onDismiss={() => setShowModal(false)}
      >
        <TourDetails />
      </HvModal> */}
    </>
  )
}

const Filter = () => {
  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className="flex items-center gap-10 mt-2 mb-5">
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Show Pending Tours Only" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Show Completed Tours Only" />
      <HvSwitchInput setChecked={setChecked} checked={checked} label="Show Cancelled Tours Only" />
    </div>
  )
}
