import React from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import { ConfigProvider, DatePicker, DatePickerProps } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

interface IProps {
  name: string
  label?: string
  containerClassName?: string | undefined
}

type ApDateInputProps = IProps & DatePickerProps

export const HvDateInput: React.FC<ApDateInputProps> = ({
  name,
  label,
  containerClassName,
  ...datePickerProps
}) => {
  const { setFieldValue } = useFormikContext()

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && <p className="text-dark-prussian-blue font-semibold mb-2 text-[15px]">{label}</p>}
      <Field name={name}>
        {({ field, meta }: FieldProps<any>) => (
          <div className="w-full">
            <ConfigProvider theme={{ token: { fontFamily: '' } }}>
              <DatePicker
                {...field}
                className="!text-[13px] !border !border-colors-opal/40 
                !w-full !rounded-lg !py-3 !outline-none !px-5 hover:!border-none focus:!border-none"
                value={field.value ? dayjs(+field.value) : null}
                onChange={(value: Dayjs | null) =>
                  setFieldValue(name, value ? value.valueOf() : null)
                }
                {...datePickerProps}
              />
            </ConfigProvider>
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
          </div>
        )}
      </Field>
    </div>
  )
}
