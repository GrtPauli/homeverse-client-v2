import { AgentHubLayout } from '@/components/layout/hub'
import React, { FC, useEffect } from 'react'
import { ConfigProvider, Empty, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { SaleListings } from './components/sale'
import { useListingContext } from '../context'
import { HvLoader, HvButton, HvEmpty } from '@/components'
import { Image } from 'antd'
import NoHome from '../../../assets/images/no-home (1).png'
import { useAuthContext } from '@/modules/auth/context'
import { NoListing } from '../components'
import { HvHomeIcon } from '@/assets/icons'
import Link from 'next/link'

interface IProps {
  agent?: boolean
}

export const MyListingsPage: FC<IProps> = ({ agent = false }) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <p className="font-medium">For Sale</p>,
      children: <SaleListings />,
    },
    {
      key: '2',
      label: <p className="font-medium">Sold</p>,
      children: <NoListing />,
    },
  ]

  const { getUserListings, loading, userListings } = useListingContext()
  const { firebaseInitLoading, firebaseAuth } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      agent == true
        ? getUserListings({ agentId: firebaseAuth?.currentUser?.uid })
        : getUserListings({ ownerId: firebaseAuth?.currentUser?.uid })
    }
  }, [firebaseInitLoading])

  return (
    <>
      {loading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={loading} size="lg" />
        </div>
      )}

      {!loading && (
        <AgentHubLayout>
          <div className="w-full">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="font-extrabold text-3xl mb-1">Listings</h1>
                <p className="text-sm text-colors-cadet">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo
                  aliquid asperiores veniam.
                </p>
              </div>

              <Link href="/dashboard/listings/create">
                <HvButton paddingY="py-3.5" fullWidth={false}>
                  Create Listing
                  <HvHomeIcon />
                </HvButton>
              </Link>
            </div>

            <div className="w-[100%] bg-light-white rounded-lg shadow-lg px-10 pb-8 pt-3">
              {userListings.length == 0 ? (
                <div className="py-14 text-center flex justify-center flex-col items-center">
                  <HvEmpty
                    description={
                      <p className="leading-7 text-sm">
                        You currently have no listings, click on the button above <br />
                        to create new listing.
                      </p>
                    }
                  />
                </div>
              ) : (
                <ConfigProvider
                  theme={{
                    token: {
                      fontFamily: '',
                      colorPrimary: '#FF5A3D',
                    },
                  }}
                >
                  <Tabs defaultActiveKey="1" items={items} />
                </ConfigProvider>
              )}
            </div>
          </div>
        </AgentHubLayout>
      )}
    </>
  )
}
