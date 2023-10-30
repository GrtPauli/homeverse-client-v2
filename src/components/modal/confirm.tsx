import React, { useEffect, useState } from 'react'
import { ConfigProvider, Modal } from 'antd'
import { HvButton } from '../button'
import { CloseOutlined } from '@ant-design/icons'

interface IProps {
  open: boolean
  centered?: boolean
  title?: string
  onDismiss?: () => void
  width?: string | number
  subTitle?: string
  onProceed: () => void
  proceedLoading?: boolean
}

export const HvConfirmModal: React.FC<IProps> = ({
  onProceed,
  subTitle,
  title,
  width,
  proceedLoading = false,
  open,
  onDismiss,
  centered = true,
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
        width={600}
        onCancel={onDismiss}
        footer={null}
        wrapClassName="p-0"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="font-bold text-2xl">{title}</h1>
            <button onClick={() => onDismiss()}>
              <CloseOutlined />
            </button>
          </div>

          <p>{subTitle}</p>

          <div className="w-full flex justify-end gap-3 mt-16">
            <HvButton outline onClick={() => onDismiss()} title="Cancel" fullWidth={false} />
            <HvButton
              onClick={() => onProceed()}
              loading={proceedLoading}
              title="Proceed"
              fullWidth={false}
            />
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  )
}
