import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { ConfigProvider, Layout, Menu } from 'antd'
import Link from 'next/link'
import { Image } from 'antd'
import Logo from '../../assets/images/logo-light.png'
import UserImg from "../../assets/images/user.png"
import { BsBell, BsFillHousesFill, BsSearch, BsFillHouseAddFill, BsFillHouseFill } from 'react-icons/bs'
import { HvSearchInput } from '../input'
import { MdSpaceDashboard } from "react-icons/md"
import { BiSolidOffer, BiSolidUserCircle, BiSolidContact } from "react-icons/bi"
import { SiMoneygram } from "react-icons/si"
import { useAuthContext } from '@/modules/auth/context'

const { Content, Footer, Sider } = Layout

interface IProps {
  children: React.ReactNode
  selectedKeys: string[]
  headerTitle: string
  headerSubTitle: string
}

export const HubLayout: React.FC<IProps> = ({ children, selectedKeys, headerSubTitle, headerTitle }) => {
  
  const {firebaseAuth} = useAuthContext()
  
  return (
    <div className='hub-layout'>
      <ConfigProvider theme={{ token: { fontFamily: "" } }}>
        <Layout hasSider className='!bg-light-cultured-3'>
          <Sider
            className="bg-light shadow-md !w-[20%] cus-md2:hidden !min-w-[20%] !max-w-[20%] 3xl:!w-[18%] 3xl:!min-w-[18%] 3xl:!max-w-[18%]"
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              borderTopRightRadius: 100
            }}
          >
            <div className="flex flex-col w-[20%] 3xl:w-[18%] h-full justify-between fixed">
              <Link href={"/"}>
                <div className="pt-8 pr-[30px] fixed top-0 w-[20%] 3xl:w-[18%] flex justify-center items-center">
                  <Image src={Logo.src} alt="logo" width={180} height={45} />
                </div>
              </Link>

              <>
                  <div className={`overflow-y-auto small-scroll h-full mt-[100px]`}>
                      <div className="px-2">
                        <Menu
                            className="bg-light w-full text-alt-dark"
                            defaultSelectedKeys={selectedKeys}
                            mode="inline"
                            theme="light"
                            items={items}
                            defaultOpenKeys={selectedKeys}
                        />
                      </div>
                  </div>
  
                  <div className="px-2 w-full border-t">
                      <Menu
                          className="bg-light w-full text-alt-dark"
                          // defaultSelectedKeys={[`${router.pathname}`]}
                          mode="inline"
                          theme="light"
                          items={bottomItems}
                      />
                  </div>
              </>
            </div>
          </Sider>

          <Layout className='!bg-light-cultured-3'>
            <Content>
              <div className="flex min-h-screen">
                <div className="w-[20%] 3xl:w-[18%] cus-md2:hidden"/>
                <div className="w-[80%] 3xl:w-[82%] cus-md2:w-full flex flex-col p-[30px]">
                  <Header headerSubTitle={headerSubTitle} headerTitle={headerTitle}/>
                  <div className="mt-5 h-full">{children}</div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  )
}

const Header = ({ headerSubTitle, headerTitle }: any) => {
  const {firebaseAuth} = useAuthContext()

  return (
    <div className='flex justify-between items-cente'>
      <div>
        <h1 className='font-black text-3xl'>{headerTitle}</h1>
        <p>{headerSubTitle}</p>
      </div>

      <div className='flex items-center gap-5'>
        <BsSearch className="text-lg"/>
        <BsBell className="text-xl" />
        <div className='flex items-end gap-3'>
          <Image src={firebaseAuth?.currentUser?.photoURL} alt="user" width={40} height={40} className='rounded-full' />
          <div>
            <h1 className='font-bold text-base'>{firebaseAuth?.currentUser?.displayName}</h1>
            <p className='text-[13px] text-colors-cadet'>{firebaseAuth?.currentUser?.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const items: MenuProps['items'] = [
  {
    key: "dashboard",
    icon: <MdSpaceDashboard className='!text-lg'/>,
    label: <Link href="/hub">Dashboard</Link>,
  },
  {
    key: "listings",
    icon: <BsFillHousesFill className='!text-lg'/>,
    label: "Listings",
    children: [
      {
        key: "my-listings",
        icon: <BsFillHouseFill className='!text-lg'/>,
        label: <Link href="/hub/listings">My Listings</Link>,
      },
      {
        key: "create-listing",
        icon: <BsFillHouseAddFill className='!text-lg'/>,
        label: <Link href="/hub/listings/create">Create Listing</Link>,
      }
    ]
  },
  {
    key: "offers",
    icon: <BiSolidOffer className='!text-xl'/>,
    label: 'Offers',
  },
  {
    key: "transactions",
    icon: <SiMoneygram className='!text-lg'/>,
    label: 'Transactions',
  },
  {
    key: "clients",
    icon: <BiSolidContact className='!text-xl'/>,
    label: <Link href="/hub/clients">Clients</Link>,
  },
  {
    key: "profile",
    icon: <BiSolidUserCircle className='!text-xl'/>,
    label: 'Profile',
  },
]

const bottomItems: MenuProps['items'] = [
    {
      key: 1,
      icon: React.createElement(UserOutlined),
      label: <Link href="">Dashboard</Link>,
    },
    {
      key: 2,
      icon: React.createElement(UserOutlined),
      label: 'Listings',
    },

]