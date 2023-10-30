import React, { useState } from 'react'
import { HvTextInput } from './text'
import { EyeIcon, EyeSlashIcon } from '@/assets/icons'

interface IProps {
  labelSmall?: boolean
}

export const PasswordInput: React.FC<IProps> = ({ labelSmall }) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(true)

  return (
    <div className="relative">
      <HvTextInput
        labelSmall={labelSmall}
        type={togglePassword ? 'password' : 'text'}
        name="password"
        label="Password"
        // placeHolder="Enter your password"
      />

      <button
        type="button"
        className="absolute right-5 top-[41px] text-colors-cadet"
        onClick={() => setTogglePassword(!togglePassword)}
      >
        {togglePassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
      </button>
    </div>
  )
}
