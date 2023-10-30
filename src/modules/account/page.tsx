import React, { FC, useEffect, useState } from 'react'
import { useAuthContext } from '../auth/context'
import { useProfileContext } from '../profile/context'
import { ApFileInput, HvButton, HvLoader, HvModal, HvTextInput, RegularLayout } from '@/components'
import { AgentHubLayout } from '@/components/layout/hub'
import { Details } from './components'
import { Formik, FormikProps } from 'formik'
import { IImage } from '../model'
import Image from 'next/image'
import SendMailImg from '../../assets/images/mail.png'
import MailSentImg from '../../assets/images/mail-check.png'

interface IProps {
  agent?: boolean
}

interface IModalData {
  open: boolean
  content?: 'name' | 'profile-pic' | 'verify-email' | 'edit-email' | 'change-password'
}

const AccountPage: FC<IProps> = ({ agent }) => {
  const { firebaseInitLoading, firebaseAuth } = useAuthContext()
  const { getUserProfile, initLoading, profile } = useProfileContext()
  const [showModal, setShowModal] = useState<IModalData>(null)

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getUserProfile(firebaseAuth?.currentUser?.uid)
    }
  }, [firebaseInitLoading])

  return (
    <>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}

      {!initLoading && (
        <>
          {agent ? (
            <AgentHubLayout>
              <Details setShowModal={setShowModal} />
            </AgentHubLayout>
          ) : (
            <RegularLayout>
              <Details setShowModal={setShowModal} />
            </RegularLayout>
          )}
        </>
      )}

      <HvModal
        destroyOnClose
        open={showModal?.open}
        onCancel={() => setShowModal({ open: false })}
        onDismiss={() => setShowModal({ open: false })}
        title={
          showModal?.content == 'name'
            ? 'Edit Your Name'
            : showModal?.content == 'verify-email'
            ? 'Verify Your Email'
            : showModal?.content == 'profile-pic'
            ? 'Edit Your Profile Pic'
            : showModal?.content == 'edit-email'
            ? 'Change Your Email'
            : 'Change Your Password'
        }
      >
        {showModal?.content == 'name' && <EditName setShowModal={setShowModal} />}
        {showModal?.content == 'profile-pic' && <EditProfilePic setShowModal={setShowModal} />}
        {showModal?.content == 'verify-email' && <VerifyEmail setShowModal={setShowModal} />}
        {showModal?.content == 'edit-email' && <EditEmail setShowModal={setShowModal} />}
        {showModal?.content == 'change-password' && <ChangePassword setShowModal={setShowModal} />}
      </HvModal>
    </>
  )
}

export default AccountPage

const EditProfilePic = ({ setShowModal }: any) => {
  const [pic, setPic] = useState<IImage>(null)
  const { updateProfilePic, loading } = useProfileContext()

  const handleSetPic = (file: any) => {
    setPic({
      uri: file.uri,
      name: file.file.name,
      type: file.file.type,
    })
  }

  const handleSubmit = () => {
    updateProfilePic(pic).then(() => {
      setShowModal({ open: false })
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

const EditName = ({ setShowModal }: any) => {
  const { updateDisplayName, loading } = useProfileContext()

  const handleSubmit = (val: any) => {
    updateDisplayName(val.firstname + ' ' + val.lastname).then(() => {
      setShowModal({ open: false })
    })
  }

  return (
    <div>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <div className="flex flex-col gap-5">
            <HvTextInput name="firstname" label="First Name" />
            <HvTextInput name="lastname" label="Last Name" />

            <div className="flex justify-end gap-3 mt-5">
              <HvButton
                type="button"
                onClick={() => setShowModal({ open: false })}
                outline
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Cancel"
              />
              <HvButton
                loading={loading}
                type="button"
                onClick={() => props.handleSubmit()}
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Apply"
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

const VerifyEmail = ({ setShowModal }: any) => {
  const { loading, verifyEmail } = useAuthContext()
  const [mailSent, setMailSent] = useState<boolean>(false)

  const handleSendMail = () => {
    verifyEmail().then(() => {
      setMailSent(true)
    })
  }

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center mb-5 text-center gap-3">
          {mailSent ? (
            <>
              <Image alt="mail" src={MailSentImg} width={100} height={100} />
              <p className="leading-7">
                To verify your account open the email sent to{' '}
                <span className="font-bold ">paul.asynctechs@gmail.com</span>
              </p>
            </>
          ) : (
            <>
              <Image alt="mail" src={SendMailImg} width={100} height={100} />
              <p className="leading-7">
                To verify your email, select "Send verification email"
                <br /> and then check your inbox.
              </p>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <HvButton
            type="button"
            onClick={() => setShowModal({ open: false })}
            outline
            paddingX="px-8"
            paddingY="py-3"
            fullWidth={false}
            title="Cancel"
          />
          <HvButton
            loading={loading}
            onClick={() => handleSendMail()}
            paddingX="px-8"
            paddingY="py-3"
            fullWidth={false}
            title={!mailSent ? 'Send Verification Email' : 'Resend Email'}
          />
        </div>
      </div>
    </>
  )
}

const EditEmail = ({ setShowModal }: any) => {
  const { firebaseAuth } = useAuthContext()
  const { updateUserEmail, loading } = useProfileContext()

  const handleSubmit = (val: any) => {
    updateUserEmail(val.password, val.email).then(() => {
      setShowModal({ open: false })
    })
  }

  return (
    <div>
      <p className="mb-3">
        Your current email is{' '}
        <span className="font-bold inline-block">{firebaseAuth?.currentUser?.email}</span>
      </p>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <div className="flex flex-col gap-5">
            <HvTextInput name="email" label="New Email" />
            <HvTextInput type="password" name="password" label="Your Password" />

            <div className="flex justify-end gap-3 mt-5">
              <HvButton
                type="button"
                onClick={() => setShowModal({ open: false })}
                outline
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Cancel"
              />
              <HvButton
                loading={loading}
                type="button"
                onClick={() => props.handleSubmit()}
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Apply"
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}

const ChangePassword = ({ setShowModal }: any) => {
  const { updateUserPassword, loading } = useProfileContext()

  const handleSubmit = (val: any) => {
    updateUserPassword(val.password, val.newPassword).then(() => {
      setShowModal({ open: false })
    })
  }

  return (
    <div>
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <div className="flex flex-col gap-5">
            <HvTextInput type="password" name="password" label="Current Password" />
            <HvTextInput type="password" name="newPassword" label="New Password" />
            <HvTextInput type="password" name="confirmPassword" label="Confirm Password" />

            <div className="flex justify-end gap-3 mt-5">
              <HvButton
                type="button"
                onClick={() => setShowModal({ open: false })}
                outline
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Cancel"
              />
              <HvButton
                loading={loading}
                type="button"
                onClick={() => props.handleSubmit()}
                paddingX="px-8"
                paddingY="py-3"
                fullWidth={false}
                title="Apply"
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
