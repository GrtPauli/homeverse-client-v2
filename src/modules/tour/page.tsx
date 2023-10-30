import { RegularLayout } from '@/components'
import { AgentHubLayout } from '@/components/layout/hub'
import React, { FC, useEffect } from 'react'
import { useAuthContext } from '@/modules/auth/context'
import { HvLoader } from '@/components'
import { useTourContext } from './context'
import { TourTab, ToursTable } from './components'
import BuyImg from '../../assets/images/buy.jpg'

interface IProps {
  agent?: boolean
}

const ToursPage: FC<IProps> = ({ agent = false }) => {
  const { initLoading, getTourInfo, tours, tourRequests, getTours } = useTourContext()
  const { firebaseInitLoading, firebaseAuth } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      agent == true
        ? getTours({ agentId: firebaseAuth?.currentUser?.uid })
        : getTours({ touristId: firebaseAuth?.currentUser?.uid })
      // agent == true
      //   ? getTourInfo({ agentId: firebaseAuth?.currentUser?.uid })
      //   : getTourInfo({ touristId: firebaseAuth?.currentUser?.uid })
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
        <>
          {agent ? (
            <AgentHubLayout>
              <div>
                <h1 className="font-extrabold text-3xl mb-1">Tours</h1>
                <p className="text-sm text-colors-cadet mb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo
                  aliquid asperiores veniam quia nesciunt neque magni, eveniet nulla?
                </p>

                <div className="w-[100%] bg-light-white rounded-lg shadow-lg px-10 py-5">
                  <ToursTable agent={agent} />
                </div>
              </div>
            </AgentHubLayout>
          ) : (
            <RegularLayout className="pt-[100px]">
              <div>
                <div
                  className="bg-center bg-cover h-[350px] w-full"
                  style={{ backgroundImage: `url(${BuyImg.src})` }}
                >
                  <div className="text-light-white px-14 py-10">
                    <h1 className="font-extrabold text-3xl mb-3">Tours</h1>
                    <p className="w-[500px] leading-7 font-light">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde excepturi
                      voluptatem. Doloribus, neque. Iste ad saepe corrupti quibusdam blanditiis?
                    </p>
                  </div>
                </div>

                <div className="px-10">
                  <div className="bg-light-white w-full -translate-y-10 shadow-lg rounded-lg px-10 pt-3 pb-5">
                    <ToursTable agent={agent} />
                  </div>
                </div>
              </div>
            </RegularLayout>
          )}
        </>
      )}
    </>
  )
}

export default ToursPage
