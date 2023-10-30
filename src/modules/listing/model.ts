import { ILocation } from '../model'

export interface IListing {
  id: string
  price: number
  homeType: string
  description: string
  state: string
  lga: string
  address: string
  zip: number
  photos: string[]
  yearBuilt: number
  owner: ListingParticipant
  agent: ListingParticipant
  ownerId: string
  agentId: string
  status: ListingStatus
  bedrooms: number
  totalRooms: number
  garages: number
  bathrooms: number
  propertySize: number
  propertySizeUnit: string
  basementSqFt: number
  garageSqFt: number
  relatedWebsite: string
  virtualTourURL: string
  basement: string
  rooms: string[]
  floorCovering: string[]
  indoorFeatures: string[]
  appliances: string[]
  heatingType: string[]
  heatingFuel: string[]
  coolingType: string[]
  parking: string[]
  view: string[]
  roof: string[]
  exterior: string[]
  buildingAmenities: string[]
  architecturalStyle: string
  outdoorAmenities: string[]
  createdAt: number
  updatedAt: number
}

export interface ListingParticipant {
  name: string
  id: string
  photo: string
}

export interface IListingImage {
  id: string
  name: string
  uri: string
}

export interface IUserListingFilter {
  ownerId?: string
  agentId?: string
}

export interface IListingFilter {
  minPrice?: number
  maxPrice?: number
  state?: string
  city?: string
  bedrooms?: string
  bathrooms?: string
}

export enum ListingStatus {
  ACTIVE,
  SOLD,
  IN_TRANSACTION,
  UNLISTED,
}

export enum LotUnit {
  SQ_FT = 'Sq ft',
  ACRES = 'Acres',
}

export const PropertySizeUnit = [
  {
    value: 'm²',
    label: 'm²',
  },
  {
    value: 'ft²',
    label: 'ft²',
  },
]
// type ListingStatus = 'ACTIVE' | 'SOLD' | 'IN_TRANSACTION' | 'UNLISTED'
export const HomeType = [
  {
    value: 'Single Family',
    label: 'Single Family',
  },
  {
    value: 'Condo',
    label: 'Condo',
  },
  {
    value: 'Townhouse',
    label: 'Townhouse',
  },
  {
    value: 'Multi Family',
    label: 'Multi Family',
  },
  {
    value: 'Apartment',
    label: 'Apartment',
  },
  {
    value: 'Mobile / Manufactured',
    label: 'Mobile / Manufactured',
  },
  {
    value: 'Coop Unit',
    label: 'Coop Unit',
  },
  {
    value: 'Vacant Land',
    label: 'Vacant Land',
  },
  {
    value: 'Other',
    label: 'Other',
  },
]
