import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import UserImg from '../../assets/images/user.png'
import { ChevronDownIcon } from '@/assets/icons'
import { Image, ConfigProvider, MenuProps, Popover } from 'antd'
import { useProfileContext } from '@/modules/profile/context'
import { useHvFirebaseContext } from '@/modules/firebase/context'
import { useAuthContext } from '@/modules/auth/context'

const UserProfile = ({ content }: any) => {
  // const session = useSession()
  // const {profilePicLoading, profile, profilePic, getMyProfilePic} = useProfileContext()
  // useEffect(() => {
  //     profile?.photo === undefined && getMyProfilePic()
  // }, [])
  const { firebaseInitLoading, firebaseAuth } = useAuthContext()

  return (
    <div>
      {!firebaseInitLoading && (
        <>
          {!firebaseAuth?.currentUser ? (
            <div className="flex items-center gap-5">
              <Link href="/signin">
                <button className="bg-primary py-2.5 text-sm px-5 rounded text-light-white font-bold">
                  Sign In
                </button>
              </Link>

              <Link href="/signup">
                <button className="border-primary border py-2.5 text-sm px-5 rounded text-primary font-bold">
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: '',
                  colorPrimary: '#FF7D01',
                },
              }}
            >
              <Popover
                zIndex={4000}
                placement="bottomRight"
                content={content}
                overlayInnerStyle={{ padding: 0, paddingTop: 0 }}
                overlayClassName="cus-sm:relative cus-sm:left-0 cus-sm:w-full"
              >
                <button className="flex items-center gap-3">
                  <Image
                    src={firebaseAuth?.currentUser?.photoURL || UserImg.src}
                    alt="user"
                    width={40}
                    preview={false}
                    height={40}
                    className="rounded-full object-center object-cover"
                  />
                  {/* <ChevronDownIcon className='text-light-white w-4 h-4'/> */}
                </button>
              </Popover>
            </ConfigProvider>
          )}
        </>
      )}
    </div>
  )
}

export default UserProfile
