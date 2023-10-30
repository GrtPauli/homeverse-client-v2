import { AgentHubLayout } from '@/components/layout/hub'
import React, { FC, useEffect } from 'react'
import { ConfigProvider, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { useListingContext } from './context'
import { HvLoader, HvButton, Footer, Header, RegularLayout } from '@/components'
import { Image } from 'antd'
import NoHome from '../../assets/images/no-home (1).png'
import { CTA } from '../home/components'
import { Content, Hero, ListItem, ListingsFilter } from './components'
import { useAuthContext } from '../auth/context'

interface IProps {
  type: 'sale' | 'rental'
}

export const ListingsPage: FC<IProps> = ({ type }) => {
  const { getListings, loading, listings } = useListingContext()
  const { firebaseInitLoading } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getListings()
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
        <RegularLayout className="pt-[100px]">
          {/* <Hero /> */}
          <ListingsFilter />
          <div className="bg-light-cultured-3 py-10 grid grid-cols-4 place-content-center place-items-center px-10">
            {listings.map((item, i) => (
              <ListItem item={item} key={i} />
            ))}
          </div>
          {/* <Content /> */}
        </RegularLayout>
      )}
    </>
  )
}
