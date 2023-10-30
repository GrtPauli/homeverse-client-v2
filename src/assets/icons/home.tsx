import React from 'react'

interface IProps {
  className?: string
}

export const HvHomeIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <g transform="translate(-620 -188)">
      <path
        d="M9.615-.75h0A4.973,4.973,0,0,1,12.45.088l6.18,4.33a5.473,5.473,0,0,1,2.12,4.064v7.28a4.966,4.966,0,0,1-4.96,4.96H4.21a4.971,4.971,0,0,1-4.96-4.97V8.343A5.52,5.52,0,0,1,1.17,4.431L6.559.231A4.982,4.982,0,0,1,9.615-.75ZM15.79,19.223a3.464,3.464,0,0,0,3.46-3.46V8.483a4,4,0,0,0-1.479-2.835L11.59,1.317A3.466,3.466,0,0,0,9.615.75a3.529,3.529,0,0,0-2.135.665l-5.389,4.2A4.037,4.037,0,0,0,.75,8.343v7.41a3.469,3.469,0,0,0,3.46,3.47Z"
        transform="translate(622 190.017)"
        fill="currentColor"
      />
      <path
        d="M0,3.75A.75.75,0,0,1-.75,3V0A.75.75,0,0,1,0-.75.75.75,0,0,1,.75,0V3A.75.75,0,0,1,0,3.75Z"
        transform="translate(632 202.99)"
        fill="currentColor"
      />
      <path d="M0,0H24V24H0Z" transform="translate(620 188)" fill="none" opacity="0" />
    </g>
  </svg>
)
