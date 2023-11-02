import { HubLayout } from '@/components/layout/hub'
import React from 'react'

const AgentClientsPage = () => {
  return (
    <HubLayout
      selectedKeys={["clients"]}
      headerTitle='My Clients'
      headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
    >

    </HubLayout>
  )
}

export default AgentClientsPage