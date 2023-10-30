import React from 'react'
// import { TopBanner } from './topbanner'
import { Navbar } from './navbar'
import { TopBanner } from '../regular/topbanner'

interface Props {}

export const RentalManagerHeader: React.FC<Props> = ({}) => {
  return (
    <header className="header fixed w-full shadow-md z-50">
      <TopBanner />
      <Navbar />
    </header>
  )
}
