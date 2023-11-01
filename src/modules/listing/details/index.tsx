import { AgentHubLayout } from '@/components/layout/hub2'
import React, { FC, useEffect } from 'react'
import { DetailsContent } from './components'
import { useListingContext } from '../context'
import { HvLoader, Footer, Header } from '@/components'
import { CTA } from '@/modules/home/components'
import { useAuthContext } from '@/modules/auth/context'
import { useChatContext } from '@/modules/chat/context'

interface IProps {
  id: string
  agent?: boolean
}

export const ListingDetailPage: FC<IProps> = ({ id, agent = false }) => {
  const { initLoading, getListing, listing } = useListingContext()
  const { firebaseInitLoading } = useAuthContext()

  // useEffect(() => {
  //   if (firebaseInitLoading == false) {
  //     getListing(id)
  //   }
  // }, [firebaseInitLoading])

  return (
    <>
      {/* {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )} */}

      <DetailsContent listing={listing} />

      {/* {!initLoading && (
        <>
          {agent ? (
            <AgentHubLayout containerClassName="pt-[100px">
              <DetailsContent listing={listing} agent />
            </AgentHubLayout>
          ) : (
            <div className="w-full bg-light-cultured-3 relative">
              <Header />

              <div className="pt-[100px]">
                <DetailsContent listing={listing} />
              </div>

              <div>
                <CTA />
                <Footer />
              </div>
            </div>
          )}
        </>
      )} */}
    </>
  )
}
