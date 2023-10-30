import React, { useEffect, useRef, useState } from 'react'
import { ZegoCloudRoomConfig } from '@zegocloud/zego-uikit-prebuilt'
// const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
import { useMutation } from '@apollo/client'
import { GENERATE_ZEGO_TOKEN } from '@/modules/test/gql/query'

function generateToken(tokenServerUrl: any, userID: any) {
  // Obtain the token interface provided by the App Server
  return fetch(`${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`, {
    method: 'GET',
  }).then((res) => res.json())
}

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

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1]
  return new URLSearchParams(urlStr)
}

export default function App() {
  const [mutateFunction, { data, loading, error }] = useMutation(GENERATE_ZEGO_TOKEN)
  const the = useRef<HTMLDivElement>()
  const [zegoToken, setZegoToken] = useState<string>()
  const userID = randomID(5)
  const userName = randomID(5)
  const roomID = randomID(5)

  //   getUrlParams().get('roomID')

  useEffect(() => {
    // mutateFunction({ variables: {
    //     generateZegoTokenInput: {
    //         appID: 1244909763,
    //         secret: "b409dbae53fca35b130c46731722ef51",
    //         userId: userID
    //     }
    // }}).then(rs => {
    //     console.log(rs.data.generateZegoToken)
    //     import("@zegocloud/zego-uikit-prebuilt").then(({ ZegoUIKitPrebuilt }) => {
    //         const zp = ZegoUIKitPrebuilt.create(rs.data.generateZegoToken)
    //         let roomConfig: ZegoCloudRoomConfig = {
    //             container: the.current,
    // showRemoveUserButton: true,
    // showTurnOffRemoteMicrophoneButton: true,
    // showTurnOffRemoteCameraButton: true,
    //             sharedLinks: [
    //                 {
    //                 name: 'Personal link',
    //                 url:
    //                     window.location.origin +
    //                     window.location.pathname +
    //                     '?roomID=' +
    //                     roomID,
    //                 },
    //             ],
    //             scenario: {
    //                 mode: ZegoUIKitPrebuilt.VideoConference,
    //             },
    //         }
    //         zp.joinRoom(roomConfig)
    //     });
    // }).catch(err => {
    //     console.log(err)
    // })
  }, [])

  let myMeeting = async (element: HTMLDivElement) => {
    import('@zegocloud/zego-uikit-prebuilt').then(({ ZegoUIKitPrebuilt }) => {
      const userID = randomID(5)
      const userName = randomID(5)
      // generate token
      generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
        const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          1484647939,
          res.token,
          roomID,
          userID,
          userName,
        )
        // create instance object from token
        const zp = ZegoUIKitPrebuilt.create(token)

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
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        })
      })
    })
  }

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  )
}
