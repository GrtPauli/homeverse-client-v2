import React from 'react'
import BuyImg from '../../../assets/images/buy.jpg'

export const Hero = () => {
  return (
    <div
      className="bg-center bg-cover h-[350px] w-full"
      style={{ backgroundImage: `url(${BuyImg.src})` }}
    >
      <div className="text-light-white px-14 py-10">
        <h1 className="font-extrabold text-3xl mb-3">Agents</h1>
        <p className="w-[500px] leading-7 font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure unde excepturi voluptatem.
          Doloribus, neque. Iste ad saepe corrupti quibusdam blanditiis?
        </p>
      </div>
    </div>
  )
}
