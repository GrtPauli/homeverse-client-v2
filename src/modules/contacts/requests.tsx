import React from 'react'
import { useContactContext } from './context'
import { Image } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { RequestItem } from './components'

export const ContactRequests = () => {
  const { contactRequests } = useContactContext()

  return (
    <div className="flex flex-col">
      {contactRequests.map((contactRequest, i) => (
        <RequestItem key={i} contactRequest={contactRequest} index={i} />
      ))}
    </div>
  )
}
