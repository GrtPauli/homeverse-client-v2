import { AppLoader, DashboardLayout } from '@/components'
import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { useMessageContext } from './context'
import { ChatBox, ChatRoom, IntroBox } from './components'
import { useSubscription } from '@apollo/client'
import { NEW_MESSAGE } from './gql/query'
import { AgentHubLayout } from '@/components/layout/hub'
import User from '../../assets/images/user.png'
import { useSession } from 'next-auth/react'
import moment from 'moment'
import { APP_DATE_TIME_FORMAT } from '@/constants/Helper'

export const MessagesPage = () => {
  //   const [showIntroBox, setShowIntroBox] = useState<boolean>(true)
  const [userId, setUserId] = useState<string>(null)

  const {
    setShowIntroBox,
    showIntroBox,
    setRecipientId,
    recipientId,
    closeIntroBox,
    createAgoraConn,
    agoraConn,
    setAgoraEventHandler,
    agoraSignin,
    setInitials,
    initials,
    acceptContactInvite,
    conversationList,
  } = useMessageContext()
  const session: any = useSession()
  useEffect(() => {
    createAgoraConn()
  }, [])

  useEffect(() => {
    if (session?.data?.user) {
      if (agoraConn !== null && initials == true) {
        setAgoraEventHandler()
        agoraSignin(session.data.user.name.split(' ')[0] + session.data.user._id)
        setInitials(false)
      }
    }
  }, [session, agoraConn])

  return (
    <AgentHubLayout noFooter containerClassName="w-full bg-light-cultured-3">
      <div className="h-screen w-full flex">
        <div className="bg-light-cultured-2 h-full w-[25%] pt-[60px]">
          <div className="py-[15px] px-5">
            <h1>Messages</h1>
          </div>

          {conversationList?.channel_infos?.map((item, i) => (
            <button
              onClick={() => closeIntroBox(item)}
              className="flex w-full cursor-pointer items-center gap-3 py-3 px-5 hover:bg-primary/10 transition-all ease-in duration-150"
            >
              <Image
                className="rounded-full object-cover"
                width="55px"
                height="50px"
                src={User?.src}
              />

              <div className="flex flex-col gap-1 justify-between w-full">
                <div className="flex justify-between items-start">
                  <p className="font-bold text-sm">{item?.lastMessage?.ext?.nickname}</p>
                  <p className="text-[12px] text-colors-cadet">
                    {moment(item?.lastMessage?.time).format(APP_DATE_TIME_FORMAT)}
                  </p>
                </div>

                <div className="flex justify-between items-end">
                  <p className="text-[13px] text-colors-cadet">{item?.lastMessage?.msg}</p>
                  <div className="bg-primary rounded-full text-light-white text-xs text-center font-medium min-h-[20px] min-w-[20px] flex justify-center items-center">
                    {item?.unread_num}
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* <button onClick={() => acceptContactInvite("Jake123")}>
                        accept
                    </button> */}
        </div>

        <div className="h-full w-[75%] pt-[60px] relative">
          {showIntroBox && <IntroBox />}
          {!showIntroBox && <ChatRoom userId={recipientId} />}
        </div>
      </div>
    </AgentHubLayout>

    // <DashboardLayout page='messages'>
    //     <div className='bg-light-white w-full shadow-lg h-full'>
    //         {loading && <AppLoader size='lg' loading={loading}/>}
    //         {!loading && (
    //             <>
    // <div className='border-b py-3 px-5 flex justify-between items-center'>
    //     <div className='flex gap-5 items-center'>
    //         <Image
    //             className='rounded-full'
    //             preview={{
    //                 maskClassName: "rounded-full"
    //             }}
    //             width="30px"
    //             height="30px"
    //             src={recipient?.photo}
    //         />

    //         <div className='flex flex-col'>
    //             <h1 className='font-bold text-base text-dark-prussian-blue'>{recipient?.firstname} {recipient?.lastname}</h1>
    //             {/* <p className='text-xs text-colors-cadet'>+2349134102236</p> */}
    //         </div>
    //     </div>

    //     <div>
    //         <MoreOutlined className='text-[26px]'/>
    //     </div>
    // </div>

    //                 <div className='relative pt-8 px-10'>
    //                     <div className='flex justify-center items-center absolute top-0 w-full'>
    //                         <div className='rounded-b-lg bg-dark-prussian-blue text-light-white text-sm py-2 px-5'>
    //                             Today
    //                         </div>
    //                     </div>

    // <div className='flex flex-col gap-3'>
    //     {messageRoom.messages?.map((item: any, i: number) => (
    //         <ChatBox key={i} message={item}/>
    //     ))}

    //                         <div className='flex gap-3'>
    //                             <div className='bg-light-cultured-2 py-2 px-4 gap-3 max-w-[80%] rounded-tr-xl rounded-b-xl flex justify-between items-end'>
    //                                 <div className='pb-1'>
    //                                     <h1 className='text-sm'>lorem</h1>
    //                                 </div>
    //                                 <p className='text-[11px] font-bold text-dark-prussian-blue'>6:30 am</p>
    //                             </div>
    //                         </div>

    //                         <div className='flex gap-3 self-end'>
    //                             <div className='bg-primary py-2 px-4 gap-3  rounded-tl-xl rounded-b-xl flex justify-between items-end'>
    //                                 <div className='pb-1'>
    //                                     <h1 className='text-sm text-light-white'>lorem</h1>
    //                                 </div>
    //                                 <p className='text-[11px] font-bold text-light-white'>6:30 am</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </>
    //         )}
    //     </div>
    // </DashboardLayout>
  )
}

// const {getMessageRoom, loading, messageRoom, recipient, addNewMessage} = useMessageContext()
// const {data, loading: newMessageLoading, error} = useSubscription(NEW_MESSAGE, {
//     variables : {
//         messageRoomId: roomId
//       }
// })

// useEffect(() => {
//     getMessageRoom(roomId, userId)
// },[])

// useEffect(() => {
//     if(newMessageLoading == false && data?.newMessage){
//         console.log(data, newMessageLoading);
//         addNewMessage(data?.newMessage)
//     }
// }, [data])
// console.log(data, newMessageLoading);
