import React, { useEffect } from 'react'
import Logo from '../../../assets/images/logo.png'
import UserProfile from '../user'
import Link from 'next/link'
import { HvButton } from '../../button'
import { HvPopover } from '../../popover'
import { useAuthContext } from '@/modules/auth/context'
import { UserType } from '@/modules/profile/model'
import { HvHubIcon } from '@/assets/icons'
import UserImg from '../../../assets/images/user.png'
import { Auth } from 'firebase/auth'
import { Image } from 'antd'
import { UserRole } from '@/modules/auth/model'
import { BsBell, BsChat } from 'react-icons/bs'

export const Navbar = () => {
  const { userRole, getUserRole, firebaseAuth, signUserOut, firebaseInitLoading } =
    useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getUserRole()
    }
  }, [firebaseInitLoading])

  return (
    <div className="bg-light-white py-1.5 px-12 flex justify-between items-center">
      <div className="flex items-center gap-12">
        <Image src={Logo.src} alt="logo" width={180} height={45} />
        <div className="flex gap-8 items-center text- mt-1">
          <BuyContent />
          {/* <Link href="/browse/listings">
            <p className="font-regular text-[15px]">Buy</p>
          </Link> */}

          <Link href="">
            <p className="font-regular text-[15px]">Rent</p>
          </Link>

          <Link href="">
            <p className="font-regular text-[15px]">Sell</p>
          </Link>

          <Link href="/browse/agents">
            <p className="font-regular text-[15px]">Agent Finder</p>
          </Link>

          <Link href="">
            <p className="font-regular text-[15px]">Help</p>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <BsBell className="text-lg" />
          <BsChat className="text-lg " />
        </div>
        {userRole == UserRole.AGENT ? (
          <>{myHubContent(firebaseAuth, signUserOut)}</>
        ) : (
          <UserProfile content={renderContent(signUserOut)} />
        )}
      </div>
    </div>
  )
}

const BuyContent = () => {
  return (
    <HvPopover
      wrapper={<p className="font-regular text-[15px] cursor-pointer">Buy</p>}
      arrow={false}
      placement="bottomLeft"
    >
      <div className="w-[600px] mt-2 p-8 flex gap-10 justify-between">
        <div className="w-[60%]">
          <div className="flex flex-col gap-2 border-b pb-3 mb-3">
            <h1 className="font-bold text-base mb-2">Homes For Sale</h1>
            <Link href="/browse/listings/sale">
              <p className="font-regular text-sm">Homes For Sale</p>
            </Link>
            <Link href="">
              <p className="font-regular text-sm">Foreclosure Homes</p>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-base mb-2">New Construction For Sale</h1>
            <Link href="">
              <p className="font-regular text-sm">Homes For Sale</p>
            </Link>
            <Link href="">
              <p className="font-regular text-sm">Foreclosure Homes</p>
            </Link>
          </div>
        </div>

        <div className="w-[40%] flex flex-col gap-3">
          <h1 className="font-bold text-base">Home Buying Tips</h1>
          <Link href="">
            <p className="font-regular text-sm">Homes For Sale</p>
          </Link>
          <Link href="">
            <p className="font-regular text-sm">Foreclosure Homes</p>
          </Link>
          <Link href="">
            <p className="font-regular text-sm">Homes For Sale</p>
          </Link>
          <Link href="">
            <p className="font-regular text-sm">Foreclosure Homes</p>
          </Link>
          <Link href="">
            <p className="font-regular text-sm">Homes For Sale</p>
          </Link>
          <Link href="">
            <p className="font-regular text-sm">Foreclosure Homes</p>
          </Link>
        </div>
      </div>
    </HvPopover>
  )
}

const renderContent = (signUserOut: () => void) => {
  return (
    <div className="w-[280px]">
      <div className="p-[5px]">
        <Link href="/my/account">
          <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Account</h1>
            <p className="text-xs text-colors-cadet">Manage your account</p>
          </div>
        </Link>

        <Link href="/my/tours">
          <div className="px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Tours</h1>
            <p className="text-xs text-colors-cadet">View your house tours</p>
          </div>
        </Link>

        <Link href="/dashboard/profile">
          <div className="px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Saved Homes</h1>
            <p className="text-xs text-colors-cadet">View and edit your info</p>
          </div>
        </Link>

        <Link href="/dashboard/past-sales">
          <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Saved Searches</h1>
            <p className="text-xs text-colors-cadet">View sales history</p>
          </div>
        </Link>

        <Link href="/dashboard/settings">
          <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Recently Viewed</h1>
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

const myHubContent = (firebaseAuth: Auth, signUserOut: () => void) => (
  <HvPopover
    wrapper={
      <>
        <HvButton type="button" paddingY="py-2.5" paddingX="px-6">
          My Hub <HvHubIcon className="w-5 h-5" />
        </HvButton>
      </>
    }
  >
    <div className="w-[280px]">
      <div className="text-[13px] leading-none border-b py-3 px-3 flex items-center gap-5">
        <Image
          src={firebaseAuth?.currentUser?.photoURL || UserImg.src}
          alt="user"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="font-bold text-sm">{firebaseAuth?.currentUser?.displayName}</p>
          <p>{firebaseAuth?.currentUser?.email}</p>
        </div>
      </div>

      <div className="p-[5px]">
        <Link href="/dashboard/tours">
          <div className="px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Tours</h1>
            <p className="text-xs text-colors-cadet">View your tours</p>
          </div>
        </Link>

        <Link href="/dashboard/listings">
          <div className="px-3 py-2 text-sm text-dark-black rounded-md hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Listings</h1>
            <p className="text-xs text-colors-cadet">View and create listings</p>
          </div>
        </Link>

        <Link href="/dashboard/past-sales">
          <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Messages</h1>
            <p className="text-xs text-colors-cadet">View your messages</p>
          </div>
        </Link>

        <Link href="/dashboard/past-sales">
          <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Contacts</h1>
            <p className="text-xs text-colors-cadet">View your contacts and requests</p>
          </div>
        </Link>

        <Link href="/dashboard/account">
          <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Account</h1>
            <p className="text-xs text-colors-cadet">Manage your account</p>
          </div>
        </Link>

        <Link href="/dashboard/profile">
          <div className="px-3 py-2 text-sm rounded-md text-dark-black hover:bg-black/10 ease-in duration-150">
            <h1 className="font-semibold mb-0.5">Profile</h1>
            <p className="text-xs text-colors-cadet">View sand edit your profile info</p>
          </div>
        </Link>
      </div>

      <div className="text-[13px] border-t py-3 px-3">
        <HvButton onClick={() => signUserOut()} paddingY="py-3" title="Sign Out" />
      </div>
    </div>
  </HvPopover>
)
