import { ErrorMessage, useField } from 'formik'
import React, { memo } from 'react'
import Select from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

interface IProps extends StateManagerProps {
  label?: string
  name: string
  isMulti?: boolean
  containerClassName?: string | undefined
  options: Array<{ value: string; label: string }> | any
  addOnChange?: (value: any) => void
}

export const HvSelectInput: React.FC<IProps> = (props) => {
  const { label, options, isMulti, name, containerClassName, addOnChange } = props
  const [field, meta, { setValue }] = useField(name)

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && <p className="text-dark-prussian-blue font-semibold text-[15px] mb-2">{label}</p>}

      <Select
        {...field}
        {...props}
        isMulti={isMulti}
        options={options}
        name={name}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: '45px',
            borderWidth: 1,
            paddingLeft: '10px',
            borderRadius: '8px',
            fontSize: '13px',
            borderColor: state.isFocused ? '#E9E9E9' : 'rgb(139 177 177 / 0.4)',
          }),
        }}
        onChange={(val: any) => {
          setValue(val)
          if (addOnChange) addOnChange(val)
        }}
      />

      {meta.error && <div className="text-red-500">{(meta.error as any)?.value}</div>}
      {/* <ErrorMessage className="text-red-500"  name={name} component="div" /> */}
    </div>
  )
}
