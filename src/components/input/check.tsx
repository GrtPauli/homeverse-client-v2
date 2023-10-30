import { ErrorMessage, Field, useField } from 'formik'
import React, { useEffect, useState } from 'react'

interface IProps {
  label?: string
  value?: string
  labelClassName?: string
  className?: string
  name: string
  onChange?: (val: boolean) => void
  props?: {
    [x: string]: any
  }
}

export const AppCheckInput: React.FC<IProps> = ({
  label,
  value,
  name,
  className,
  labelClassName = 'text-xl bold',
  onChange,
  ...props
}) => {
  // const [field, meta, { setValue }] = useField(name);

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
          type="checkbox"
          name={name}
          value={value}
        />
        {/* <Field
          className="border-colors-cadet checked:text-primary"
          type="checkbox"
          name={name}
          onChange={(val: any) => {
            setValue(!field.value);
            if (onChange) onChange(!field.value);
          }}
        /> */}
        <p className={`ml-2 text-sm`}>{label}</p>
      </div>

      {/* <ErrorMessage className="text-red-500" name={name} component="div" /> */}
    </div>
  )
}
