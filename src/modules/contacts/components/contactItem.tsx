import React from 'react'
import { useContactContext } from '../context'
import { Image } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const ContactItem = ({ contact, index }: any) => {
  const router = useRouter()
  const { setContact } = useContactContext()

  const navigateToMessage = (url: string) => {
    setContact(contact)
    router.push(url)
  }

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
          width="60px"
          height="60px"
          src={contact?.photo}
        />
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-dark-prussian-blue mb-1">
            {contact?.firstname} {contact?.lastname}
          </h1>
          <p className="">+2349134102236</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        {/* <Link href={`/dashboard/messages/room/${contact?.messageRoomId}`}> */}
        <button
          onClick={() => navigateToMessage(`/dashboard/messages/room/${contact?.messageRoomId}`)}
        >
          Chat
        </button>
        {/* </Link> */}
      </div>
    </div>
  )
}
