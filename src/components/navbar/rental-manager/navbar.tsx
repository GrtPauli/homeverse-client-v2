import React from 'react'
import Logo from '../../../assets/images/Group 1.png'
import UserProfile from '../user'
import Link from 'next/link'
import { HvButton } from '../../button'
import { HvPopover } from '../../popover'
import { useAuthContext } from '@/modules/auth/context'
import { UserType } from '@/modules/profile/model'
import { HvBellIcon, HvHubIcon } from '@/assets/icons'
import UserImg from '../../../assets/images/user.png'
import { Auth } from 'firebase/auth'
import { Image } from 'antd'

export const Navbar = () => {
  const { userType } = useAuthContext()
  const { firebaseInitLoading, firebaseAuth, signUserOut } = useAuthContext()

  return (
    <div className="bg-light-white py-1.5 px-12 flex justify-between items-center">
      <div className="flex gap-8 items-center text- mt-1">
        <Link href="/browse/listings">
          <p className="font-regular text-[15px]">Messages</p>
        </Link>

        <Link href="">
          <p className="font-regular text-[15px]">Properties</p>
        </Link>
      </div>

      <Image src={Logo.src} alt="logo" width={180} height={50} />

      <div className="flex gap-8 items-center text- mt-1">
        <Link href="/browse/listings">
          <p className="font-regular text-[15px]">Go to Homeverse</p>
        </Link>

        <button>
          <HvBellIcon />
        </button>

        <Image
          src={UserImg.src}
          alt="user"
          width={40}
          preview={false}
          height={40}
          className="rounded-full object-center object-cover"
        />
      </div>

      {/* <div className="flex items-center gap-8">
        {(userType as any) == UserType[1] ? (
          <>{myHubContent(firebaseAuth, signUserOut)}</>
        ) : (
          <UserProfile content={renderContent(signUserOut)} />
        )}
      </div> */}
    </div>
  )
}
