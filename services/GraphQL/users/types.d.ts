import { gql } from '@apollo/client'
import { SubmitHandler } from 'react-hook-form'

export const memberInfo = gql`
  fragment MemberInfoFragment on members {
    id
    email
    # user
    firstNames: first_names
    lastNames: last_names
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

export interface ProviderBase {
  id: string
  createdAt?: string
  updatedAt?: string
  address?: string
  commercialName?: string
  salesPhone?: string
  b2bPhone?: string
  salesEmail?: string
  b2bEmail?: string
  legalName?: string
  logoUrl?: string
  catalogUrl?: string
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

export interface ProviderUser extends User, ProviderBase {}

export interface ProviderUserEditable extends Partial<ProviderUser> {
  password?: string
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

export interface MutableProviderUserFormProps {
  onSubmit: SubmitHandler<ProviderUserEditable>
  loading: boolean
  originalData?: ProviderUser
}
