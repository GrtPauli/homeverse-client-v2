import React from 'react'
import { PersonalInfo } from './info'
import { Security } from './security'
import { ManageAccount } from './account'

export const Details = ({ setShowModal }: any) => {
  return (
    <div className="w-full">
      <div>
        <h1 className="font-extrabold text-3xl mb-1">Account</h1>
        <p className="text-sm text-colors-cadet mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo aliquid
          asperiores veniam quia nesciunt neque magni, eveniet nulla?
        </p>

        <div className="w-[100%] bg-light-white rounded shadow-lg px-10 pt-8 pb-14">
          <PersonalInfo setShowModal={setShowModal} />
          <Security setShowModal={setShowModal} />
          <ManageAccount />
        </div>
      </div>
    </div>
  )
}
