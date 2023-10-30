import React from 'react'
import { AgentTopBanner } from './topbanner'
import { AgentNavbar } from './navbar'

interface Props {
  noBanner?: boolean
}

export const AgentHeader: React.FC<Props> = ({ noBanner = false }) => {
  return (
    <header className="header fixed w-full shadow-md z-50">
      {/* {noBanner == false && <AgentTopBanner />} */}
      <AgentNavbar />
    </header>
  )
}
