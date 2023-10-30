import React from 'react'

export const ManageAccount = () => {
  return (
    <div className="mt-14">
      <h1 className="text-lg font-bold mb-5">Manage account</h1>

      <div className="border-b pb-4">
        <p className="text-sm font-semibold">Deactivate My Account</p>

        <div className="flex justify-between mt-1 items-end">
          <p className="text-colors-cadet text-sm">
            This will shut down your account, but retain your information. You won't be able to
            sign in again until your account is reactivated.
          </p>
          <button className="text-primary font-bold">Deactivate Account</button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold">Delete My Account</p>

        <div className="flex justify-between mt-1 items-end">
          <p className="text-colors-cadet text-sm">
            This will shut down your account, but retain your information. You won't be able to
            sign in again until your account is reactivated.
          </p>
          <button className="text-primary font-bold">Delete Account</button>
        </div>
      </div>
    </div>
  )
}
