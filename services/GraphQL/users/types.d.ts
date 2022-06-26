export const memberInfo = `
  id
  contact_information
  private_information
  email
  address
  first_names
  last_names
`

export interface MemberBase {
  contact_information?: string
  private_information?: string
  email: string
  address?: string
  phone?: string
  first_names?: string
  last_names?: string
}

export interface MemberEditable extends MemberBase {
  email: string
}

export interface Member extends MemberBase {
  id: string
  created_at?: string
  updated_at?: string
  events_inscribed?: Event[]
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

export const usersInfo = `
  id
  position
  member_code
  avatar_url
  type
  is_active
`

export interface UserBase {
  member_code: string
  type: string
  is_active: boolean
  position?: string
  avatar_url?: string
}

export interface UserEditable extends UserBase {
  member_code?: string
  password?: string
  type?: string
  position?: string
  avatar_url?: string
  is_active?: boolean
}

export interface User extends UserBase {
  id: string
  member_code: string
  type?: string
  position?: string
  avatar_url?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
  member_info?: Member
  frontend_errors?: {
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
