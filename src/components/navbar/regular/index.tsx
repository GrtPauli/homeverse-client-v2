import React from 'react'
import { TopBanner } from './topbanner'
import { Navbar } from './navbar'

interface Props {
  noBanner?: boolean
}

export const Header: React.FC<Props> = ({ noBanner = false }) => {
  return (
    <header className="header fixed w-full shadow-md z-50">
      {noBanner == false && <TopBanner />}
      <Navbar />
    </header>
  )
}
