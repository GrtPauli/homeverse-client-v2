import { ApFileInput, HvButton, HvModal } from '@/components'
import { AgentHubLayout } from '@/components/layout/hub'
import { useAuthContext } from '@/modules/auth/context'
import { useProfileContext } from '@/modules/profile/context'
import { Empty, Image, Progress } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import UserImg from '../../../assets/images/user.png'
import { IImage } from '@/modules/model'
import { HvEditIcon } from '@/assets/icons'

export const ProfileContent = () => {
  const router = useRouter()
  const { firebaseAuth } = useAuthContext()
  const { profile } = useProfileContext()
  const [percent, setPercent] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)

  // useEffect(() => {
  //   let ovr = 0
  //   if (profile.about) {
  //     ovr = ovr + 20
  //   }
  //   if (profile.country) {
  //     ovr = ovr + 20
  //   }
  //   if (firebaseAuth.currentUser.emailVerified) {
  //     ovr = ovr + 20
  //   }
  //   if (firebaseAuth.currentUser.photoURL) {
  //     ovr = ovr + 20
  //   }
  //   if (profile.linkedIn || profile.twitter || profile.facebook) {
  //     ovr = ovr + 20
  //   }

  //   setPercent(ovr)
  // }, [])

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-between gap-8 items-start">
          <div className="bg-light-white rounded shadow-lg w-[70%] px-10 pt-8 pb-10">
            <div className="flex items-center gap-8 mb-10">
              <div className="relative">
                <Image
                  className="rounded-full object-cover"
                  width="120px"
                  height="120px"
                  src={firebaseAuth?.currentUser?.photoURL || UserImg.src}
                />

                <button
                  onClick={() => setShowModal(true)}
                  className="rounded-full bg-primary p-2 bottom-2 -right-2 absolute"
                >
                  <HvEditIcon className="text-light-white w-5 h-5" />
                </button>
              </div>

              <div>
                <h1 className="font-extrabold text-2xl mb-1">
                  {firebaseAuth?.currentUser?.displayName}
                </h1>
                <p className="text-sm text-colors-cadet mb-1">{profile?.phone}</p>
                <p className="text-sm text-colors-cadet">{firebaseAuth?.currentUser?.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <h1 className="font-extrabold text-xl mb-0.5 border-b pb-5">About Me</h1>
                <div className="pt-5">
                  {profile?.about ? (
                    <p className="text-sm leading-7">{profile?.about}</p>
                  ) : (
                    <Empty />
                  )}
                </div>
              </div>

              <div>
                <h1 className="font-extrabold text-xl mb-0.5 border-b pb-5">Personal Info</h1>
                <div className="pt-5">
                  <p className="text-sm leading-7">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nisi qui
                    accusantium eligendi quisquam! Consectetur vel illo quisquam odio eius expedita
                    laboriosam tenetur, odit enim ipsa dolorum mollitia voluptatem doloremque fugit
                    vero earum nam illum veritatis sapiente corrupti, nostrum adipisci magni dicta
                    dolore. A, minima itaque. Corrupti saepe non reiciendis!
                  </p>
                </div>
              </div>

              <div>
                <h1 className="font-extrabold text-xl mb-0.5 border-b pb-5">Ratings & Reviews</h1>
                <div className="pt-5">{profile?.reviews?.length > 0 ? '' : <Empty />}</div>
              </div>
            </div>
          </div>

          <div className="w-[30%] h-full flex flex-col gap-8">
            <div className="w-full bg-light-white rounded shadow-lg">
              <h1 className="font-bold text-lg border-b py-3 px-5">Manage Profile</h1>
              <p className="mx-5 text-sm mt-3 leading-7 text-colors-cadet">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, odit.
              </p>
              <div className="px-5 py-5 flex flex-col gap-5">
                <Link href="/dashboard/profile/edit">
                  <HvButton title="Edit Profile" paddingY="py-3.5" />
                </Link>
                <HvButton title="Change Password" paddingY="py-3.5" />
                <HvButton title="Account Settings" paddingY="py-3.5" />
              </div>

              {/* <div className='px-5 py-5 flex flex-col gap-5'>
              <Button 
                outline
              >
                <Image src={EditIcon} alt="edit" width={25} height={25} />
                Edit Profile
              </Button>

              <Button 
                outline
                paddingY='py-2.5'
              >
                <Image src={EditP} alt="edit" width={30} height={30} />
                Change Password
              </Button>

              <Button 
                outline
                paddingY='py-1.5'
              >
                <Image src={Settings} alt="edit" width={40} height={40} />
                Account Settings
              </Button>
            </div> */}
            </div>

            <div className="w-full bg-light-white rounded shadow-lg">
              <h1 className="font-bold text-lg border-b py-3 px-5">Profile Status</h1>

              <div className="pl-5 pr-2 py-5">
                <Progress strokeColor="#5d737e" percent={percent} />
                <p className="text-sm mt-1 text-colors-cadet">
                  Your profile is {percent}% complete
                </p>
              </div>

              <div className="px-5 pb-5 flex flex-col gap-5">
                <StatusItem
                  number="1"
                  title="Add a photo"
                  value={firebaseAuth?.currentUser?.photoURL && true}
                />
                <StatusItem number="2" title="Add about me" value={profile?.about && true} />
                <StatusItem number="3" title="Add Location" value={profile?.country && true} />
                <StatusItem
                  number="4"
                  title="Verify Your Email"
                  value={firebaseAuth?.currentUser?.emailVerified && true}
                />
                <StatusItem
                  number="5"
                  title="Add at least one social profile"
                  value={
                    profile?.linkedIn ? true : profile?.twitter ? true : profile?.facebook && true
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <HvModal
        open={showModal}
        onDismiss={() => setShowModal(false)}
        destroyOnClose
        title="Edit Your Profile Pic"
      >
        <EditProfilePic setShowModal={setShowModal} />
      </HvModal>
    </>
  )
}

const EditProfilePic = ({ setShowModal }: any) => {
  const [pic, setPic] = useState<IImage>(null)
  const { updateProfilePic, loading, getUserProfile } = useProfileContext()

  const handleSetPic = (file: any) => {
    console.log(file.uri)

    setPic({
      uri: file.uri,
      name: file.file.name,
      type: file.file.type,
    })
  }

  const handleSubmit = () => {
    updateProfilePic(pic).then(() => {
      getUserProfile(true)
      setShowModal(false)
    })
  }

  return (
    <div>
      <ApFileInput
        onRemove={(file) => setPic(null)}
        maxCount={1}
        accept={'image/*'}
        onSelected={(res: any) => {
          if (res) {
            handleSetPic(res[0])
          }
        }}
      />

      {pic && (
        <div className="mt-5">
          <HvButton
            loading={loading}
            type="button"
            onClick={() => handleSubmit()}
            title="Upload Photo"
          />
        </div>
      )}
    </div>
  )
}

interface IProps {
  number: string
  value: boolean
  title: string
}

const StatusItem: FC<IProps> = ({ number, value, title }) => {
  return (
    <div className="flex gap-3 items-center">
      <div
        className={`w-[32px] h-[32px] text-[14px] text-center leading-8 rounded-[32px]
        ${value == true ? 'bg-primary' : 'bg-colors-cadet'}  text-light-white`}
      >
        <span>{number}</span>
      </div>

      <h1 className="text-sm">{title}</h1>
    </div>
  )
}
