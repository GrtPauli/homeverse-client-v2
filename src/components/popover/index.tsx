import React, { FC, ReactNode } from 'react'
import { ConfigProvider, MenuProps, Popover, PopoverProps } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'

interface IProps extends PopoverProps {
  children: ReactNode
  wrapper: ReactNode
  placement?: TooltipPlacement
  trigger?: 'click' | 'hover' | 'focus' | 'contextMenu'
}

export const HvPopover: FC<IProps> = ({ children, wrapper, placement, trigger, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '',
          colorPrimary: '#FF7D01',
        },
      }}
    >
      <Popover
        trigger={trigger ? trigger : 'hover'}
        zIndex={4000}
        placement={placement ? placement : 'bottomRight'}
        content={children}
        overlayInnerStyle={{ padding: 0, paddingTop: 0 }}
        overlayClassName="cus-sm:relative cus-sm:left-0 cus-sm:w-full"
        {...props}
      >
        {wrapper}
      </Popover>
    </ConfigProvider>
  )
}
