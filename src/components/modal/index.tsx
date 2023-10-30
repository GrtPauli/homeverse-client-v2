import { ConfigProvider, Modal, ModalProps } from 'antd'
import React, { FC, ReactNode } from 'react'

interface IProps extends ModalProps {
  open: boolean
  centered?: boolean
  title?: string
  onDismiss?: () => void
  width?: string | number
  children: ReactNode
  wrapClassName?: string
  className?: string
}

export const HvModal: FC<IProps> = ({
  open,
  title,
  children,
  onDismiss,
  centered = true,
  width,
  wrapClassName,
  className,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '',
        },
      }}
    >
      <Modal
        // zIndex={9999}
        {...props}
        open={open}
        centered={centered}
        width={width}
        // title={title}
        onCancel={onDismiss}
        footer={null}
        wrapClassName={wrapClassName ? wrapClassName : 'p-0'}
      >
        <div className="bg-dark-prussian-blue w-full px-5 py-4 text-light-white ">
          <h1 className="font-bold text-lg -mt-0.5">{title}</h1>
        </div>
        <div className={`px-5 py-5 ${className}`}>{children}</div>
      </Modal>
    </ConfigProvider>
  )
}
