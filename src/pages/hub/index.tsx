import { HubLayout } from '@/components/layout/hub'
import React from 'react'

const Hub = () => {
  return (
    <HubLayout 
      selectedKeys={["dashboard"]}
      headerTitle='Dashboard'
      headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
    >

    </HubLayout>
  )
}

export default Hub