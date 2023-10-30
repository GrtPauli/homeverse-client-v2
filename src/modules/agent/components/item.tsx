import React, { FC } from 'react'
import User from '../../../assets/images/user.png'
import { Image } from 'antd'
import { Rate } from 'antd'
import { IAgent } from '../model'

interface IProps {
  item: IAgent
}

export const AgentListItem: FC<IProps> = ({ item }) => {
  return (
    <div className="rounded-lg bg-light-white shadow-lg p-5 hover:text-primary hover:bg-colors-cadet/5 cursor-pointer duration-200 ease-in">
      <div className="flex gap-3 items-center">
        <Image
          width="100px"
          height="100px"
          src={item.photo || User.src}
          className="rounded-full object-cover object-center"
        />
        <div className="flex flex-col gap-1">
          <h1 className="font-bold">{item.displayName}</h1>
          <div className="flex items-center gap-2">
            <Rate className="!text-[15px]" allowHalf defaultValue={2.5} />
            <p className="text-[13px] text-colors-cadet leading-none mt-1">5 Reviews</p>
          </div>
          <p className="text-[13px] text-colors-cadet">{item.phone}</p>
          <p className="text-[13px] text-colors-cadet">Nigeria, Abuja, Kuje.</p>
        </div>
      </div>
    </div>
  )
}
