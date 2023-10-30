export interface IUser {
  _id: string
  firstname: string
  lastname: string
  email: string
  userType: UserType
  profileId: string
}

export interface IProfile {
  _id: string
  userId: string
  displayName: string
  languages: string[]
  address: string
  phone: string
  about: string
  userType: UserType
  photo: string
  contacts: Contact[]
  contactRequests: ContactRequest[]
  reviews: string[]
  country: string
  countryFlag: string
  state: string
  city: string
  professionalTitle: string
  brokerageName: string
  brokerageAddress: string
  primaryPhone: string
  brokeragePhone: string
  inBusinessSince: string
  profileVideo: string
  website: string
  blog: string
  facebook: string
  twitter: string
  linkedIn: string
}

export interface AgentInfo {
  professionalTitle: string
  brokerageName: string
  brokerageAddress: string
  primaryPhone: string
  brokeragePhone: string
  inBusinessSince: string
  // specialties: string[]
  // languages: string[]
  profileVideo: string
  website: string
  blog: string
  facebook: string
  twitter: string
  linkedIn: string
}

export interface Contact {
  contactId: string
  createdAt: number
  status: ContactStatus
  messageRoomId: string
}

export interface ContactRequest {
  contactId: string
  position: ContactRequestPosition
}

export enum ContactRequestPosition {
  RECEIVER,
  SENDER,
}

export enum ContactStatus {
  NEW = 'New',
  ATTEMPTED_CONTACT = 'Attempted Contact',
  SPOKE_WITH_CUSTOMER = 'Spoke With Customer',
  APPOINTMENT_SET = 'Appointment Set',
  MET_WITH_CUSTOMER = 'Met With Customer',
  LISTING_AGREEMENT = 'Listing Agreement',
  ACTIVE_LISTING = 'Active Listing',
  SALE_CLOSED = 'Sale Closed',
  REJECTED = 'Rejected',
}

export enum AgentSpecialties {
  BUYERS_AGENT = "Buyer's Agent",
  LISTING_AGENT = 'Listing Agent',
  RELOCATION = 'Relocation',
  FORECLOSURE = 'Foreclosure',
  CONSULTING = 'Consulting',
  SHORT_SALE = 'Short Sale',
  SHORT_RENTAL = 'Short Rental',
  OTHER = 'Other',
}

export enum Languages {
  ENGLISH = 'English',
  FRENCH = 'French',
  MANDARIN = 'Mandarin',
  SPANISH = 'Spanish',
  GERMAN = 'German',
  RUSSIAN = 'Russian',
  CANTONESE = 'Cantonese',
  HINDI = 'Hindi',
  ARABIC = 'Arabic',
  JAPANESE = 'Japanese',
  VIETNAMESE = 'Vietnamese',
  KOREAN = 'Korean',
  ITALIAN = 'Italian',
  THAI = 'Thai',
  TURKISH = 'Turkish',
  PORTUGUESE = 'Portuguese',
  BENGALI = 'Bengali',
  GREEK = 'Greek',
  HEBREW = 'Hebrew',
  HUNGARIAN = 'Hungarian',
  FILIPINO = 'Filipino',
  POLISH = 'Polish',
  PUNJABI = 'Punjabi',
  URDU = 'Urdu',
}

export enum UserType {
  BUYER_OR_SELLER,
  AGENT,
  BUYER,
  SELLER,
}
