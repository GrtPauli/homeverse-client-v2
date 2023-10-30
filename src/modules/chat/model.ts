import { DocumentReference } from 'firebase/firestore'

export interface IConversation {
  sender: DocumentReference
  receiver: DocumentReference
  latestMsg: string
  sentAt: any
}

export interface IChatRequest {
  agent: {
    id: string
    name: string
    photo: string
  }
  sender: {
    id: string
    name: string
    photo: string
  }
  status: ChatRequestStatus
  sentAt: any
}

export enum ChatRequestStatus {
  PENDING,
  ACCEPTED,
}
