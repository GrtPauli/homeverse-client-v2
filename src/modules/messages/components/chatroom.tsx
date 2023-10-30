import React, { useEffect } from 'react'
import User from '../../../assets/images/user.png'
import { Image } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { useMessageContext } from '../context'
import { ChatBox } from './chatbox'

export const ChatRoom = ({ userId }: any) => {
  const { getHistoryMessages, historyMessages } = useMessageContext()

  useEffect(() => {
    getHistoryMessages(userId)
  }, [])

  return (
    <div className="h-full w-full relative bg-light-white">
      <div className="bg-light-white border-b py-3 px-5 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Image
            className="rounded-full"
            preview={{
              maskClassName: 'rounded-full',
            }}
            width="30px"
            height="30px"
            src={User?.src}
          />

          <div className="flex flex-col">
            <h1 className="font-bold text-base text-dark-prussian-blue"></h1>
            {/* <p className='text-xs text-colors-cadet'>+2349134102236</p> */}
          </div>
        </div>

        <div>
          <MoreOutlined className="text-[26px]" />
        </div>
      </div>

      <div className="flex flex-col gap-5 px-5 pt-5 bg-light-white overflow-scroll">
        {historyMessages?.slice(-5).map((item, i) => <ChatBox key={i} message={item} />)}
      </div>

      <div className="absolute bg-light-white py-4 px-5 w-full bottom-0 border-t">
        <input
          type="text"
          className="w-full rounded-md h-[45px] outline-none bg-light-cultured-2 px-5 text-sm placeholder-slate-600"
          placeholder="Type Message"
        />
      </div>
    </div>
  )
}
