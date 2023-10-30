import React, { useEffect, useState } from 'react'
import { AuthLayout, EmailAndPasswordForm, FormFooter } from './components'
import Image from 'next/image'
import Logo from '../../assets/images/logo.png'
import { ConfigProvider, Tabs, TabsProps } from 'antd'

const AuthPage = ({ id }: any) => {
  const [tab, setTab] = useState<string>()

  useEffect(() => {
    setTab(id)
  }, [])

  const items: TabsProps['items'] = [
    {
      key: 'signin',
      label: <p className="font-medium">Sign In</p>,
      children: <EmailAndPasswordForm id="signin" />,
    },
    {
      key: 'signup',
      label: <p className="font-medium">New Account</p>,
      children: <EmailAndPasswordForm id="signup" />,
    },
  ]

  return (
    <AuthLayout>
      <div className="w-full px-8 pb-10">
        <div className="flex mt-5 mb-3">
          <Image src={Logo} alt="logo" width={180} height={100} />
        </div>

        <ConfigProvider
          theme={{
            token: {
              fontFamily: '',
              colorPrimary: '#FF5A3D',
            },
          }}
        >
          <Tabs onChange={(key) => setTab(key)} defaultActiveKey={id} items={items} />
        </ConfigProvider>

        <FormFooter id={tab} />
      </div>
    </AuthLayout>
  )
}

export default AuthPage
