import Image from 'next/image'
import React from 'react'
import ChatImg from '../../../assets/images/chat.png'

export const IntroBox = () => {
  return (
    <div className="bg-light-white h-full w-full flex flex-col justify-center items-center">
      <Image src={ChatImg} alt="Chat Image" width={200} height={200} />
      <h1 className="text-2xl font-extrabold text-dark-prussian-blue mt-2 mb-1">
        Chat on Homeverse
      </h1>
      <p className="text-sm text-colors-cadet">Click to enter or start a conversation</p>
    </div>
  )
}
