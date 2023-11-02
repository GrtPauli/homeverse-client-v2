import { HubLayout } from '@/components/layout/hub'
import { useAuthContext } from '@/modules/auth/context'
import React, { useEffect } from 'react'
import { useAgentContext } from '../context'
import { HvCard, HvLoader } from '@/components'
import {HiUserGroup} from "react-icons/hi"

const AgentClientsPage = () => {
  const { getClients, initLoading, clients } = useAgentContext()
  const { firebaseInitLoading } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getClients()
    }
  }, [firebaseInitLoading])
  
  return (
    <>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}


      {!initLoading && (
        <HubLayout
          selectedKeys={["clients"]}
          headerTitle='My Clients'
          headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
        >
          <div className="h-full flex w-full flex-col gap-10">
            <div className="lg:flex grid md:grid-cols-3 grid-cols-2 2xl:justify-start lg:justify-start sm:gap-5 gap-2">
              <HvCard
                title={clients?.length || 0}
                subTitle="Total Clients"
                icon={<HiUserGroup className='text-primary text-2xl'/>}
              />
            </div>

            <HvCard>
              {/* <ClientRequestsTable/> */}
            </HvCard>
          </div>
        </HubLayout>
      )}
    </>

  )
}

export default AgentClientsPage