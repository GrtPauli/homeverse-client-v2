import { HvLoader, RegularLayout } from '@/components'
import React, { useEffect } from 'react'
import { Content, Hero } from './components'
import { useAgentContext } from './context'
import { UserType } from '../profile/model'

export const AgentsPage = () => {
  const { getAgents, loading } = useAgentContext()
  useEffect(() => {
    getAgents({ userType: UserType[1] as any })
  }, [])

  return (
    <div>
      {loading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={loading} size="lg" />
        </div>
      )}

      {!loading && (
        <RegularLayout>
          <div>
            <Hero />
            <Content />
          </div>
        </RegularLayout>
      )}
    </div>
  )
}
