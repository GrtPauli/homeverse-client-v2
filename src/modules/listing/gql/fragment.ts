import { gql } from '@apollo/client'

export const ListingFragment = gql`
  fragment Listing on Listing {
    _id
    price
    homeType
    description
    state
    city
    address
    zip
    ownerId
    agentId
    photos {
      id
      name
      uri
    }
    yearBuilt
    owner {
      name
      id
      photo
    }
    agent {
      name
      id
      photo
    }
    status
    bedrooms
    totalRooms
    garages
    bathrooms
    propertySize
    propertySizeUnit
    basementSqFt
    garageSqFt
    relatedWebsite
    virtualTourURL
    basement
    rooms
    floorCovering
    indoorFeatures
    appliances
    heatingType
    heatingFuel
    coolingType
    parking
    view
    roof
    exterior
    buildingAmenities
    architecturalStyle
    outdoorAmenities
    createdAt
    updatedAt
  }
`
