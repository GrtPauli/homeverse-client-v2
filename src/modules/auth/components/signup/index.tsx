import React, { useState } from 'react'
import {FiChevronsRight} from "react-icons/fi"
import { AgentProcess } from './agent'
import { Form, Formik, FormikProps } from 'formik'
import { HvButton, PasswordInput, HvTextInput } from '@/components'
import Link from 'next/link'
import { useAuthContext } from '../../context'
import { IAuthUserInput } from '../../model'

export const NewAccount = ({ id }: any) => {
    const [process, setProcess] = useState<"agent" | "buyer" | "seller">(null)
    const { authenticateWithEmailAndPassword, loading } = useAuthContext()

    const handleSubmit = (val: IAuthUserInput) => {
      authenticateWithEmailAndPassword(val, id)
    }

  return (
    <div>
        {!process && <GetStarted setProcess={setProcess}/>}
        {process && (
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
        )}
    </div>
  )
}

const GetStarted = ({ setProcess }: any) => {

    return (
        <div className='pt-3'>
            <h1 className='font-black text-xl mb-1'>Get Started</h1>
            <p> 
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Rem voluptatum ducimus in blanditiis aspernatur quos.
            </p>

            <div className='flex flex-col gap-5 mt-5 items-center text-colors-cadet hover:text-primary duration-150 ease-in'>
                <HvButton title="I'm an Agent" onClick={() => setProcess("agent")}/>
                <HvButton title="I'm a Seller" onClick={() => setProcess("buyer")}/>
                <HvButton title="I'm a Buyer" onClick={() => setProcess("seller")}/>
                <button className='flex items-center gap-1 mt-5'>
                    I'm Curious
                    <FiChevronsRight className='text-xl'/>
                </button>
            </div>
        </div>
    )
}