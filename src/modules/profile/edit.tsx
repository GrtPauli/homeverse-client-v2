import {
  ApFileInput,
  AppCheckInput,
  HvLoader,
  AppSelectInput,
  HvButton,
  LocationSelector,
  HvTextInput,
} from '@/components'
import { AgentHubLayout } from '@/components/layout/hub2'
import { Formik, FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { useProfileContext } from './context'
import { years } from '@/constants/Helper'
import { AgentSpecialties, IProfile, Languages } from './model'
import { useAuthContext } from '@/modules/auth/context'

export const EditProfilePage = () => {
  const { firebaseInitLoading, firebaseAuth, userType } = useAuthContext()
  const { getUserProfile, initLoading, profile, loading, updateProfile } = useProfileContext()
  const [country, setCountry] = useState<any>(null)
  const [countryFlag, setCountryFlag] = useState<any>(null)
  const [state, setState] = useState<any>(null)
  const [city, setCity] = useState<any>(null)

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getUserProfile(firebaseAuth?.currentUser?.uid)
    }
  }, [firebaseInitLoading])

  const handleSubmit = (val: any) => {
    if (country == null || state == null || city == null) {
      updateProfile(val)
    } else {
      updateProfile({
        country: country?.name,
        countryFlag: country?.label?.props?.children[0]?.props?.src,
        state: state?.name,
        city: city?.name,
        ...val,
      })
    }
  }

  return (
    <>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}

      {!initLoading && (
        <AgentHubLayout>
          <div className="w-full flex justify-center">
            <div className="w-full bg-light-white rounded shadow-lg px-10 py-8">
              <h1 className="font-extrabold text-3xl mb-1">Edit Your Profile Information</h1>
              <p className="text-sm text-colors-cadet mb-5">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam facere doloremque hic
                sit velit similique!
              </p>

              <Formik
                initialValues={{
                  professionalTitle: profile?.professionalTitle,
                  brokerageName: profile?.brokerageName,
                  brokerageAddress: profile?.brokerageAddress,
                  primaryPhone: profile?.primaryPhone,
                  brokeragePhone: profile?.brokeragePhone,
                  inBusinessSince: profile?.inBusinessSince,
                  profileVideo: profile?.profileVideo,
                  website: profile?.website,
                  blog: profile?.blog,
                  facebook: profile?.facebook,
                  twitter: profile?.twitter,
                  linkedIn: profile?.linkedIn,
                  about: profile?.about,
                  address: profile?.address,
                  languages: profile?.languages,
                }}
                onSubmit={handleSubmit}
              >
                {(props: FormikProps<any>) => (
                  <div className="mt-10">
                    <div className="mb-5">
                      <div className="flex justify-between gap-8 mb-5">
                        <HvTextInput label="Professional Title" name="professionalTitle" />
                        <AppSelectInput
                          options={years}
                          name="inBusinessSince"
                          defaultSelect="Select Year"
                          label="In Business Since"
                        />
                      </div>

                      <div className="flex justify-between gap-8 mb-5">
                        <div className="w-[50%]">
                          <HvTextInput label="About Me" name="about" textarea textAreaRows={8} />
                        </div>

                        <div className="w-[50%]">
                          <h1 className="text-dark-prussian-blue font-medium mb-5 pb-3 text-[15px] border-b">
                            Language Fluency
                          </h1>
                          <div className="flex justify-between">
                            <div className="flex flex-col gap-[19px]">
                              {Object.values(Languages)
                                .slice(0, 6)
                                .map((item, i) => (
                                  <AppCheckInput
                                    name="languages"
                                    value={item}
                                    label={item}
                                    key={i}
                                  />
                                ))}
                            </div>
                            <div className="flex flex-col gap-[19px]">
                              {Object.values(Languages)
                                .slice(6, 12)
                                .map((item, i) => (
                                  <AppCheckInput
                                    name="languages"
                                    value={item}
                                    label={item}
                                    key={i}
                                  />
                                ))}
                            </div>
                            <div className="flex flex-col gap-[19px]">
                              {Object.values(Languages)
                                .slice(12, 18)
                                .map((item, i) => (
                                  <AppCheckInput
                                    name="languages"
                                    value={item}
                                    label={item}
                                    key={i}
                                  />
                                ))}
                            </div>
                            <div className="flex flex-col gap-[19px]">
                              {Object.values(Languages)
                                .slice(18, 24)
                                .map((item, i) => (
                                  <AppCheckInput
                                    name="languages"
                                    value={item}
                                    label={item}
                                    key={i}
                                  />
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <LocationSelector
                        setCountry={setCountry}
                        country={country}
                        countryFlag={countryFlag}
                        setCountryFlag={setCountryFlag}
                        setState={setState}
                        state={state}
                        setCity={setCity}
                        city={city}
                      />

                      <div className="mt-5">
                        <HvTextInput label="Address" name="address" textarea textAreaRows={3} />
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="flex justify-between gap-8 mb-5">
                        <HvTextInput label="Brokerage Name" name="brokerageName" />
                        <HvTextInput label="Brokerage Address" name="brokerageAddress" />
                      </div>
                      <div className="flex justify-between gap-8">
                        <HvTextInput label="Primary Phone Number" name="primaryPhone" />
                        <HvTextInput label="Brokerage Phone Number" name="brokeragePhone" />
                      </div>
                    </div>

                    <div className="mb-10">
                      <div className="flex justify-between gap-8 mb-5">
                        <HvTextInput label="Profile Video" name="profileVideo" />
                        <HvTextInput label="Website" name="website" />
                      </div>
                      <div className="flex justify-between gap-8 mb-5">
                        <HvTextInput label="Blog" name="blog" />
                        <HvTextInput label="Facebook" name="facebook" />
                      </div>
                      <div className="flex justify-between gap-8 mb-5">
                        <HvTextInput label="Twitter" name="twitter" />
                        <HvTextInput label="LinkedIn" name="linkedIn" />
                      </div>
                    </div>

                    <div className="flex justify-end gap-5">
                      <HvButton
                        outline
                        onClick={() => {}}
                        title="Cancel Update"
                        fullWidth={false}
                      />
                      <HvButton
                        loading={loading}
                        onClick={() => props.handleSubmit()}
                        title="Update Profile"
                        fullWidth={false}
                      />
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </AgentHubLayout>
      )}
    </>
  )
}
