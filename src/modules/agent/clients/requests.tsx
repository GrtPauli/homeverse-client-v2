import { HvCard } from '@/components'
import { HubLayout } from '@/components/layout/hub'
import React from 'react'

const AgentClientRequestsPage = () => {
  return (
    <HubLayout
        selectedKeys={["clients"]}
        headerTitle='Client Requests'
        headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
    >
      <div className="h-full flex w-full flex-col gap-5">
        <div className="lg:flex grid md:grid-cols-3 grid-cols-2 2xl:justify-start lg:justify-start sm:gap-5 gap-2">
          <HvCard
            title={0}
            subTitle="Total KOL / KOCs"
            icon={<></>}
          />
        </div>
      </div>
    </HubLayout>
  )
}

export default AgentClientRequestsPage