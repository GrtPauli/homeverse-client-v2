import React, { ReactNode } from 'react'
import { Header } from '../navbar/regular'
import { Footer } from '../footer'

interface IProps {
  children: ReactNode
  page?: 'agents' | 'offers' | 'transactions' | 'profile'
}

export const FinderLayout: React.FC<IProps> = ({ children, page }) => {
  return (
    <div>
      <Header />
      <div className="bg-light-cultured-2 pt-[109px] min-h-[100vh] pb-20">{children}</div>
      <Footer />
    </div>
  )
}
