import React from 'react'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { ConfigProvider, Layout, Menu, theme } from 'antd'
import Link from 'next/link'
const { Header, Content, Footer, Sider } = Layout

interface IProps {
  children: React.ReactNode
}

export const AgentLayout: React.FC<IProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: '',
        },
      }}
    >
      <Layout hasSider className="bg-light-cultured-3">
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 30,
            bottom: 0,
            borderTopRightRadius: 100,
          }}
        >
          <div className="px-1">
            <div className="pt-20">
              <Menu
                className="shadow-lg"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={items}
              />
            </div>
          </div>
        </Sider>

        <Layout className="bg-light-cultured-3" style={{ marginLeft: 200 }}>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content className="!bg-light-cultured-3" style={{ overflow: 'initial' }}>
            <div className="min-h-screen pt-[30px]">ff</div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

const items: MenuProps['items'] = [
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
  {
    key: 2,
    icon: React.createElement(UserOutlined),
    label: 'Messages',
  },
  {
    key: 2,
    icon: React.createElement(UserOutlined),
    label: 'Account',
  },
  {
    key: 2,
    icon: React.createElement(UserOutlined),
    label: 'Contacts',
  },
  {
    key: 2,
    icon: React.createElement(UserOutlined),
    label: 'Agent Profile',
  },
  {
    key: 2,
    icon: React.createElement(UserOutlined),
    label: 'Advertising',
  },
]
