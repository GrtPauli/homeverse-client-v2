import { LoadingOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import HashLoader from 'react-spinners/HashLoader'

interface IProps {
  loading: boolean
  color?: 'primary' | 'white'
  size?: 'sm' | 'lg'
  loader2Size?: string
}

export const HvLoader: FC<IProps> = ({ loading, color = 'primary', size = 'sm' }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* <LoadingOutlined className='text-primary text-4xl'/> */}
      <HashLoader
        size={size == 'lg' ? 50 : 25}
        loading={loading}
        color={color == 'primary' ? '#FF5A3D' : '#ffffff'}
      />
    </div>
  )
}

export const HvLoader2: FC<IProps> = ({
  loading,
  color = 'primary',
  size = 'sm',
  loader2Size,
}) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <LoadingOutlined className={`text-primary text-${loader2Size ? loader2Size : '3xl'}`} />
    </div>
  )
}
