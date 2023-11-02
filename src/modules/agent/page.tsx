import { HvLoader, RegularLayout } from '@/components'
import React, { useEffect } from 'react'
import { AgentListItem, AgentsFilter, Content, Hero } from './components'
import { useAgentContext } from './context'
import { UserType } from '../profile/model'
import { useAuthContext } from '../auth/context'

export const AgentsPage = () => {
  const { getAgents, loading, agents } = useAgentContext()
  const { firebaseInitLoading } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getAgents()
    }
  }, [firebaseInitLoading])

  return (
    <div>
      {loading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={loading} size="lg" />
        </div>
      )}

      {!loading && (
        <RegularLayout className="pt-[100px]">
          <AgentsFilter/>

          <div className="px-10 w-full flex flex-wrap gap-10 justify-center items-center mt-14">
            {agents?.map((item, i) => (
              <AgentListItem key={i} item={item} />
            ))}
          </div>
        </RegularLayout>
      )}
    </div>
  )
}
