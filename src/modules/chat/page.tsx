import React, { useEffect, useState } from 'react'
import { ChatBox, ChatRoom, ConversationItem, IntroBox } from './components'
import { AgentHubLayout } from '@/components/layout/hub'
import { useContactContext } from '../contacts/context'
import { useHvFirebaseContext } from '../firebase/context'
import { useChatContext } from './context'
import { useAuthContext } from '../auth/context'
import { RegularLayout } from '@/components'

export const ChatPage = () => {
  const [showChatRoom, setShowChatRoom] = useState<{ receiverId?: string; show: boolean }>({
    receiverId: null,
    show: false,
  })
  const { getConversations, conversations } = useChatContext()
  const { firebaseInitLoading } = useAuthContext()

  // useEffect(() => {
  //   if (firebaseInitLoading == false) {
  //     getConversations()
  //   }
  // }, [firebaseInitLoading])

  // console.log(conversations[0]?.sender?.id);

  return (
    <RegularLayout className="p-0" noFooter>
      <div className="h-screen w-full flex">
        <div className="bg-light-cultured-2 h-full w-[25%] pt-[100px]">
          <div className="py-[15px] px-5">
            <h1>Messages</h1>
          </div>

          {/* {conversations?.map((item, i) => (
            <ConversationItem
              item={item}
              key={i}
              onClick={() => setShowChatRoom({show: true, receiverId: item.sender.id})}
            />
          ))} */}
        </div>

        <div className="h-full w-[75%] pt-[100px] relative">
          {!showChatRoom.show && <IntroBox />}
          {showChatRoom.show && <ChatRoom receiverId={showChatRoom.receiverId} />}
        </div>
      </div>
    </RegularLayout>
  )
}
