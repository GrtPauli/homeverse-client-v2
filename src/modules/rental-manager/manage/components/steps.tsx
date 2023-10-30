import { ConfigProvider, Steps } from 'antd'
import React, { FC } from 'react'
import { useRentalContext } from '../../context'

interface IProps {}

export const CreateSteps: FC<IProps> = ({}) => {
  const { step, stepPercent } = useRentalContext()

  return (
    <div className="bg-dark-prussian-blue w-full fixed z-30 mt-[60px] px-10 py-3">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FF5A3D',
            fontFamily: '',
            colorTextBase: '#fff',
          },
        }}
      >
        <Steps
          size="small"
          current={step}
          // percent={stepPercent}
          items={[
            {
              title: 'Property Info',
              description: '',
            },
            {
              title: 'Listing Details',
              // subTitle: 'Left 00:00:08',
              description: '',
            },
            {
              title: 'Lease',
              description: '',
            },
            {
              title: 'Media',
              description: '',
            },
            {
              title: 'Amenities',
              description: '',
            },
            {
              title: 'Final Details',
              description: '',
            },
            {
              title: 'Review',
              description: '',
            },
            {
              title: 'Publish',
              description: '',
            },
          ]}
        />
      </ConfigProvider>
    </div>
  )
}
