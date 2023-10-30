import React from 'react'

interface IProps {
  className?: string
}

export const WalletConnectIcon: React.FC<IProps> = ({ className }) => (
  <svg
    className={className}
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.3777 26.2467C29.4239 13.4733 50.5761 13.4733 63.6224 26.2467L65.1926 27.784C65.8449 28.4227 65.8449 29.4582 65.1926 30.0968L59.8214 35.3556C59.4953 35.675 58.9665 35.675 58.6403 35.3556L56.4796 33.2401C47.3782 24.3291 32.6219 24.3291 23.5205 33.2401L21.2065 35.5056C20.8804 35.825 20.3516 35.825 20.0254 35.5056L14.6543 30.2469C14.002 29.6082 14.002 28.5727 14.6543 27.934L16.3777 26.2467ZM74.7304 37.1224L79.5108 41.8028C80.1631 42.4415 80.1631 43.4769 79.5108 44.1156L57.956 65.2199C57.3036 65.8586 56.246 65.8586 55.5937 65.2199C55.5937 65.2199 55.5937 65.2199 55.5937 65.2199L40.2954 50.2416C40.1323 50.0819 39.8679 50.0819 39.7049 50.2416V50.2416L24.4069 65.2199C23.7546 65.8586 22.697 65.8586 22.0447 65.2199C22.0447 65.2199 22.0446 65.2199 22.0446 65.2199L0.489235 44.1153C-0.163078 43.4767 -0.163078 42.4412 0.489235 41.8025L5.26957 37.1222C5.92188 36.4835 6.97949 36.4835 7.63181 37.1222L22.9303 52.1007C23.0934 52.2604 23.3578 52.2604 23.5209 52.1007C23.5209 52.1007 23.5209 52.1007 23.5209 52.1007L38.8186 37.1222C39.4709 36.4835 40.5285 36.4835 41.1809 37.1221C41.1809 37.1221 41.1809 37.1221 41.1809 37.1221L56.4794 52.1007C56.6425 52.2604 56.9069 52.2604 57.07 52.1007L72.3682 37.1224C73.0205 36.4838 74.0781 36.4838 74.7304 37.1224Z"
      fill="#3B99FC"
    />
  </svg>
)