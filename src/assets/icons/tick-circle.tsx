import React from 'react'

interface IProps {
  className?: string
}

export const HvTickCircleIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <g transform="translate(-748 -188)">
      <path
        d="M10,20.75A10.738,10.738,0,0,1,2.407,2.407,10.738,10.738,0,1,1,17.593,17.593,10.674,10.674,0,0,1,10,20.75Zm0-20A9.25,9.25,0,1,0,19.25,10,9.26,9.26,0,0,0,10,.75Z"
        transform="translate(750 190)"
        fill="currentColor"
      />
      <path
        d="M2.83,6.41a.748.748,0,0,1-.53-.22L-.53,3.36A.75.75,0,0,1-.53,2.3.75.75,0,0,1,.53,2.3l2.3,2.3L7.97-.531a.75.75,0,0,1,1.061,0,.75.75,0,0,1,0,1.061L3.36,6.191A.748.748,0,0,1,2.83,6.41Z"
        transform="translate(755.75 197.17)"
        fill="currentColor"
      />
      <path d="M0,0H24V24H0Z" transform="translate(748 188)" fill="none" opacity="0" />
    </g>
  </svg>
)
