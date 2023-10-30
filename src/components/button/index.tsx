import React, { FC, ReactNode, useEffect, useState } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { HvLoader, HvLoader2 } from '../loader'

interface IProps {
  children?: ReactNode
  outline?: boolean
  btnLight?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  title?: ReactNode
  loadingText?: string
  loading?: boolean
  fullWidth?: boolean
  paddingY?: string
  paddingX?: string
  textLg?: boolean
}

export const HvButton: FC<IProps> = ({
  outline,
  btnLight,
  className,
  children,
  onClick,
  type,
  disabled = false,
  title,
  loading,
  loadingText,
  fullWidth = true,
  textLg = false,
  paddingY,
  paddingX,
}) => {
  // const [isLoading, setLoading] = useState(loading)
  // useEffect(() => {
  //   setLoading(loading)
  // }, [loading])

  const regClassName = `${paddingY ? paddingY : 'py-3.5'} ${fullWidth ? 'w-full' : ''} 
  ${
    disabled
      ? 'bg-colors-cadet cursor-not-allowed text-light-white'
      : btnLight
      ? 'bg-white text-primary hover:bg-primary hover:shadow-lg hover:text-white duration-150 ease-in'
      : 'bg-primary text-light-white hover:bg-white hover:shadow-lg hover:text-primary duration-150 ease-in'
  }
  rounded-full ${paddingX ? paddingX : 'px-8'} gap-3 ${
    textLg ? 'text-base' : 'text-sm'
  } flex justify-center items-center font-bold`

  const loadingClassName = `${paddingY ? paddingY : 'py-3'} ${fullWidth ? 'w-full' : ''} 
  ${outline ? 'border-primary text-primary border' : 'bg-light-cultured-1'}
  rounded-full px-5 flex justify-center items-center cursor-not-allowed`

  return (
    <button
      className={className ? className : loading ? loadingClassName : regClassName}
      type={type ? type : 'button'}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <div className="flex gap-3 items-center">
          <HvLoader2 color="primary" loading={loading} size="sm" />
          {/* <LoadingOutlined style={{ fontSize: 25 }} spin />
          {loadingText ? loadingText : ''} */}
        </div>
      ) : title ? (
        title
      ) : (
        children
      )}
    </button>
  )
}
