import { HvButton, HvLoader, RegularLayout } from '@/components'
import React, { useEffect } from 'react'
import { useAuthContext } from '../auth/context'
import { useAgentContext } from './context'

const AgentDetailPage = ({id}: any) => {
  const { getAgent, initLoading, agent, sendAgentRequest, loading } = useAgentContext()
  const { firebaseInitLoading } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getAgent(id)
    }
  }, [firebaseInitLoading])
  
  return (
    <div>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}
      
      {!initLoading && (
        <RegularLayout> 
          <div className='flex flex-col items-center justify-center'>
            {agent.displayName}
            <HvButton
              loading={loading}
              onClick={() => sendAgentRequest()} 
              title="Send Agent Request" 
              fullWidth={false}
            />
          </div>
        </RegularLayout>
      )}
    </div>
  )
}

export default AgentDetailPage