import React from 'react'
import Bg from '../../assets/images/slide-2.jpg'
import { HvButton } from '@/components'
import AgentImg from '../../assets/images/agent.png'
import Image from 'next/image'

const AgentAccount = () => {
  return (
    <div
      className="w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      <div className="bg-black/50 h-full w-full">
        <div className="flex items-center justify-between px-20 py-10">
          <div className="flex items-start flex-col text-light-white">
            <h1 className="font-extrabold text-[45px] mb-2 leading-tight">
              Create your real estate <br />
              agent profile
            </h1>
            <p className="mb-10 w-[500px] leading-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat hic cum neque
              architecto. Quaerat natus nesciunt incidunt culpa architecto officia!
            </p>
            <HvButton
              textLg
              fullWidth={false}
              paddingX="px-16"
              paddingY="py-[18px]"
              title="Sign Up Now"
            />
          </div>

          <Image src={AgentImg} alt="Agent" width={400} height={200} />
        </div>
      </div>
    </div>
  )
}

export default AgentAccount
