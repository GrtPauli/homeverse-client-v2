import { Footer, Header } from '@/components'
import React from 'react'
import { Hero, SellWithAgent, SellYourSelf } from './components'

export const SellPage = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="pt-[109px]">
        <Hero />
        <SellWithAgent />
        <SellYourSelf />
      </div>
      <Footer />
    </div>
  )
}
