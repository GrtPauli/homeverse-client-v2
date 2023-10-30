import React from 'react'
import { Footer } from '../footer'
import { RentalManagerHeader } from '../navbar/rental-manager'

interface IProps {
  children: React.ReactNode
  containerClassName?: string
  noFooter?: boolean
}

export const RentalManagerLayout: React.FC<IProps> = ({
  children,
  containerClassName,
  noFooter = false,
}) => {
  return (
    <div className="bg-light-cultured-3">
      <RentalManagerHeader />
      <div
        className={
          containerClassName
            ? containerClassName
            : 'bg-light-cultured-3 h-full pt-[140px] pb-[100px] px-12'
        }
      >
        {children}
      </div>

      {noFooter == false && (
        <div>
          {/* <CTA/> */}
          <Footer />
        </div>
      )}
    </div>
  )
}
