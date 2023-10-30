import React, { useEffect, useState } from 'react'
import AC, { AgoraChat } from 'agora-chat'
import { Button } from '@/components'

function postData(url: any, data: any, headers?: any) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }).then((response) => response.json())
}

const register = (conn: AgoraChat.Connection) => {
  let username = 'Jane'
  let password = '123456'
  let nickname = 'Jane123'

  getToken()
    .then((rs) => {
      postData(
        'http://a41.chat.agora.io/411020257/1191665/users',
        { username, password, nickname },
        { Authorization: `Bearer ${rs}` },
      )
        .then((rs) => {
          console.log(rs)
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}

const login = (conn: AgoraChat.Connection) => {
  let username = 'Jake123'
  let password = '123456'

  getToken(username)
    .then((rs) => {
      conn.open({
        user: username,
        agoraToken: rs,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const getToken = (userId?: string) => {
  const url1 = 'http://localhost:8090/chat/app/token'
  const url2 = `http://localhost:8090/chat/user/${userId}/token`

  return new Promise<any>((resolve, reject) => {
    let url = userId ? url2 : url1
    fetch(url)
      .then((res) => res.text())
      .then((token) => {
        resolve(token)
        // console.log(rs);
      })
      .catch((err) => {
        reject(err)
        // console.log(err)
      })
  })
}

const logout = (conn: AgoraChat.Connection) => {
  conn?.close()
}

const refreshToken = (conn: AgoraChat.Connection) => {
  let username = 'Jane'

  getToken(username)
    .then((rs) => {
      conn.renewToken(rs)
    })
    .catch((err) => {
      console.log(err)
    })
}

const sendMessage = (conn: AgoraChat.Connection) => {
  let option: AgoraChat.CreateMsgType = {
    type: 'txt',
    // Set the message content.
    msg: 'Sup Dude',
    // Set the username of the receiver.
    to: 'Zack64e5eccef3d5bb45278d89b0',
    // Set the chat type
    chatType: 'singleChat',
    ext: {
      nickname: 'Jake',
      username: 'Jake123',
    },
  }

  // Create a text message.
  let msg = AC.message.create(option)
  // Call send to send the message
  conn
    ?.send(msg)
    .then(() => {
      console.log('Msg Sent')
    })
    .catch((e) => {
      console.log(e)
    })
}

const sendContactRequest = (conn: AgoraChat.Connection) => {
  conn.addContact('Zack64e5eccef3d5bb45278d89b0', "Hello I'm Jake")
}

const TestTwo = () => {
  let conn: AgoraChat.Connection
  const [userExists, setUserExists] = useState<boolean>(false)

  if (typeof window !== 'undefined') {
  }

  useEffect(() => {
    conn = new AC.connection({
      appKey: '411020257#1191665',
    })

    conn?.addEventHandler('connection&message', {
      onOnline: () => {
        // console.log("Connected to App");
      },
      onConnected: () => {
        console.log('Connected to App')
        // setUserExists(true)
      },
      onDisconnected: () => {
        console.log('Disconnected from App')
        console.log(userExists)
        // setUserExists(false)
      },
      onTextMessage: (message) => {
        console.log(message)
      },
      onTokenWillExpire: () => {
        console.log('Token is about to expire')
        refreshToken(conn)
      },
      onTokenExpired: () => {
        console.log('Token has expired')
        refreshToken(conn)
      },
      onError: (error) => {
        console.log('Error : ', error)
      },
    })
  }, [])

  return (
    <div className="p-10">
      {/* {!userExists ? ( */}
      <div className="flex items-center gap-5 mb-10">
        <Button title="Register" fullWidth={false} onClick={() => register(conn)} />
        <p>Or</p>
        <Button
          title="Login"
          fullWidth={false}
          onClick={() => {
            setUserExists(true)
            login(conn)
          }}
        />
      </div>
      {/* ) : ( */}
      <div className="flex items-center gap-5 mb-10">
        <Button title="Logout" fullWidth={false} onClick={() => logout(conn)} />
        <Button title="Send Message" fullWidth={false} onClick={() => sendMessage(conn)} />
        <Button
          title="Send Contact Request"
          fullWidth={false}
          onClick={() => sendContactRequest(conn)}
        />
      </div>
      {/* )} */}
    </div>
  )
}

export default TestTwo
