import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { HvSearchIcon } from '@/assets/icons'
import Link from 'next/link'
import type { MenuProps } from 'antd'
import { Menu, ConfigProvider } from 'antd'

interface IProps {
  selectedKey?: string
  bgImg: any
  title: string | ReactNode
}

export const Hero: FC<IProps> = ({ selectedKey, bgImg, title }) => {
  const items: MenuProps['items'] = [
    {
      label: <Link href="/">Home</Link>,
      key: 'home',
    },
    {
      label: <Link href="/buy">Buy</Link>,
      key: 'buy',
    },
    {
      label: <Link href="/rent">Rent</Link>,
      key: 'rent',
    },
    {
      label: 'Sell',
      key: 'sell',
    },
    {
      label: 'Just Sold',
      key: 'just-sold',
    },
    {
      label: 'Home Value',
      key: 'home-value',
    },
  ]

  return (
    <div
      style={{ backgroundImage: `url(${bgImg.src})` }}
      className="bg-center bg-cover h-[450px] w-full"
    >
      <div className="text-light-white px-14 py-10 bg-black/20 flex flex-col items-center justify-center h-full w-full">
        <h1 className="font-black text-5xl text-center leading-normal mb-2">{title}</h1>

        <ConfigProvider
          theme={{
            token: {
              fontFamily: '',
              colorPrimary: '#fff',
              colorBorder: '#000',
              colorBorderSecondary: 'transparent',
              colorText: '#fff',
              fontSize: 15,
            },
          }}
        >
          <Menu
            selectedKeys={[selectedKey]}
            className="!bg-transparent !border-transparent !w-full !justify-center"
            mode="horizontal"
            items={items}
          />
        </ConfigProvider>

        <div className="w-[520px] mt-5 relative">
          <input
            placeholder="Adress, School"
            name="search"
            className="bg-white py-4 px-5 w-full rounded-full placeholder-slate-700"
          />

          <div className="absolute right-0 top-0 p-1 h-full">
            <button className="bg-primary rounded-full h-full py-3 px-4">
              <HvSearchIcon className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
