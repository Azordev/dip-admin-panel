import { gql } from '@apollo/client'

export const memberInfo = gql`
  fragment MemberInfoFragment on members {
    id
    email
    firstNames: first_names
    lastNames: last_names
  }
`

export const providerInfo = gql`
  fragment ProviderInfoFragment on providers {
    id
    address
    commercialName: commercial_name
    salesPhone: sales_phone
    b2bPhone: b2b_phone
    salesEmail: sales_email
    b2bEmail: b2b_email
    legalName: legal_name
    logoUrl: logo_url
    catalogUrl: catalog_url
  }
`

export interface MemberBase {
  email: string
  firstNames?: string
  lastNames?: string
}

export interface MemberEditable extends MemberBase {
  email: string
}

export interface Member extends MemberBase {
  id: string
  createdAt?: string
  updatedAt?: string
  eventsInscribed?: Event[]
  events?: {
    stats: {
      count: number
    }
  }
}

export const usersInfo = gql`
  fragment UserInfoFragment on users {
    id
    position
    memberCode: member_code
    avatarUrl: avatar_url
    type
    isActive: is_active
  }
`

export interface UserBase {
  memberCode: string
  type: string
  isActive: boolean
  position?: string
  avatarUrl?: string
}

export interface UserEditable extends UserBase {
  memberCode?: string
  namePartner?: string
  startDate?: string
  email?: string
  password?: string
  type?: string
  position?: string
  avatarUrl?: string
  isActive?: boolean
}

export interface User extends UserBase {
  id: string
  memberCode: string
  type?: string
  position?: string
  avatarUrl?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
  memberInfo?: Member
  frontendErrors?: {
    stats: {
      count: number
    }
  }
}

export interface LoginInput {
  memberCode: string
  password: string
}

export interface LoginFormProps {
  onSubmit: (_formData: LoginInput) => void
  loading: boolean
}

export interface MutableUserFormProps {
  onSubmit: (_formData: UserEditable) => void
  loading: boolean
  originalData?: User
}

export interface MutableMemberFormProps {
  onSubmit: (_formData: MemberEditable) => void
  loading: boolean
  originalData?: Member
}
