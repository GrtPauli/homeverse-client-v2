import React from 'react'
import { useContactContext } from '../context'
import { Image } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

export const RequestItem = ({ contactRequest, index }: any) => {
  const { acceptContactRequest } = useContactContext()

  return (
    <div
      className={`border-b pb-5 ${index == 0 ? 'mt-2' : 'mt-5'} flex justify-between items-center`}
    >
      <div className="flex gap-5 items-center">
        <Image
          className="rounded-full"
          preview={{
            maskClassName: 'rounded-full',
          }}
          width="80px"
          height="80px"
          src={contactRequest?.photo}
        />
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-dark-prussian-blue mb-1">
            {contactRequest?.firstname} {contactRequest?.lastname}
          </h1>
          <p className="">+2349134102236</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={() => acceptContactRequest(contactRequest._id)}
          className="bg-green-500 text-light-white rounded-full flex items-center justify-center w-8 h-8"
        >
          <CheckOutlined />
        </button>

        <button className="bg-red-500 text-light-white rounded-full flex items-center justify-center w-8 h-8">
          <CloseOutlined />
        </button>
      </div>
    </div>
  )
}
