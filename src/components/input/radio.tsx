import { ErrorMessage, Field, useField } from 'formik'
import React, { useEffect, useState } from 'react'

interface IProps {
  value?: string
  label?: string
  labelClassName?: string
  className?: string
  name: string
  onChange?: (val: boolean) => void
  props?: {
    [x: string]: any
  }
}

export const AppRadioInput: React.FC<IProps> = ({
  label,
  value,
  name,
  className,
  labelClassName = 'text-xl bold',
  onChange,
  ...props
}) => {
  // const [field, meta, { setValue }] = useField(name);
  // useEffect(() => {
  //   setValue(value)
  // },[])

  return (
    <div
      style={
        {
          // marginBottom: 10,
          // display: "flex",
          // flexDirection: "column",
        }
      }
    >
      <div className="flex items-center">
        <Field
          className="border-colors-cadet checked:text-primary"
          type="radio"
          name={name}
          value={value}
        />

        {/* <Field
        //   className="border-colors-cadet checked:text-primary"
          type="radio"
          name={name}
          onChange={(val: any) => {
            // console.log(val)
            setValue(!field.value);
            // if (onChange) onChange(!field.value);
          }}
        /> */}
        <p className={`ml-2 text-sm`}>{label}</p>
      </div>

      {/* <ErrorMessage className="text-red-500" name={name} component="div" /> */}
    </div>
  )
}
