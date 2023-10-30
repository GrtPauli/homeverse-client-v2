import * as React from 'react'
// import './style.css';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: any) {
  let result = ''
  if (result) return result
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i
  len = len || 5
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return result
}

// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(`${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`, {
    method: 'GET',
  }).then((res) => res.json())
}

export function getUrlParams(url: string = window.location.href): URLSearchParams {
  let urlStr = url.split('?')[1]
  return new URLSearchParams(urlStr)
}

export default function App() {
  let myMeeting = async (element: HTMLDivElement) => {
    let roomID: any, userID: any, userName: any
    if (typeof window !== undefined) {
      roomID = getUrlParams().get('roomID') || randomID(5)
      userID = randomID(5)
      userName = randomID(5)

      import('@zegocloud/zego-uikit-prebuilt').then(({ ZegoUIKitPrebuilt }) => {
        // generate token
        generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
            1484647939,
            res.token,
            roomID,
            userID,
            userName,
          )

          // create instance object from token
          const zp = ZegoUIKitPrebuilt.create(kitToken)

          // start the call
          zp.joinRoom({
            container: element,
            showRemoveUserButton: true,
            showTurnOffRemoteMicrophoneButton: true,
            showTurnOffRemoteCameraButton: true,
            sharedLinks: [
              {
                name: 'Personal link',
                url: window.location.origin + window.location.pathname + '?roomID=' + roomID,
              },
            ],
            scenario: {
              mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
          })
        })
      })
    }
  }

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  )
}
