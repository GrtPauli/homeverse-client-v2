import React from 'react'
import { Footer } from '../footer'
import { CTA } from '@/modules/home/components'
import { AgentHeader } from '../navbar/agent'

interface IProps {
  children: React.ReactNode
  containerClassName?: string
  noFooter?: boolean
}

export const AgentHubLayout: React.FC<IProps> = ({
  children,
  containerClassName,
  noFooter = false,
}) => {
  return (
    <div className="bg-light-cultured-3">
      <AgentHeader />
      <div
        className={
          containerClassName
            ? containerClassName
            : 'bg-light-cultured-3 h-full pt-[100px] pb-[100px] px-12'
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
