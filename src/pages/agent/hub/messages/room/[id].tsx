import { MessagesPage } from '@/modules/messages/page'
import React from 'react'
import { useSession } from 'next-auth/react'

const Messages = ({ roomId }: any) => {
  const session: any = useSession()

  if (session.status == 'authenticated')
    return <MessagesPage roomId={roomId} userId={session.data?.user?._id} />
}

export default Messages

export async function getServerSideProps({ query, req }: any) {
  return {
    props: { roomId: query.id },
  }
}
