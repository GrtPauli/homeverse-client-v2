import React from 'react'
import {
  HvFacebookIcon,
  InstagramIcon,
  LocationIcon,
  MailIcon,
  PinterestIcon,
  HvTwitterIcon,
} from '@/assets/icons'

export const TopBanner = () => {
  return (
    <div className="bg-dark-prussian-blue py-3 px-12 text-light-white flex justify-between items-center w-full">
      <ul className="flex items-center gap-5">
        <li className="flex items-center gap-2 text-xs font-bold">
          <MailIcon className="w-4 h-4 text-primary" />
          <p>info@homeverse.com</p>
        </li>

        <li className="flex items-center gap-2 text-xs font-bold">
          <LocationIcon className="w-4 h-4 text-primary" />
          <address>15/A, Nest Tower, NYC</address>
        </li>
      </ul>

      <ul className="flex items-center gap-3 text-sm">
        <li>
          <HvFacebookIcon className="w-4 h-4" />
        </li>

        <li>
          <HvTwitterIcon className="w-4 h-4" />
        </li>

        <li>
          <InstagramIcon className="w-4 h-4" />
        </li>

        <li>
          <PinterestIcon className="w-5 h-5" />
        </li>
      </ul>
    </div>
  )
}
