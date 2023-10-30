import { gql } from '@apollo/client'

export const RentalFragment = gql`
  fragment Rental on Rental {
    _id
    ownerId
    homeType
    state
    city
    address
    zip
    creationStep
    creationSubStep
    squareFootage
    bedrooms
    bathrooms
    description
    monthlyRent
    securityDeposit
    dateAvailableToRent
    petPolicy
    leaseTerms
    photos {
      id
      name
      uri
    }
    generalAmenities
    coolingType
    heatingType
    parking
    laundry
    rentBy
    name
    email
    phone
    datesAvailableToTour
    hidePropertyAddress
    leaseDuration
    contactByPhone
    createdAt
    updatedAt
  }
`
