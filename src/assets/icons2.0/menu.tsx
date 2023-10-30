import React from 'react'

export const ApMenuIcon = ({ className, onClick }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${className} ${onClick && 'cursor-pointer'}`}
      onClick={() => {
        onClick && onClick()
      }}
    >
      <g transform="translate(-684 -380)">
        <path
          d="M18,.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H18a.75.75,0,0,1,.75.75A.75.75,0,0,1,18,.75Z"
          transform="translate(687 385)"
          fill="currentColor"
        />
        <path
          d="M18,.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H18a.75.75,0,0,1,.75.75A.75.75,0,0,1,18,.75Z"
          transform="translate(687 392)"
          fill="currentColor"
        />
        <path
          d="M18,.75H0A.75.75,0,0,1-.75,0,.75.75,0,0,1,0-.75H18a.75.75,0,0,1,.75.75A.75.75,0,0,1,18,.75Z"
          transform="translate(687 399)"
          fill="currentColor"
        />
        <path d="M0,0H24V24H0Z" transform="translate(684 380)" fill="none" opacity="0" />
      </g>
    </svg>
  )
}
