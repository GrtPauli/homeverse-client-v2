import { HvCard, HvLoader } from '@/components'
import { HubLayout } from '@/components/layout/hub'
import React, { useEffect } from 'react'
import {HiUserGroup} from "react-icons/hi"
import { ClientRequestsTable } from './components'
import { useAuthContext } from '@/modules/auth/context'
import { useAgentContext } from '../context'

const AgentClientRequestsPage = () => {
  const { getClientRequests, initLoading, clientRequests } = useAgentContext()
  const { firebaseInitLoading } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getClientRequests()
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
            selectedKeys={["clients", "clients-requests"]}
            headerTitle='Client Requests'
            headerSubTitle='Lorem ipsum dolor sit amet consectetur.'
        >
          <div className="h-full flex w-full flex-col gap-10">
            <div className="lg:flex grid md:grid-cols-3 grid-cols-2 2xl:justify-start lg:justify-start sm:gap-5 gap-2">
              <HvCard
                title={clientRequests?.length || 0}
                subTitle="Total Requests"
                icon={<HiUserGroup className='text-primary text-2xl'/>}
              />
            </div>

            <HvCard>
              <ClientRequestsTable/>
            </HvCard>
          </div>
        </HubLayout>
      )}
    </>
  )
}

export default AgentClientRequestsPage