import React, { FC, useEffect, useRef, useState } from 'react'
import UserImg from '../../../assets/images/user.png'
import { Image } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { ChatBox } from './chatbox'
import { Firestore, addDoc, collection, query, serverTimestamp, where } from 'firebase/firestore'
import { Auth, User } from 'firebase/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthContext } from '@/modules/auth/context'

interface IProps {
  receiverId: string
}

export const ChatRoom: FC<IProps> = ({ receiverId }) => {
  const { firebaseAuth, firestoreDb } = useAuthContext()
  const dummy = useRef()
  const messagesRef = collection(firestoreDb, 'messages')

  // const filter = query(messagesRef, where("from", "==", uid || "kCjhnPn4BjOc65kRoeJTl1vwuIQ2"))
  // const query = messagesRef.orderBy('createdAt').limit(25);
  // const filter = query(messagesRef, or(where('capital', '==', true),
  //   where('population', '>=', 1000000)
  // ))

  const filter = query(
    messagesRef,
    where('roomIds', 'array-contains-any', [firebaseAuth.currentUser.uid, receiverId]),
  )
  const [messages] = useCollectionData(filter)
  const [formValue, setFormValue] = useState('')

  console.log(messages)

  const sendMessage = async (e: any) => {
    // e.preventDefault()
    // await addDoc(messagesRef, {
    //   msg: formValue,
    //   createdAt: serverTimestamp(),
    //   from: uid,
    //   to: 'kCjhnPn4BjOc65kRoeJTl1vwuIQ2',
    //   roomIds: [uid, recepientId],
    // })
    // setFormValue('')
    // dummy?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div className="h-full w-full relative bg-light-white">
        <div className="bg-light-white border-b py-3 px-5 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <Image
              className="rounded-full"
              preview={{
                maskClassName: 'rounded-full',
              }}
              width="30px"
              height="30px"
              src={UserImg?.src}
            />

            <div className="flex flex-col">
              <h1 className="font-bold text-base text-dark-prussian-blue"></h1>
              {/* <p className='text-xs text-colors-cadet'>+2349134102236</p> */}
            </div>
          </div>

          <div>
            <MoreOutlined className="text-[26px]" />
          </div>
        </div>

        <div className="flex flex-col gap-5 px-5 pt-5 bg-light-white overflow-scroll">
          {messages &&
            messages.map((msg, i) => (
              <ChatMessage key={i} currentUserId={firebaseAuth.currentUser.uid} message={msg} />
            ))}
          <span ref={dummy}></span>
        </div>

        <div className="absolute bg-light-white py-4 px-5 w-full bottom-0 border-t">
          <form className="flex gap-3 items-center" onSubmit={sendMessage}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              type="text"
              className="w-full rounded-md h-[45px] outline-none bg-light-cultured-2 px-5 text-sm placeholder-slate-600"
              placeholder="Type Message"
            />

            <button
              className="bg-primary text-white cursor-pointer"
              type="submit"
              disabled={!formValue}
            >
              🕊️
            </button>
          </form>
        </div>
      </div>
    </>
  )

  // const {getHistoryMessages, historyMessages} = useMessageContext()

  // useEffect(() => {
  //   getHistoryMessages(userId)
  // },[])

  // return (
  // <div className="h-full w-full relative bg-light-white">
  //     <div className="bg-light-white border-b py-3 px-5 flex justify-between items-center">
  //       <div className="flex gap-5 items-center">
  //         <Image
  //           className="rounded-full"
  //           preview={{
  //             maskClassName: 'rounded-full',
  //           }}
  //           width="30px"
  //           height="30px"
  //           src={User?.src}
  //         />

  //         <div className="flex flex-col">
  //           <h1 className="font-bold text-base text-dark-prussian-blue"></h1>
  //           {/* <p className='text-xs text-colors-cadet'>+2349134102236</p> */}
  //         </div>
  //       </div>

  //       <div>
  //         <MoreOutlined className="text-[26px]" />
  //       </div>
  //     </div>

  //     <div className='flex flex-col gap-5 px-5 pt-5 bg-light-white overflow-scroll'>
  //       {historyMessages?.slice(-5).map((item, i) => (
  //           <ChatBox key={i} message={item}/>
  //       ))}
  //     </div>

  //     <div className="absolute bg-light-white py-4 px-5 w-full bottom-0 border-t">
  //       <input
  //         type="text"
  //         className="w-full rounded-md h-[45px] outline-none bg-light-cultured-2 px-5 text-sm placeholder-slate-600"
  //         placeholder="Type Message"
  //       />
  //     </div>
  // </div>
  // )
}

interface ChatMessageProps {
  message: any
  currentUserId: string
}

const ChatMessage: FC<ChatMessageProps> = ({ message, currentUserId }) => {
  const { msg, from, to } = message

  const messageClass = from === currentUserId ? 'sent' : 'received'

  return (
    <>
      <div className={`flex gap-3 ${from === currentUserId && 'self-end'}`}>
        <div
          className={`py-1.5 px-3 gap-3 rounded-b-lg flex justify-between items-end
                ${
                  from === currentUserId
                    ? 'bg-primary rounded-tl-lg text-light-white'
                    : 'bg-light-cultured-2 rounded-tr-lg text-dark-prussian-blue'
                } `}
        >
          <div className="pb-0.5">
            <h1 className="text-[13px] font-medium">{msg}</h1>
          </div>
          <p className="text-[11px] font-bold">6:30 am</p>
        </div>
      </div>
      {/* <div className={`message ${messageClass}`}>
      <img src={'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{msg}</p>
    </div> */}
    </>
  )
}
