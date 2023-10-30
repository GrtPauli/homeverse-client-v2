import { gql } from '@apollo/client'

export const UserFragment = gql`
  fragment User on User {
    _id
    firstname
    lastname
    email
    userType
    profileId
  }
`

export const ProfileFragment = gql`
  fragment Profile on Profile {
    _id
    userId
    displayName
    phone
    about
    userType
    photo
    address
    languages
    # contacts {
    #   contactId
    #   createdAt
    #   status
    #   messageRoomId
    # }
    # contactRequests {
    #   contactId
    #   position
    # }
    reviews
    country
    countryFlag
    state
    city
    professionalTitle
    brokerageName
    brokerageAddress
    primaryPhone
    brokeragePhone
    inBusinessSince
    profileVideo
    website
    blog
    facebook
    twitter
    linkedIn
  }
`
