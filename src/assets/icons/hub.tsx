import React from 'react'

interface IProps {
  className?: string
}

export const HvHubIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <g transform="translate(-620 -252)">
      <path
        d="M8.5,6.52V1.98C8.5.57,7.86,0,6.27,0H2.23C.64,0,0,.57,0,1.98V6.51C0,7.93.64,8.49,2.23,8.49H6.27C7.86,8.5,8.5,7.93,8.5,6.52Z"
        transform="translate(633.5 254)"
        fill="currentColor"
      />
      <path
        d="M8.5,6.27V2.23C8.5.64,7.86,0,6.27,0H2.23C.64,0,0,.64,0,2.23V6.27C0,7.86.64,8.5,2.23,8.5H6.27C7.86,8.5,8.5,7.86,8.5,6.27Z"
        transform="translate(633.5 265.5)"
        fill="currentColor"
      />
      <path
        d="M8.5,6.52V1.98C8.5.57,7.86,0,6.27,0H2.23C.64,0,0,.57,0,1.98V6.51C0,7.93.64,8.49,2.23,8.49H6.27C7.86,8.5,8.5,7.93,8.5,6.52Z"
        transform="translate(622 254)"
        fill="currentColor"
      />
      <path
        d="M8.5,6.27V2.23C8.5.64,7.86,0,6.27,0H2.23C.64,0,0,.64,0,2.23V6.27C0,7.86.64,8.5,2.23,8.5H6.27C7.86,8.5,8.5,7.86,8.5,6.27Z"
        transform="translate(622 265.5)"
        fill="currentColor"
      />
      <path d="M0,0H24V24H0Z" transform="translate(644 276) rotate(180)" fill="none" opacity="0" />
    </g>
  </svg>
)
