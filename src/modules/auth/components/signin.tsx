import React from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { HvButton, PasswordInput, HvTextInput } from '@/components'
import Link from 'next/link'
import { useAuthContext } from '../context'
import { IAuthUserInput } from '../model'

export const Signin = ({ id }: any) => {
  const { authenticateWithEmailAndPassword, loading } = useAuthContext()

  const handleSubmit = (val: IAuthUserInput) => {
    authenticateWithEmailAndPassword(val, id)
  }

  return (
    <Formik
      // validationSchema={}
      initialValues={{
        email: '',
        password: '',
        displayName: '',
      }}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <div className="flex flex-col justify-between mt-3">
            <div className="flex flex-col gap-5">
              {id == 'signup' && <HvTextInput labelSmall name="displayName" label="Name" />}
              <HvTextInput labelSmall name="email" label="Email" />

              <PasswordInput labelSmall />
            </div>

            <div className="mt-8">
              <HvButton
                type="button"
                loading={loading}
                onClick={() => props.handleSubmit()}
                title={id == 'signin' ? 'Sign In' : 'Create New Account'}
              />

              {id == 'signin' && (
                <div className="text-[13px] mt-5 flex justify-center items-center gap-2">
                  <p>Forgotten Password ?</p>
                  <Link href="/signup">
                    <p className="text-primary font-semibold">Reset</p>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
