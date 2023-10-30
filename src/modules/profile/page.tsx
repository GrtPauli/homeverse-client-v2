import { Image } from 'antd'
import React, { FC, useEffect } from 'react'
import { useProfileContext } from './context'
import { useAuthContext } from '../auth/context'
import { HvLoader } from '@/components'
import { AgentHubLayout } from '@/components/layout/hub'
import { ProfileContent } from './components'

interface IProps {}

export const ProfilePage: FC<IProps> = ({}) => {
  const { firebaseInitLoading, firebaseAuth, userType } = useAuthContext()
  const { getUserProfile, initLoading, profile } = useProfileContext()

  // useEffect(() => {
  //   if (firebaseInitLoading == false) {
  //     getUserProfile()
  //   }
  // }, [firebaseInitLoading])

  return (
    <>
      {/* {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )} */}

      {/* {!initLoading && ( */}
      <AgentHubLayout>
        <ProfileContent />
      </AgentHubLayout>
      {/* )} */}
    </>
  )
}
