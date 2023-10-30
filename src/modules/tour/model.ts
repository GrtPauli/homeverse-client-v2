import { IReview, IReviewInput } from '../model'

export interface ITourRequest {
  _id: string
  touristName: string
  touristId: string
  agentName: string
  agentId: string
  tourScheduledDate: number
  method: TourMethod
  propertyId: string
  propertyListingDate: number
  requestStatus: TourRequestStatus
  createdAt: number
  updatedAt: number
}

export interface ITour {
  _id: string
  propertyId: string
  propertyListingDate: number
  touristName: string
  touristId: string
  touristPhoto: string
  agentName: string
  agentId: string
  agentPhoto: string
  vcRoomId: string
  method: TourMethod
  tourStatus: TourStatus
  tourScheduledDate: number
  tourReview: IReview
  createdAt: number
  updatedAt: number
}

export interface ICreateTourRequestInput {
  touristName: string
  touristId: string
  agentName: string
  agentId: string
  tourScheduledDate: number
  method: string
  propertyId: string
  propertyListingDate: number
}

export interface ICreateTourInput {
  propertyId: string
  propertyListingDate: number
  touristName: string
  touristId: string
  touristPhoto: string
  agentName: string
  agentId: string
  agentPhoto: string
  vcRoomId?: string
  method: TourMethod
  tourStatus: TourStatus
  tourScheduledDate: number
}

export interface IUpdateTourInput {
  vcRoomId?: string
  tourStatus?: TourStatus
  tourReview?: IReviewInput
}

export interface IGetTourInfoInput {
  touristId?: string
  agentId?: string
}

export interface IGetToursInput {
  tourist?: string
  agent?: string
}

export interface IImage {
  id: string
  name: string
  uri: string
}

export interface ILocation {
  country: string
  countryFlag: string
  state: string
  city: string
}

export enum TourMethod {
  IN_PERSON,
  VIDEO_CALL,
}

export enum TourRequestStatus {
  ACCEPTED,
  PENDING,
  CANCELLED,
}

export enum TourStatus {
  REQUEST_PENDING,
  REQUEST_CANCELLED,
  TOUR_PENDING,
  TOUR_CANCELLED,
  TOUR_COMPLETED,
}
