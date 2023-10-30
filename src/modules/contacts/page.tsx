import { AppLoader, AppSelectInput, AppSelectInput2, DashboardLayout } from '@/components'
import React, { useEffect, useState } from 'react'
import { ConfigProvider, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { Contacts } from './contacts'
import { ContactRequests } from './requests'
import { useContactContext } from './context'
import { AgentHubLayout } from '@/components/layout/hub'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Drawer } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import User from '../../assets/images/user.png'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'
import { Formik } from 'formik'
import { ContactStatus } from './model'
import { AppChatIcon, AppDeleteIcon } from '@/assets/icons'
import { useHvFirebaseContext } from '../firebase/context'

interface DataType {
  key: string
  createdAt: any
  status: any
  email: any
  firstname: any
  lastname: any
  photo: any
  _id: any
  // tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Contact',
    // dataIndex: 'contact',
    key: 'contact',
    render: (_, record) => (
      <div className="flex items-center gap-5">
        <Image
          className="rounded-full object-cover"
          width="30px"
          height="30px"
          src={record?.photo}
        />
        <p>
          {record?.firstname} {record?.lastname}
        </p>
      </div>
    ),
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value) => <>{moment(value).format(APP_DATE_TIME_FORMAT)}</>,
  },
  {
    title: 'Contact Status',
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <div className="px-3">
        <Formik onSubmit={() => {}} initialValues={{}}>
          <AppSelectInput
            className="text-[13px] border border-colors-opal/40 w-full rounded py-2 outline-none px-3"
            options={Object.values(ContactStatus)}
            name="status"
          />
        </Formik>
      </div>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className="flex items-center gap-5 justify-center">
        <button className="">
          <AppChatIcon className="w-5 h-5 text-colors-cadet" />
        </button>

        <button>
          <AppDeleteIcon className="w-5 h-5 text-colors-cadet" />
        </button>
      </div>
    ),
  },
]

export const ContactsPage = () => {
  const [open, setOpen] = useState(false)
  const { loading, getContactInfo, contacts, contactRequests, acceptContactRequest } =
    useContactContext()
  const { loading: authLoading, auth, firestoreDb } = useHvFirebaseContext()

  useEffect(() => {
    if (authLoading == false) {
      getContactInfo(firestoreDb, auth?.currentUser?.uid)
      // getConversationList()
    }
  }, [authLoading])

  const renderDrawerHeader = () => (
    <div className="flex justify-between items-center">
      <h1 className="font-bold">Contact Requests</h1>
      <button onClick={() => setOpen(false)}>
        <CloseOutlined />
      </button>
    </div>
  )

  const handleAccept = (request: any) => {
    acceptContactRequest(firestoreDb, request, auth?.currentUser)
  }

  return (
    <AgentHubLayout>
      <div className="w-full flex justify-center">
        <div className="w-full bg-light-white rounded shadow-lg px-10 pt-8 pb-2">
          <h1 className="font-extrabold text-3xl mb-1">Contacts</h1>
          <p className="text-sm text-colors-cadet mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid
            asperiores veniam quia nesciunt neque magni, eveniet nulla?
          </p>

          {!loading && (
            <Table
              loading={loading}
              className="translate-y-2"
              bordered
              columns={columns}
              dataSource={contacts}
            />
          )}
          <button
            onClick={() => setOpen(true)}
            className="text-primary text-sm font-medium -translate-y-8"
          >
            View Contact Requests
          </button>
        </div>
      </div>

      <ConfigProvider
        theme={{
          token: {
            fontFamily: '',
          },
        }}
      >
        <Drawer
          closable={false}
          title={renderDrawerHeader()}
          placement="left"
          onClose={() => setOpen(false)}
          open={open}
          zIndex={99999}
        >
          <>
            {/* <h1 className='mb-3 -translate-y-2 text-primary font-medium'>Total Requests : 20</h1> */}
            <div className="flex flex-col gap-8">
              {contactRequests.length > 0 ? (
                contactRequests.map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                      <Image
                        className="rounded-full"
                        preview={{
                          maskClassName: 'rounded-full',
                        }}
                        width="50px"
                        height="50px"
                        src={item?.photo}
                      />

                      <div>
                        <h1 className="mb-1 font-semibold">{item?.name}</h1>
                        <p className="text-xs text-colors-cadet">{item?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => handleAccept(item)}
                        className="bg-green-500 text-light-white rounded-full flex items-center justify-center w-6 h-6"
                      >
                        <CheckOutlined />
                      </button>

                      <button className="bg-red-500 text-light-white rounded-full flex items-center justify-center w-6 h-6">
                        <CloseOutlined />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </>
        </Drawer>
      </ConfigProvider>
    </AgentHubLayout>
  )
}
