import { UserType } from '../profile/model'

export interface IAgent {
  _id: string
  userId: string
  displayName: string
  phone: string
  photo: string
  country: string
  countryFlag: string
  state: string
  city: string
}

export interface IFilterProfileInput {
  displayName?: string
  userType?: UserType
  country?: string
  state?: string
  city?: string
}
