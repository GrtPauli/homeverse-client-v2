import { ErrorMessage, useField } from 'formik'
import React, { ReactNode } from 'react'

interface IProps {
  enumOption?: any
  options?: (string | number)[]
  label?: string
  type?: string
  name: string
  className?: string
  placeholder?: string
  ref?: any
  props?: {
    [x: string]: any
  }
  disabled?: boolean
  value?: any
  children?: ReactNode
  defaultSelect?: string
}

export const AppSelectInput: React.FC<IProps> = ({
  label,
  type,
  name,
  className,
  placeholder,
  options,
  disabled,
  children,
  defaultSelect,
  enumOption,
  ...props
}) => {
  const [field] = useField(name)

  return (
    <div className="w-full">
      {label && <p className="text-dark-prussian-blue font-semibold mb-2 text-[15px]">{label}</p>}

      {/* <ErrorMessage
            className="text-red-500 text-cusf3"
            name={name}
            component="p"
        /> */}

      <select
        {...field}
        {...props}
        name={name}
        disabled={disabled || false}
        className={
          className
            ? className
            : `text-sm border border-colors-opal/40 w-full rounded-lg py-3 outline-none px-5`
        }
      >
        <option selected disabled>
          {defaultSelect || 'Select Option'}
        </option>
        {enumOption
          ? Object.values(enumOption).map((item: any, i) => (
              <option
                key={i}
                value={Object.keys(enumOption)[Object.values(enumOption).indexOf(item)]}
              >
                {item}
              </option>
            ))
          : options.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
      </select>

      {/* {
        !label &&
        <ErrorMessage
          className="text-red-500 text-cusf3 text-left mt-3"
          name={name}
          component="div"
        />
      } */}
    </div>
  )
}
