import type { MenuProps } from 'antd'
import { Menu, ConfigProvider } from 'antd'

interface CourseMenuProps {
  selectedKey?: string
  selectedKeys?: string[]
}

export const RentalMenu = ({ selectedKey, selectedKeys }: CourseMenuProps) => {
  const items: MenuProps['items'] = [
    {
      label: 'ABOUT OVERVIEW',
      key: 'about-overview',
    },
    {
      label: 'VISION & MISSION',
      key: 'vision-mission',
    },
    {
      label: 'OUR ACHIEVEMENTS',
      key: 'entry-requirements',
    },
  ]

  return (
    <div className="bg-transparent shadow-md w-full px-8 mt-10">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: 'red',
            // colorTextBase: 'white',
            colorBorder: 'transparent',
            fontFamily: '',
            fontSize: 13,
          },
        }}
      >
        <Menu
          selectedKeys={(selectedKeys as any) || [selectedKey]}
          className="!bg-transparent !border-transparent"
          mode="horizontal"
          items={items}
        />
      </ConfigProvider>
    </div>
  )
}
