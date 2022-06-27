import { gql } from '@apollo/client'

export const memberInfo = gql`
  fragment MemberInfoFragment on members {
    id
    contactInformation: contact_information
    privateInformation: private_information
    email
    address
    phone
    firstNames: first_names
    lastNames: last_names
  }
`

export interface MemberBase {
  contactInformation?: string
  privateInformation?: string
  email: string
  address?: string
  phone?: string
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
  subscriptions?: {
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
