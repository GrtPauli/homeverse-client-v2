import React, { FC, ReactNode } from 'react'
import { Header } from '../navbar/regular'
import { Footer } from '../footer'

interface IProps {
  children: ReactNode
  className?: string
  noFooter?: boolean
}

export const RegularLayout: FC<IProps> = ({ children, className, noFooter = false }) => {
  return (
    <div className="w-full">
      <Header />
      <div
        className={
          className ? className : 'bg-light-cultured-3 h-full pt-[140px] pb-[100px] px-12'
        }
      >
        {children}
      </div>
      {!noFooter && <Footer />}
    </div>
  )
}
