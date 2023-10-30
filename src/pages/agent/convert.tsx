import React from 'react'
import Bg from '../../assets/images/slide-3.jpg'
import { Formik, FormikProps } from 'formik'
import { HvButton, HvTextInput } from '@/components'
import { useAgentContext } from '@/modules/agent/context'
import { useAuthContext } from '@/modules/auth/context'

const Convert = () => {
  const { loading, updateUserType, convertToAgent } = useAgentContext()
  const { firebaseAuth, firebaseInitLoading } = useAuthContext()

  const handleSubmit = (val: any) => {
    updateUserType(
      firebaseAuth.currentUser.uid,
      firebaseAuth.currentUser,
      val.firstName + ' ' + val.lastName,
      val.phone,
    )
  }

  return (
    <div
      className="w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      <div className="bg-black/50 h-full w-full flex items-center justify-center">
        <div className="bg-light-white w-[500px] pt-5 px-8 p-8 rounded-2xl">
          <div className="mb-5">
            <h1 className="text-xl font-extrabold mb-1">Convert Your Account</h1>
            <h1 className="text-sm text-colors-cadet">
              Currently signed in as
              <span className="inline-block font-bold ml-1">
                {firebaseAuth?.currentUser?.email}
              </span>
            </h1>
          </div>

          <HvButton
            loading={loading}
            type="button"
            onClick={() => convertToAgent()}
            title="Convert to an Agent Account"
          />

          {/* <Formik initialValues={{}} onSubmit={handleSubmit}>
            {(props: FormikProps<any>) => (
              <div className="flex flex-col gap-5">
                <HvTextInput labelSmall name="firstName" label="First Name" />
                <HvTextInput labelSmall name="lastName" label="Last Name" />
                <HvTextInput labelSmall name="phone" label="Phone Number" />

                <div className="flex flex-col gap-5 mt-8">
                  <HvButton
                    type="button"
                    onClick={() => props.handleSubmit()}
                    title="Convert to an Agent Account"
                  />
                </div>
              </div>
            )}
          </Formik> */}
        </div>
      </div>
    </div>
  )
}

export default Convert
