import React, { FC } from 'react'
import { ConfigProvider, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { Tours } from './tours'
import { TourRequests } from './tour-requests'

export interface IProps {
  agent: boolean
}

export const TourTab: FC<IProps> = ({ agent }) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <p className="font-medium">Tour Requests</p>,
      children: <TourRequests agent={agent} />,
    },
    {
      key: '2',
      label: <p className="font-medium">Tours</p>,
      children: <Tours agent={agent} />,
    },
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '',
          colorPrimary: '#FF5A3D',
        },
      }}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </ConfigProvider>
  )
}
