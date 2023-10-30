import React, { FC, ReactNode } from 'react'
// import Empty from '../../assets/images/empty.png'
import Image from 'next/image'
import { ConfigProvider, Empty } from 'antd'

interface IProps {
  className?: string
  description: ReactNode
}

export const HvEmpty: FC<IProps> = ({ className, description }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '',
        },
      }}
    >
      <Empty
        className="!flex !justify-center !flex-col !items-center"
        imageStyle={{ width: '200px', height: '200px' }}
        description={<div>{description}</div>}
      />
    </ConfigProvider>
    // <div
    //   className={`${className} flex w-full items-center justify-center flex-col gap-5 pt-10 pb-20`}
    // >
    //   <Image src={Empty} alt="Empty Image" width={180} />
    //   <p className="font-medium">No Data</p>
    // </div>
  )
}
