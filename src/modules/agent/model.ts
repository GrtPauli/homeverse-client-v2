import { UserType } from '../profile/model'

export interface IAgent {
  id: string
  userId: string
  displayName: string
  email: string
  photo?: string
  phoneNumber?: string
}

export interface IFilterProfileInput {
  displayName?: string
  userType?: UserType
  country?: string
  state?: string
  city?: string
}

export enum AgentRequestStatus {
  PENDING,
  ACCEPTED,
  REJECTED
}

export interface IClientRequest {
  id: string
  agent: {
    displayName: string
    photo: string
    userId: string
    email: string
  }
  client: {
    displayName: string
    photo: string
    userId: string
    email: string
  }
  status: AgentRequestStatus
  message: string
  createdAt: any
}

export interface IClient {
  id: string
  agentId: string
  client: {
    displayName: string
    photo: string
    userId: string
    email: string
  }
  createdAt: any
}