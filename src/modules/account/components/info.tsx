import React, { useState } from 'react'
import { Image } from 'antd'
import UserImg from '../../../assets/images/user.png'
import { useAuthContext } from '@/modules/auth/context'

export const PersonalInfo = ({ setShowModal }: any) => {
  const { firebaseAuth } = useAuthContext()

  return (
    <>
      <div>
        <h1 className="text-lg font-bold mb-5">Personal Info</h1>

        <div className="border-b pb-4">
          <p className="text-sm font-semibold">Name</p>

          <div className="flex justify-between mt-1 items-end">
            <p className="text-colors-cadet text-sm">
              Your first and last given names. Updates are reflected immediately.
            </p>
            <div className="flex gap-5 items-center">
              <p className="text-sm">{firebaseAuth?.currentUser?.displayName || 'Not Set'}</p>
              <button
                onClick={() => setShowModal({ content: 'name', open: true })}
                className="text-primary font-bold"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="border-b pb-4 mt-4">
          <p className="text-sm font-semibold">Photo</p>

          <div className="flex justify-between items-end -mt-2">
            <p className="text-colors-cadet text-sm">
              Personalize your profile pic with a custom photo.
            </p>
            <div className="flex gap-5 items-center">
              <Image
                className="rounded-full object-cover"
                width="35px"
                height="35px"
                src={firebaseAuth.currentUser.photoURL || UserImg.src}
              />
              <button
                onClick={() => setShowModal({ content: 'profile-pic', open: true })}
                className="text-primary font-bold"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        <div className="border-b pb-4 mt-4">
          <p className="text-sm font-semibold">Reviews</p>

          <div className="flex justify-between mt-1 items-end">
            <p className="text-colors-cadet text-sm">
              Manage the reviews you’ve written for professionals, rentals, and more.
            </p>
            <button className="text-primary font-bold">Manage</button>
          </div>
        </div>
      </div>
    </>
  )
}
