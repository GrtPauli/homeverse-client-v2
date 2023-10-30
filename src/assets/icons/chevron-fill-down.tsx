import React from 'react'

interface IProps {
  className?: string
}

export const HvChevronFillDownIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <g transform="translate(-236 -252)">
      <path
        d="M12.919,0H1.079a1.077,1.077,0,0,0-.76,1.84L5.5,7.02a2.131,2.131,0,0,0,3.01,0l1.97-1.97,3.21-3.21A1.082,1.082,0,0,0,12.919,0Z"
        transform="translate(241.001 260.18)"
        fill="currentColor"
      />
      <path d="M0,0H24V24H0Z" transform="translate(260 276) rotate(180)" fill="none" opacity="0" />
    </g>
  </svg>
)
