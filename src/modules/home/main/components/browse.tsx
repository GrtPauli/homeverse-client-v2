import React, { FC } from 'react'
import HouseImg from '../../../../assets/images/property-1.jpg'
import { Image } from 'antd'
import Link from 'next/link'

export const BrowseHomes = () => {
  return (
    <div className="py-12 px-12">
      <h1 className="text-dark-prussian-blue font-black text-3xl">Browse Homes</h1>
      <p className="mt-2 text-colors-cadet text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, error!
      </p>

      <div className="grid grid-cols-4 gap-5 mt-10">
        <Category bgImg={HouseImg.src} title="Condos" />
        <Category bgImg={HouseImg.src} title="Condos" />
        <Category bgImg={HouseImg.src} title="Condos" />
        <Category bgImg={HouseImg.src} title="Condos" />
        <Category bgImg={HouseImg.src} title="Condos" />
        <Category bgImg={HouseImg.src} title="Condos" />
        <Category bgImg={HouseImg.src} title="Condos" />
        <Category bgImg={HouseImg.src} title="Condos" />
      </div>
    </div>
  )
}

interface CategoryProps {
  title: string
  bgImg: string
}

const Category: FC<CategoryProps> = ({ bgImg, title }) => {
  return (
    <Link
      href=""
      className="relative group font-black transition duration-300 ease-in text-lg text-white h-[200px] max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-xl"
    >
      <img
        src={bgImg}
        className="max-w-xs brightness-[.7] group-hover:underline group-hover:underline-offset-4 object-cover object-center transition duration-300 ease-in hover:scale-110"
        alt="Louvre"
      />

      <h1 className="absolute group-hover:underline transition duration-300 ease-in group-hover:underline-offset-4 top-5 left-5">
        {title}
      </h1>

      {/* <div
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full
          overflow-hidden bg-black bg-fixed opacity-30 transition duration-300
          ease-in-out hover:opacity-50"
      /> */}
    </Link>

    // <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat rounded-xl shadow-xl">
    //   <Image
    //     preview={false}
    //     src={HouseImg.src}
    //     className='max-w-xs object-cover object-center transition duration-300 ease-in-out hover:scale-110'
    //   />

    //   {/* <div
    //       className="absolute bottom-0 left-0 right-0 top-0 h-full w-full
    //       overflow-hidden bg-black bg-fixed opacity-30 transition duration-300
    //       ease-in-out hover:opacity-50"
    //   >

    //   </div> */}
    // </div>
  )
}
