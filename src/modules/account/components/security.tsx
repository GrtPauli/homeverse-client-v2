import { useAuthContext } from '@/modules/auth/context'
import { CheckCircleFilled } from '@ant-design/icons'
import React from 'react'

export const Security = ({ setShowModal }: any) => {
  const { firebaseAuth } = useAuthContext()

  return (
    <div className="mt-14">
      <h1 className="text-lg font-bold mb-5">Sign In & Security</h1>

      <div className="border-b pb-4">
        <p className="text-sm font-semibold">Email</p>

        <div className="flex justify-between mt-1 items-end">
          <p className="text-colors-cadet text-sm">
            The email address associated with your account.
          </p>
          <div className="flex gap-5 items-center">
            <div className="flex items-center gap-3">
              <p className="text-sm">{firebaseAuth?.currentUser?.email}</p>
              {firebaseAuth.currentUser.emailVerified && (
                <CheckCircleFilled className="text-green-500" />
              )}
            </div>

            <div className="flex items-center gap-3">
              {!firebaseAuth?.currentUser?.emailVerified && (
                <button
                  onClick={() => setShowModal({ content: 'verify-email', open: true })}
                  className="text-primary font-bold"
                >
                  Verify
                </button>
              )}

              <button
                onClick={() => setShowModal({ content: 'edit-email', open: true })}
                className="text-primary font-bold"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b pb-4 mt-4">
        <p className="text-sm font-semibold">Password</p>

        <div className="flex justify-between mt-1 items-end">
          <p className="text-colors-cadet text-sm">
            Set a unique password to protect your account.
          </p>
          <button
            onClick={() => setShowModal({ content: 'change-password', open: true })}
            className="text-primary font-bold"
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="border-b pb-4 mt-4">
        <p className="text-sm font-semibold">2-Step Verification</p>

        <div className="flex justify-between mt-1 items-end">
          <p className="text-colors-cadet text-sm">
            Make your account extra secure. Along with your password, you'll need to enter a code
            that we text to your phone each time you sign in.
          </p>
          <button className="text-primary font-bold">Enable</button>
        </div>
      </div>
    </div>
  )
}
