import React from 'react'

interface IProps {
  className?: string
}

export const HvFacebookIcon: React.FC<IProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M0,0H24V24H0Z" fill="none" opacity="0.58" />
    <path
      d="M20,14.19C20,17.83,17.83,20,14.19,20H13a1,1,0,0,1-1-1V13.23a.5.5,0,0,1,.49-.5l1.76-.03a.319.319,0,0,0,.29-.25l.35-1.91a.3.3,0,0,0-.3-.35l-2.13.03a.508.508,0,0,1-.51-.49l-.04-2.45a.3.3,0,0,1,.3-.3l2.4-.04a.3.3,0,0,0,.3-.3l-.04-2.4a.3.3,0,0,0-.3-.3l-2.7.04A3,3,0,0,0,8.92,7.03l.05,2.75a.5.5,0,0,1-.49.51l-1.2.02a.3.3,0,0,0-.3.3l.03,1.9a.3.3,0,0,0,.3.3l1.2-.02a.508.508,0,0,1,.51.49l.09,5.7a1,1,0,0,1-1,1.02H5.81C2.17,20,0,17.83,0,14.18V5.81C0,2.17,2.17,0,5.81,0h8.38C17.83,0,20,2.17,20,5.81v8.38Z"
      transform="translate(2 2)"
    />
    <path d="M0,0H24V24H0Z" fill="none" opacity="0" />
  </svg>
)
