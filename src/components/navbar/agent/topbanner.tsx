import React from 'react'
import {
  HvFacebookIcon,
  InstagramIcon,
  LocationIcon,
  MailIcon,
  PinterestIcon,
  HvTwitterIcon,
} from '@/assets/icons'
import Link from 'next/link'

export const AgentTopBanner = () => {
  return (
    <div className="text-light-white bg-primary py-2.5 px-12 flex justify-center items-center w-full">
      <h1 className="font-semibold text-sm flex items-center">
        Keep tabs on the latest tips, guides and strategies for success.
        <Link href="">
          <p className="text-primar ml-2 underline">Visit Home Base</p>
        </Link>
      </h1>
    </div>
  )
}
