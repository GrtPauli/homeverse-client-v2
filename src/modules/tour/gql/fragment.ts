import { gql } from '@apollo/client'

export const TourRequestFragment = gql`
  fragment TourRequest on TourRequest {
    _id
    touristName
    touristId
    agentName
    agentId
    tourScheduledDate
    method
    propertyId
    propertyListingDate
    requestStatus
    createdAt
    updatedAt
  }
`

export const TourFragment = gql`
  fragment Tour on Tour {
    _id
    propertyId
    propertyListingDate
    touristName
    touristId
    touristPhoto
    agentName
    agentId
    agentPhoto
    vcRoomId
    method
    tourStatus
    tourScheduledDate
    tourReview {
      rating
      comment
      name
      photo
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
`
