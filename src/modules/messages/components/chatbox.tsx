import React from 'react'
import { useSession } from 'next-auth/react'

export const ChatBox = ({ message }: any) => {
  const session: any = useSession()

  return (
    <div
      className={`flex gap-3 ${message?.from?.includes(session.data?.user?._id) && 'self-end'}`}
    >
      <div
        className={`py-1.5 px-3 gap-3 rounded-b-lg flex justify-between items-end
                ${
                  message?.from?.includes(session.data?.user?._id)
                    ? 'bg-primary rounded-tl-lg text-light-white'
                    : 'bg-light-cultured-2 rounded-tr-lg text-dark-prussian-blue'
                } `}
      >
        <div className="pb-0.5">
          <h1 className="text-[13px] font-medium">{message?.msg}</h1>
        </div>
        <p className="text-[11px] font-bold">6:30 am</p>
      </div>
    </div>
  )
}
