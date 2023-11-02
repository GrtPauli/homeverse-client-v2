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
