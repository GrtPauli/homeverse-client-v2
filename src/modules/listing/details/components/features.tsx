import { CaretRightOutlined } from '@ant-design/icons'
import type { CSSProperties, FC } from 'react'
import React from 'react'
import type { CollapseProps } from 'antd'
import { Collapse, theme } from 'antd'
import { IListing } from '../../model'

interface IProps {
  listing: Partial<IListing>
}

export const ListingFeatures: FC<IProps> = ({ listing }) => {
  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: <p>Appliances</p>,
      children: (
        <div className="flex gap-3 px-6">
          {listing.appliances.map((item, i) => (
            <p key={i}>
              {item} {i + 1 !== listing.appliances.length && ','}
            </p>
          ))}
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '2',
      label: <p>Interior Details</p>,
      children: (
        <div className="flex justify-between px-6">
          <div>
            <ul className="list-disc">
              <p>Alarm System, Cable TV, Elevator, Fire Sprinkler</p>
            </ul>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '3',
      label: <p>Building and Construction</p>,
      children: (
        <div className="flex justify-between px-8">
          <div>
            <ul className="grid grid-cols-2 gap-x-10">
              <li className="list-disc">Year built : 2000</li>
              <li className="list-disc">Roof : Membrane</li>
              <li className="list-disc">Architectural style : Other</li>
            </ul>
          </div>
        </div>
      ),
      style: panelStyle,
    },
    {
      key: '4',
      label: <p>Other</p>,
      children: (
        <div className="flex justify-between px-8">
          <div>
            <ul className="grid grid-cols-2 gap-x-10">
              <li className="list-disc">Accessibility features : Accessible Elevator Installed</li>
              <li className="list-disc">Utilities : Cable Available</li>
              <li className="list-disc">Neighborhoods : Ketchum</li>
              <li className="list-disc">Neighborhoods : Ketchum</li>
            </ul>
          </div>
        </div>
      ),
      style: panelStyle,
    },
  ]

  const { token } = theme.useToken()

  const panelStyle: React.CSSProperties = {
    marginBottom: 20,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  }

  return (
    <div className="pt-3">
      <Collapse
        bordered={false}
        defaultActiveKey={['1', '2']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      />
    </div>
  )
}
