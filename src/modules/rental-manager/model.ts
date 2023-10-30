import { IListingImage } from '../listing/model'

export interface IRental {
  _id: string
  ownerId: string
  homeType: string
  state: string
  city: string
  address: string
  zip: number
  creationStep: number
  creationSubStep: number
  squareFootage: number
  bedrooms: number
  bathrooms: number
  description: string
  monthlyRent: number
  securityDeposit: number
  dateAvailableToRent: number
  petPolicy: string[]
  leaseTerms: string
  photos: IListingImage[]
  generalAmenities: string[]
  coolingType: string[]
  heatingType: string[]
  parking: string[]
  laundry: string
  rentBy: string
  name: string
  email: string
  phone: string
  datesAvailableToTour: string[]
  hidePropertyAddress: boolean
  leaseDuration: string
  contactByPhone: boolean
  createdAt: number
  updatedAt: number
}

export interface IRentalInput {
  ownerId?: string
  homeType?: string
  state?: string
  city?: string
  address?: string
  zip?: number
  creationStep?: number
  creationSubStep?: number
  squareFootage?: number
  bedrooms?: number
  bathrooms?: number
  description?: string
  monthlyRent?: number
  securityDeposit?: number
  dateAvailableToRent?: number
  petPolicy?: string[]
  leaseTerms?: string
  photos?: IListingImage[]
  generalAmenities?: string[]
  coolingType?: string[]
  heatingType?: string[]
  parking?: string[]
  laundry?: string
  rentBy?: string
  name?: string
  email?: string
  phone?: string
  datesAvailableToTour?: string[]
  hidePropertyAddress?: boolean
  leaseDuration?: string
  contactByPhone?: boolean
}
