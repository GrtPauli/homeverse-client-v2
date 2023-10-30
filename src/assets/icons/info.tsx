import React from 'react'

interface IProps {
  className?: string
}

export const HvInfoIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <g transform="translate(-364 -252)">
      <path
        d="M10,0A10,10,0,1,0,20,10,10.016,10.016,0,0,0,10,0ZM9.25,6a.75.75,0,0,1,1.5,0v5a.75.75,0,0,1-1.5,0Zm1.67,8.38a1.032,1.032,0,0,1-.21.33,1.155,1.155,0,0,1-.33.21.943.943,0,0,1-.76,0,1.155,1.155,0,0,1-.33-.21,1.032,1.032,0,0,1-.21-.33.942.942,0,0,1,0-.76.9.9,0,0,1,.54-.54,1,1,0,0,1,.76,0,.9.9,0,0,1,.54.54.942.942,0,0,1,0,.76Z"
        transform="translate(366 254)"
        fill="currentColor"
      />
      <path d="M0,0H24V24H0Z" transform="translate(388 276) rotate(180)" fill="none" opacity="0" />
    </g>
  </svg>
)
