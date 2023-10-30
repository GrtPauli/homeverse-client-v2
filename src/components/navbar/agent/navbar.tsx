import React from 'react'
import Logo from '../../../assets/images/logo-light.png'
import Image from 'next/image'
import Link from 'next/link'
import UserProfile from '../user'
import { HvButton } from '@/components/button'
import { useAuthContext } from '@/modules/auth/context'

export const AgentNavbar = () => {
  const { signUserOut } = useAuthContext()

  const renderContent = () => {
    return (
      <div className="w-[280px]">
        <div className="p-[5px]">
          <Link href="/dashboard/profile">
            <div className="px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150">
              <h1 className="font-semibold mb-0.5">Profile</h1>
              <p className="text-xs text-colors-cadet">View and edit your info</p>
            </div>
          </Link>

          <Link href="/dashboard/past-sales">
            <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
              <h1 className="font-semibold mb-0.5">Past Sales</h1>
              <p className="text-xs text-colors-cadet">View sales history</p>
            </div>
          </Link>

          <Link href="/dashboard/settings">
            <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
              <h1 className="font-semibold mb-0.5">Settings</h1>
              <p className="text-xs text-colors-cadet">Manage your account</p>
            </div>
          </Link>
        </div>

        <div className="text-[13px] border-t py-3 px-3">
          <HvButton onClick={() => signUserOut()} paddingY="py-3" title="Sign Out" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-dark-prussian-blue py-1.5 px-12 flex justify-between items-center w-full shadow-md">
      <div className="flex items-center gap-12">
        <Image src={Logo} alt="logo" width={180} height={80} />

        <div className="flex gap-8 items-center text-light-white">
          <Link href="">
            <p className="font-regular text-[15px]">Dashboard</p>
          </Link>
          <Link href="">
            <p className="font-regular text-[15px]">Listings</p>
          </Link>
          <Link href="/dashboard/tours">
            <p className="font-regular text-[15px]">Tours</p>
          </Link>
          <Link href="">
            <p className="font-regular text-[15px]">Contacts</p>
          </Link>
          <Link href="">
            <div className="flex items-center gap-3">
              <p className="font-regular text-[15px]">Messages</p>
              <div className="flex text-[13px] rounded font-bold items-center text-dark-black justify-center py-0.5 px-2 bg-light-cultured-3">
                0
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-light-white">
          <p className="font-regular text-[15px]">Help</p>
          {/* <ChevronDownIcon className='w-4 h-4'/> */}
        </div>

        <UserProfile content={renderContent} />
      </div>
    </div>
  )
}
