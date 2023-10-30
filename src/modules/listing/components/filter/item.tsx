import { HvChevronFillDownIcon } from '@/assets/icons'
import { HvPopover } from '@/components'
import { FC, ReactNode } from 'react'

interface IProps {
  title: string
  children: ReactNode
}

export const FilterItem: FC<IProps> = ({ children, title }) => {
  const Wrapper = () => {
    return (
      <button className="ease-in duration-150 flex items-center gap-2 border py-3 px-8 rounded hover:bg-colors-cadet/5">
        <p className="font-bold text-sm text-colors-cadet">{title}</p>
        <HvChevronFillDownIcon className="text-colors-cadet" />
      </button>
    )
  }

  return (
    <HvPopover arrow={false} wrapper={Wrapper()}>
      {children}
    </HvPopover>
  )
}
