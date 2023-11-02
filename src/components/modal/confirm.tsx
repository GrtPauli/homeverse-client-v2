import React, { useEffect, useState } from 'react'
import { ConfigProvider, Modal } from 'antd'
import { HvButton } from '../button'
import { CloseOutlined } from '@ant-design/icons'
import { createConfirmation } from "react-confirm";

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

interface IConfirmProps {
  message: string;
  content?: React.ReactNode;
  callback: (val?: boolean) => void;
}

const HvDialog: React.FC<IConfirmProps> = ({ message, content, callback }) => {
  const [show, setShow] = useState({ show: true, timestamp: 0 });

  useEffect(() => {
    setShow({ show: true, timestamp: Date.now() });
  }, []);

  const handleDismiss = (val?: boolean) => {
    callback(val);
    setShow({ show: false, timestamp: Date.now() });
  };

  return (
    <>
      {show.show && (
        <ConfigProvider
          theme={{
            token: {
              fontFamily: ""
            }
          }}
        >
          <Modal
            maskClosable={true}
            open={show.show}
            onCancel={() => handleDismiss()}
            footer={null}
            centered
            width={720}
            closable={false}
          >
            <div className="p-10">
              <div className="flex justify-between items-center mb-2">
                <h1 className="font-black text-2xl">Confirm To Proceed</h1>
                <button onClick={() => handleDismiss()}>
                  <CloseOutlined />
                </button>
              </div>

              <p className="text-base">{message}</p>

              {content}

              <div className="w-full flex justify-end gap-3 mt-14">
                <HvButton
                  fullWidth={false}
                  // loaderContainerClassName="w-[50px]"
                  onClick={() => handleDismiss(true)}
                  // btnType="danger"
                  title="Proceed"
                  // className="px-[45px] py-3"
                />

                <HvButton
                  onClick={() => handleDismiss()}
                  title="Cancel"
                  // className="px-[45px] py-3"
                  fullWidth={false}
                />
              </div>
            </div>
          </Modal>
        </ConfigProvider>
      )}
    </>
  );
};

export const HvConfirm = createConfirmation(HvDialog as any);