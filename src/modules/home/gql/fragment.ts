import { gql } from '@apollo/client'

export const HomePageFragment = gql`
  fragment HomePage on HomePage {
    newListings {
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

    topAgents {
      _id
      userId
      displayName
      photo
      phone
      country
      countryFlag
      state
      city
    }
  }
`
